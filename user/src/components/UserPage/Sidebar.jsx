import React, { useState } from "react";
import {
  FaHome,
  FaHeart,
  FaFire,
  FaCalendarAlt,
  FaCog,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";

const Sidebar = ({
  activeTab,
  setActiveTab,
  onNavItemClick
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    if (onNavItemClick) onNavItemClick();
  };

  const getInitial = () => {
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    return 'G';
  };

  const navItems = [
    {
      to: "/user-page",
      tab: "all",
      icon: FaHome,
      label: "All Movies",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      to: "/favorites",
      tab: "favorites", 
      icon: FaHeart,
      label: "Favorites",
      gradient: "from-red-500 to-pink-500"
    },
    {
      to: "/trending",
      tab: "trending",
      icon: FaFire,
      label: "Trending", 
      gradient: "from-orange-500 to-red-500"
    },
    {
      to: "/new-releases",
      tab: "new",
      icon: FaCalendarAlt,
      label: "New Releases",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      to: "/for-you",
      tab: "for-you",
      icon: FaStar,
      label: "For You",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className={`bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/50 p-6 flex flex-col h-full transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-full'
    }`}>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <NavLink 
          to={user ? "/" : "/user-page"}
          onClick={() => {
            if (!user) {
              navigate('/user-page');
            }
          }}
          className="flex items-center group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
            <FaHome className="text-white text-lg" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Bruh Picks
              </h2>
              <p className="text-xs text-slate-400">Movie Platform</p>
            </div>
          )}
        </NavLink>
        
        {/* Collapse Toggle - Desktop only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex w-8 h-8 bg-slate-800/50 backdrop-blur-md border border-slate-600/50 rounded-lg items-center justify-center hover:bg-slate-700/50 transition-all duration-300"
        >
          <FiMenu className="text-slate-400" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => handleNavClick(item.tab)}
              className={({ isActive }) =>
                `group relative flex items-center p-4 rounded-xl transition-all duration-300 overflow-hidden ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white shadow-lg shadow-purple-500/10' 
                    : 'hover:bg-slate-800/50 text-slate-300 hover:text-white border border-transparent hover:border-slate-600/30'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Background gradient for active state */}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10 rounded-xl`} />
                  )}
                  
                  {/* Icon */}
                  <div className={`relative z-10 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-r ${item.gradient} shadow-lg` 
                      : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                  }`}>
                    <Icon className={`text-lg ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`} />
                  </div>
                  
                  {/* Label */}
                  {!isCollapsed && (
                    <span className="relative z-10 ml-4 font-medium transition-all duration-300">
                      {item.label}
                    </span>
                  )}
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute right-2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Profile Section */}
      <div className="mt-auto pt-6 border-t border-slate-700/50 space-y-3">
        {/* User Profile */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `group flex items-center p-4 rounded-xl transition-all duration-300 ${
              isActive 
                ? "bg-slate-800/50 border border-slate-600/50" 
                : "hover:bg-slate-800/30 border border-transparent hover:border-slate-600/30"
            }`
          }
        >
          <div className="relative">
            {user?.avatar ? (
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.username}
                className="w-12 h-12 rounded-xl object-cover border-2 border-slate-600/50 group-hover:border-purple-500/50 transition-colors duration-300"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {getInitial()}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full" />
          </div>
          
          {!isCollapsed && (
            <div className="ml-4 flex-1 min-w-0">
              <p className="font-semibold text-white truncate">
                {user?.username || "Guest User"}
              </p>
              <p className="text-sm text-slate-400 truncate">
                {user?.email || "guest@example.com"}
              </p>
            </div>
          )}
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `group flex items-center p-4 rounded-xl transition-all duration-300 ${
              isActive 
                ? 'bg-slate-800/50 border border-slate-600/50 text-white' 
                : 'hover:bg-slate-800/30 text-slate-300 hover:text-white border border-transparent hover:border-slate-600/30'
            }`
          }
        >
          <div className="w-10 h-10 rounded-lg bg-slate-700/50 group-hover:bg-slate-600/50 flex items-center justify-center transition-all duration-300">
            <FaCog className="text-lg" />
          </div>
          {!isCollapsed && (
            <span className="ml-4 font-medium">Settings</span>
          )}
        </NavLink>

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="group w-full flex items-center p-4 rounded-xl hover:bg-red-500/10 hover:border-red-500/30 border border-transparent text-slate-300 hover:text-red-400 transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-lg bg-slate-700/50 group-hover:bg-red-500/20 flex items-center justify-center transition-all duration-300">
            <FiLogOut className="text-lg" />
          </div>
          {!isCollapsed && (
            <span className="ml-4 font-medium">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

