import axios, { AxiosError } from 'axios';
import { Detection, FeedbackData } from '../types/detection';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const detectFeatures = async (image: File): Promise<Detection[]> => {
  try {
    const formData = new FormData();
    formData.append('image', image);
    
    const response = await api.post<{ detections: Detection[] }>('/detect', formData);
    return response.data.detections;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ApiError(error.response?.data?.error || 'Failed to detect features');
    }
    throw new ApiError('An unexpected error occurred during detection');
  }
};

export const submitFeedback = async (
  detections: Detection[],
  feedback: FeedbackData
): Promise<void> => {
  try {
    const feedbackData = {
      detections,
      rating: feedback.rating,
      comment: feedback.comment,
      timestamp: new Date().toISOString(),
      status: feedback.rating >= 4 ? 'positive' : feedback.rating === 3 ? 'neutral' : 'negative'
    };

    await api.post('/feedback', feedbackData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ApiError(error.response?.data?.error || 'Failed to submit feedback');
    }
    throw new ApiError('An unexpected error occurred while submitting feedback');
  }
};