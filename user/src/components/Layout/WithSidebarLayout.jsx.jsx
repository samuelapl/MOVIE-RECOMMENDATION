import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Sidebar from '../UserPage/Sidebar';

const WithSidebarLayout = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white relative">
      {/* Mobile Sidebar Toggle Button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-md shadow-lg"
      >
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar - Mobile & Desktop */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transform transition-transform duration-300 fixed md:static 
        w-64 h-full z-40 bg-gray-800 flex-shrink-0`}>
        <Sidebar 
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onNavItemClick={() => setSidebarOpen(false)} // Close sidebar on mobile when item clicked
        />
      </div>
      
      {/* Main Content - scrollable */}
      <div className="flex-1 overflow-y-auto pt-16 md:pt-0">
        {React.cloneElement(children, { 
          selectedGenre, 
          activeTab,
          setSelectedGenre,
          setActiveTab
        })}
      </div>
    </div>
  );
};

export default WithSidebarLayout;