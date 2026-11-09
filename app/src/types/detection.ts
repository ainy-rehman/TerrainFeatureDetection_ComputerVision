export interface Detection {
  bbox: number[];
  label: string;
  confidence: number;
}

export interface FeedbackData {
  rating: number;
  comment: string;
}

export type Step = 'upload' | 'preview' | 'result';