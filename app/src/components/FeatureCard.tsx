import React from 'react';
import { Feature } from '../data/features';

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={feature.image}
        alt={feature.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {feature.name}
        </h3>
        <p className="text-gray-600">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;