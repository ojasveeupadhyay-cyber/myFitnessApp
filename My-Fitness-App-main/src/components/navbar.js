import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold tracking-wider text-blue-400">
          <NavLink to="/">FITNESS PRO</NavLink>
        </div>
        
        <ul className="flex space-x-6 text-sm font-medium">
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `transition-colors duration-200 hover:text-blue-400 ${isActive ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : ''}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/workout-log" 
              className={({ isActive }) => 
                `transition-colors duration-200 hover:text-blue-400 ${isActive ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : ''}`
              }
            >
              Workout Log
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/calorie-tracker" 
              className={({ isActive }) => 
                `transition-colors duration-200 hover:text-blue-400 ${isActive ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : ''}`
              }
            >
              Calorie Tracker
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/calculators" 
              className={({ isActive }) => 
                `transition-colors duration-200 hover:text-blue-400 ${isActive ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : ''}`
              }
            >
              Calculators
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
