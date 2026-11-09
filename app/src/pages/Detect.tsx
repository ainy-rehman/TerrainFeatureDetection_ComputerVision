import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import ImagePreview from '../components/ImagePreview';
import DetectionResult from '../components/DetectionResult';
import { Detection, Step } from '../types/detection';
import { detectFeatures, submitFeedback, ApiError } from '../services/api';

function Detect() {
  const [step, setStep] = useState<Step>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setImageUrl(URL.createObjectURL(file));
    setStep('preview');
    setError(null);
  };

  const handleDetect = async () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const newDetections = await detectFeatures(selectedFile);
      setDetections(newDetections);
      setStep('result');
    } catch (error) {
      const message = error instanceof ApiError 
        ? error.message 
        : 'An unexpected error occurred';
      setError(message);
      console.error('Detection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep('upload');
    setSelectedFile(null);
    setImageUrl(null);
    setDetections([]);
    setFeedbackSubmitted(false);
    setFeedbackMessage('');
    setError(null);
  };

  const handleFeedback = async (rating: number, comment: string) => {
    try {
      await submitFeedback(detections, { rating, comment });
      setFeedbackSubmitted(true);
      setFeedbackMessage(
        rating >= 4
          ? 'Thank you for your positive feedback!'
          : 'We apologize for not meeting your expectations. We\'ll work to improve our detection system.'
      );
    } catch (error) {
      const message = error instanceof ApiError 
        ? error.message 
        : 'Failed to submit feedback';
      setError(message);
      console.error('Feedback error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Mars Terrain Feature Detection
          </h1>
          <p className="text-gray-600">
            Upload an image to detect Martian geological features using our AI model
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          {step === 'upload' && (
            <ImageUploader onImageSelect={handleImageSelect} />
          )}

          {step === 'preview' && imageUrl && (
            <ImagePreview
              imageUrl={imageUrl}
              onBack={handleBack}
              onDetect={handleDetect}
              isLoading={isLoading}
            />
          )}

          {step === 'result' && imageUrl && (
            <DetectionResult
              image={imageUrl}
              detections={detections}
              onFeedbackSubmit={handleFeedback}
              feedbackSubmitted={feedbackSubmitted}
              feedbackMessage={feedbackMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Detect;