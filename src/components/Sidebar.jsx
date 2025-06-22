import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { name: 'Dashboard', to: '/dashboard' },
    { name: 'Kanban', to: '/kanban' },
    { name: 'Calendar', to: '/calendar' },
    { name: 'Table', to: '/table' },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-md p-4 space-y-4">
      <h2 className="text-xl font-bold text-blue-600 mb-6">Admin Panel</h2>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-blue-100 ${
              isActive ? 'bg-blue-200 font-semibold' : ''
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
