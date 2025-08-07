import React from "react";
import {
  FaHome,
  FaHeart,
  FaFire,
  FaCalendarAlt,
  FaCog,
  FaStar,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";

const Sidebar = ({
  activeTab,
  setActiveTab,
  onNavItemClick
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    if (onNavItemClick) onNavItemClick(); // Close sidebar on mobile
  };

  // Get first letter of username or 'G' for Guest
  const getInitial = () => {
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    return 'G';
  };

  return (
    <div className="w-full bg-gray-800 p-4 flex flex-col h-full">
      {/* Logo/Branding with mobile menu button space */}
      <div className="flex justify-between items-center mb-8">
        <NavLink 
          to={user ? "/" : "/user-page"}
          onClick={() => {
            if (!user) {
              navigate('/user-page');
            }
          }}
          className="flex items-center"
        >
          <FaHome className="text-yellow-400 text-xl mr-2" />
          <h2 className="text-xl font-bold">Bruh Picks</h2>
        </NavLink>
        {/* This empty div maintains space for mobile close button */}
        <div className="w-8 my-14 md:hidden"></div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/user-page"
              onClick={() => handleNavClick("all")}
              className={({ isActive }) =>
                `flex items-center w-full p-3 rounded-lg ${
                  isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-700"
                }`
              }
            >
              <FaHome className="mr-3" />
              All Movies
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/favorites"
              onClick={() => handleNavClick("favorites")}
              className={({ isActive }) =>
                `flex items-center w-full p-3 rounded-lg ${
                  isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-700"
                }`
              }
            >
              <FaHeart className="mr-3" />
              Favorites
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/trending"
              onClick={() => handleNavClick("trending")}
              className={({ isActive }) =>
                `flex items-center w-full p-3 rounded-lg ${
                  isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-700"
                }`
              }
            >
              <FaFire className="mr-3" />
              Trending
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/new-releases"
              onClick={() => handleNavClick("new")}
              className={({ isActive }) =>
                `flex items-center w-full p-3 rounded-lg ${
                  isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-700"
                }`
              }
            >
              <FaCalendarAlt className="mr-3" />
              New Releases
            </NavLink>
          </li>

          <li>
            <NavLink
    to="/for-you"
    className={({ isActive }) =>
      `flex items-center p-3 rounded-lg ${
        isActive ? 'bg-gray-700 text-yellow-400' : 'hover:bg-gray-700'
      }`
    }
  >
    <FaStar className="mr-3" />
    For You
  </NavLink>
          </li>
        </ul>
      </nav>

      {/* Profile Section */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center p-3 mb-4 rounded-lg ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            } cursor-pointer`
          }
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full mr-3 bg-gray-600 flex items-center justify-center text-white font-bold">
              {getInitial()}
            </div>
          )}
          <div>
            <p className="font-medium">{user?.username || "Guest User"}</p>
            <p className="text-xs text-gray-400">
              {user?.email || "guest@example.com"}
            </p>
          </div>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center w-full p-3 rounded-lg ${
              isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-700"
            }`
          }
        >
          <FaCog className="mr-3" />
          Settings
        </NavLink>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 mt-2"
        >
          <FiLogOut className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;