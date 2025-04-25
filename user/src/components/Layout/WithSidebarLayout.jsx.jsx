import React, { useState } from 'react';
import Sidebar from '../UserPage/Sidebar';

const WithSidebarLayout = ({ children }) => {
  console.log("WithSidebarLayout - Rendering"); // Debug log
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  console.log("WithSidebarLayout - Children:", children);
console.log("WithSidebarLayout - Selected Genre:", selectedGenre);
console.log("WithSidebarLayout - Active Tab:", activeTab);


  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar - fixed width */}
      <div className="w-64 flex-shrink-0">
        <Sidebar 
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      
      {/* Main Content - scrollable */}
      <div className="flex-1 overflow-y-auto">
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