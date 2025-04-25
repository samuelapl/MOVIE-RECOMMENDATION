// NewReleases.jsx
import React from 'react';
import { FaCalendarAlt, FaTools } from 'react-icons/fa';

const NewReleases = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <div className="flex items-center mb-6 animate-pulse">
        <FaCalendarAlt className="text-5xl text-blue-400 mr-3" />
        <FaTools className="text-5xl text-blue-400" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">New Releases Under Construction</h2>
      <p className="text-gray-400 max-w-md">
        Exciting new content is on its way! Check back soon.
      </p>
    </div>
  );
};

export default NewReleases;