import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-red-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Globe className="h-8 w-8 mr-2" />
            <Link to="/" className="text-xl font-bold">
              Mars Terrain Detector
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="hover:bg-red-700 px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/detect" className="hover:bg-red-700 px-3 py-2 rounded-md">
              Detect Features
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;