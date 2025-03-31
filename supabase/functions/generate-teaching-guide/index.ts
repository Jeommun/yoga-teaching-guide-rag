import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { TeachingGuideRequest, TeachingGuideResponse, CONFIG } from "./types.ts";
import { createSearchQuery, createEmbedding, searchRelevantContext, createFinalPrompt } from "./utils.ts";
import OpenAI from "https://esm.sh/openai@4.20.1";
import { supabaseClient } from "./supabase.ts";

// Access the OpenAI API key from environment variables
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

if (!openAIApiKey) {
  throw new Error('OpenAI API key is not configured');
}

const openai = new OpenAI({
  apiKey: openAIApiKey
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CONFIG.CORS_HEADERS });
  }

  try {
    const { sequence, theme, classLength } = await req.json() as TeachingGuideRequest;
    
    if (!sequence?.length || !theme || !classLength) {
      throw new Error('Missing required parameters: sequence, theme, or classLength');
    }

    // 1. 검색 쿼리 생성
    const searchQuery = createSearchQuery(sequence, theme, classLength);
    
    // 2. 쿼리 임베딩 생성
    const queryEmbedding = await createEmbedding(searchQuery, openAIApiKey);
    
    // 3. 관련 컨텍스트 검색
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: searchQuery,
    });
    
    const embedding = embeddingResponse.data[0].embedding;
    
    // 임베딩 디버깅 로그 추가
    console.log('Embedding length:', embedding.length);
    console.log('Embedding (first 5):', embedding.slice(0, 5));

    const { data: documents, error: matchError } = await supabaseClient.rpc(
      'match_pdf_vectors',
      {
        query_embedding: embedding,
        match_threshold: 0.3,
        match_count: 5
      }
    );

    if (matchError) {
      console.error('Vector search error:', matchError);
    }

    console.log('Vector search results:', documents);
    console.log('Number of matches found:', documents ? documents.length : 0);

    const contexts = documents || [];
    console.log('Matched contexts:', contexts);
    
    // 4. 최종 프롬프트 생성
    const finalPrompt = createFinalPrompt(sequence, theme, classLength, contexts);

    // 5. ChatGPT API 호출
    console.log('Starting OpenAI request...');
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are an expert yoga instructor with deep knowledge of anatomy, alignment, and sequencing." },
        { role: "user", content: finalPrompt }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
    });

    console.log('OpenAI response:', completion); // 디버깅을 위한 로그

    if (!completion || !completion.choices || !completion.choices[0]) {
      throw new Error('Invalid response from OpenAI');
    }

    const guideContent = completion.choices[0].message.content;
    
    console.log('Successfully generated teaching guide');

    // 6. 응답 반환
    const response: TeachingGuideResponse = {
      success: true,
      guideContent
    };

    return new Response(JSON.stringify(response), {
      headers: { 
        'Content-Type': 'application/json',
        ...CONFIG.CORS_HEADERS 
      },
    });

  } catch (error) {
    console.error('Detailed error:', error);
    
    const errorResponse: TeachingGuideResponse = {
      success: false,
      error: error.message,
      details: error.toString()
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        ...CONFIG.CORS_HEADERS 
      },
    });
  }
});
