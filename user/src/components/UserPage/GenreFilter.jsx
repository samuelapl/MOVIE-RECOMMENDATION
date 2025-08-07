import React, { useState } from "react";
import { FaFilter, FaChevronDown } from "react-icons/fa";

const GenreFilter = ({ genres, selectedGenre, setSelectedGenre }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-md border border-slate-600/50 rounded-xl hover:from-slate-700/80 hover:to-slate-600/80 transition-all duration-300 min-w-[200px] group"
      >
        <div className="flex items-center space-x-2">
          <FaFilter className="text-purple-400 group-hover:text-purple-300 transition-colors" />
          <span className="text-white font-medium truncate">
            {selectedGenre || "All Genres"}
          </span>
        </div>
        <FaChevronDown className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute z-20 mt-2 w-full bg-slate-800/95 backdrop-blur-md border border-slate-600/50 rounded-xl shadow-2xl shadow-black/50 animate-in slide-in-from-top-2 duration-200">
            <div className="p-2 max-h-80 overflow-y-auto custom-scrollbar">
              <button
                onClick={() => {
                  setSelectedGenre(null);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  !selectedGenre 
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" 
                    : "hover:bg-slate-700/50 text-slate-300 hover:text-white"
                }`}
              >
                <span className="font-medium">All Genres</span>
                {!selectedGenre && <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full" />}
              </button>
              
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => {
                    setSelectedGenre(genre);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    genre === selectedGenre 
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" 
                      : "hover:bg-slate-700/50 text-slate-300 hover:text-white"
                  }`}
                >
                  <span className="font-medium">{genre}</span>
                  {genre === selectedGenre && <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default GenreFilter;
