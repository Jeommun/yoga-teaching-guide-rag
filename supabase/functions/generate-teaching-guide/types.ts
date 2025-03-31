export interface AsanaSequence {
  id: string;
  name: string;
  isPeakPose: boolean;
  section?: string;
  imageUrl?: string;
  cues?: string;
  url?: string;
  category?: string;
}

export interface SearchContext {
  id: string;
  content: string;
  similarity: number;
}

export interface TeachingGuideRequest {
  sequence: AsanaSequence[];
  theme: string;
  classLength: string;
}

export interface TeachingGuideResponse {
  success: boolean;
  guideContent?: string;
  error?: string;
}

// Configuration constants
export const CONFIG = {
  SIMILARITY_THRESHOLD: 0.8,
  MAX_CONTEXT_RESULTS: 5,
  EMBEDDING_MODEL: "text-embedding-3-small",
  GPT_MODEL: "gpt-4",
  CORS_HEADERS: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }
} as const; 