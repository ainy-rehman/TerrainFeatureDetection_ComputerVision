import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import { features } from '../data/features';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Mars Terrain Feature Detection
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore and identify Martian geological features using advanced AI
        </p>
        <Link
          to="/detect"
          className="inline-flex items-center px-6 py-3 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-700"
        >
          <Camera className="mr-2" />
          Start Detection
          <ArrowRight className="ml-2" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <FeatureCard key={feature.name} feature={feature} />
        ))}
      </div>
    </div>
  );
};

export default Home;