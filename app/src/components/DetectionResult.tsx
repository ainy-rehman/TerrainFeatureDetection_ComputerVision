import React from 'react';
import { Detection } from '../types/detection';
import FeedbackButtons from './FeedbackButtons';

interface DetectionResultProps {
  image: string;
  detections: Detection[];
  onFeedbackSubmit: (rating: number, comment: string) => void;
  feedbackSubmitted: boolean;
  feedbackMessage: string;
}

const DetectionResult: React.FC<DetectionResultProps> = ({
  image,
  detections,
  onFeedbackSubmit,
  feedbackSubmitted,
  feedbackMessage
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <img
            src={image}
            alt="Analyzed"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Detection Results</h3>
          <div className="space-y-2">
            {detections.map((detection, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">
                    {detection.label}
                  </span>
                  <span className="text-sm text-gray-500">
                    {(detection.confidence * 100).toFixed(1)}% confidence
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!feedbackSubmitted ? (
        <FeedbackButtons onSubmit={onFeedbackSubmit} />
      ) : (
        <div className={`mt-4 p-4 rounded-lg text-center ${
          feedbackMessage.includes('Thank you')
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {feedbackMessage}
        </div>
      )}
    </div>
  );
};

export default DetectionResult;