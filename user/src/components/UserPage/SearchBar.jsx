// SearchBar.js
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-6">
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Search movies..."
        />
      </div>
    </div>
  );
};

export default SearchBar;