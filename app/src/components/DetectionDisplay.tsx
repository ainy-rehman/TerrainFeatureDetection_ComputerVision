import React from 'react';
import { Detection } from '../types/detection';

interface DetectionDisplayProps {
  image: string;
  detections: Detection[];
}

const DetectionDisplay: React.FC<DetectionDisplayProps> = ({ image, detections }) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <img
          src={image}
          alt="Uploaded"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Detection Results:</h3>
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
  );
};

export default DetectionDisplay;