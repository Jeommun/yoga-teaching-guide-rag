import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import { AsanaSequence, SearchContext, CONFIG } from './types.ts';

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export function createSearchQuery(
  sequence: AsanaSequence[],
  theme: string,
  classLength: string
): string {
  return `
    How to sequence a yoga class for theme: "${theme}", 
    sequence: ${sequence.map(p => 
      p.name + (p.isPeakPose ? " (peak pose)" : "")
    ).join(', ')}, 
    duration: ${classLength} minutes
  `.trim();
}

export async function createEmbedding(
  query: string,
  openAIApiKey: string
): Promise<number[]> {
  try {
    const response = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: CONFIG.EMBEDDING_MODEL,
        input: query,
      }),
    });

    if (!response.ok) {
      throw new Error(`Embedding API error: ${response.statusText}`);
    }

    const { data } = await response.json();
    return data[0].embedding;
  } catch (error) {
    console.error("Embedding creation failed:", error);
    throw error;
  }
}

export async function searchRelevantContext(
  queryEmbedding: number[]
): Promise<SearchContext[]> {
  const { data, error } = await supabase.rpc('match_pdf_vectors', {
    query_embedding: queryEmbedding,
    match_threshold: CONFIG.SIMILARITY_THRESHOLD,
    match_count: CONFIG.MAX_CONTEXT_RESULTS,
  });

  if (error) {
    console.error("Vector search failed:", error);
    throw error;
  }

  return data;
}

export function createFinalPrompt(
  sequence: AsanaSequence[],
  theme: string,
  classLength: string,
  contexts: SearchContext[]
): string {
  const contextText = contexts
    .map(ctx => ctx.content)
    .join("\n---\n");

  return `
You are a professional yoga instructor creating a class plan.

REFERENCE CONTENT FROM YOGA SEQUENCING MANUAL:
${contextText}

SEQUENCE INFORMATION:
Theme: ${theme}
Duration: ${classLength} minutes
Poses: ${sequence.map(p => 
  `${p.name}${p.isPeakPose ? ' (Peak Pose)' : ''}`
).join(', ')}

Please create a detailed teaching guide that includes:
1. A brief centering/opening based on the theme
2. For each pose:
   - Sanskrit and English names
   - Clear entry and exit cues
   - Precise alignment instructions
   - Breathing guidance
   - Duration or breath count
   - Safety considerations
3. Smooth transitions between poses
4. Theme integration throughout the class
5. Modifications for different skill levels

FORMAT:
1. Opening/Centering (2-3 minutes)
[Opening script here]

2. Pose Sequence:
[Pose Name] (Sanskrit - English)
Entry: [Instructions]
Alignment: [Key points]
Breath: [Pattern/count]
Duration: [Time]
Exit: [Instructions]
[Continue for each pose]

3. Closing:
[Brief closing sequence]
`.trim();
} 