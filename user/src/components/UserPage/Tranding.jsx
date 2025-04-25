// Trending.jsx
import React from 'react';
import { FaFire, FaExclamationTriangle } from 'react-icons/fa';

const Trending = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <div className="flex items-center mb-6 animate-pulse">
        <FaFire className="text-5xl text-yellow-400 mr-3" />
        <FaExclamationTriangle className="text-5xl text-yellow-400" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Trending Section Coming Soon!</h2>
      <p className="text-gray-400 max-w-md">
        We're working hard to bring you the hottest trending content. Stay tuned!
      </p>
    </div>
  );
};

export default Trending;