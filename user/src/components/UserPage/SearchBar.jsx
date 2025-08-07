import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="relative group">
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FaSearch className={`transition-colors duration-300 ${
            isFocused ? 'text-purple-400' : 'text-slate-400'
          }`} />
        </div>
        
        {/* Input Field */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full pl-12 pr-12 py-4 bg-slate-800/80 backdrop-blur-md border rounded-2xl focus:outline-none transition-all duration-300 text-white placeholder-slate-400 ${
            isFocused 
              ? 'border-purple-500/50 bg-slate-800/90 shadow-lg shadow-purple-500/10' 
              : 'border-slate-600/50 hover:border-slate-500/50'
          }`}
          placeholder="Search for movies, genres, actors..."
        />
        
        {/* Clear Button */}
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors duration-300"
          >
            <FaTimes />
          </button>
        )}
        
        {/* Focus Ring */}
        <div className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
          isFocused ? 'ring-2 ring-purple-500/20 ring-offset-2 ring-offset-transparent' : ''
        }`} />
      </div>
      
      {/* Search Suggestions Placeholder */}
      {isFocused && searchQuery && (
        <div className="absolute z-10 mt-2 w-full bg-slate-800/95 backdrop-blur-md border border-slate-600/50 rounded-xl shadow-2xl shadow-black/50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 text-slate-400 text-sm">
            Press Enter to search for "{searchQuery}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
