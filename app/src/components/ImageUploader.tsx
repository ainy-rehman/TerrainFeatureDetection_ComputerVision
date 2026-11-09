import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        onImageSelect(acceptedFiles[0]);
      }
    }
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        hover:border-blue-400 hover:bg-blue-50 border-gray-300"
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        Drag and drop an image here, or click to select
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Supports JPG, JPEG, PNG
      </p>
    </div>
  );
};

export default ImageUploader;