import React from 'react';
import { ArrowLeft, Upload } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  onBack: () => void;
  onDetect: () => void;
  isLoading: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  onBack,
  onDetect,
  isLoading
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Choose Different Image
        </button>
      </div>
      
      <div className="relative">
        <img
          src={imageUrl}
          alt="Selected"
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      <button
        onClick={onDetect}
        disabled={isLoading}
        className={`w-full mt-4 flex items-center justify-center px-4 py-2 rounded-md text-white
          ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
          }`}
      >
        <Upload className="w-4 h-4 mr-2" />
        {isLoading ? 'Detecting...' : 'Upload and Detect'}
      </button>
    </div>
  );
};

export default ImagePreview;