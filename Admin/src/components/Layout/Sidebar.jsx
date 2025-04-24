import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { name: 'All Movies', path: 'movies' },
    { name: 'Saved Movies', path: 'saved-movies' },
    { name: 'Categories', path: 'categories' },
    { name: 'Users', path: 'users' },
    { name: 'Settings', path: 'settings' },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;