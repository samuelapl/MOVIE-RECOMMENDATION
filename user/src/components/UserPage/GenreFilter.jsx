import React from "react";
import { FaFilter } from "react-icons/fa";

const GenreFilter = ({ genres, selectedGenre, setSelectedGenre }) => {
  return (
    <div className="relative group">
      <button className="flex items-center px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
        <FaFilter className="mr-2" />
        {selectedGenre || "Filter by Genre"}
      </button>
      
      <div className="absolute z-10 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block">
        <div className="p-2 max-h-60 overflow-y-auto">
          <button
            onClick={() => setSelectedGenre(null)}
            className={`w-full text-left p-2 rounded ${
              !selectedGenre ? "text-yellow-400" : "hover:text-gray-300"
            }`}
          >
            All Genres
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`w-full text-left p-2 rounded ${
                genre === selectedGenre ? "text-yellow-400" : "hover:text-gray-300"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreFilter;