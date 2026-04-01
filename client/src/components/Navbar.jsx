import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Workouts', path: '/workouts', icon: '💪' },
    { name: 'Calories', path: '/calories', icon: '🍎' },
    { name: 'Calculators', path: '/calculators', icon: '🔢' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <span className="text-xl text-white font-bold">⚡</span>
             </div>
             <span className="font-black text-xl tracking-tight text-slate-900 hidden sm:block">FitnessTracker</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 shadow-sm shadow-blue-100/50' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                >
                  <span className="opacity-80">{link.icon}</span>
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
               <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">{user?.name || 'Athlete'}</p>
                  <p className="text-[10px] uppercase font-black tracking-wider text-slate-400">Online</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white shadow-sm flex items-center justify-center text-orange-600 font-bold">
                 {user?.name?.charAt(0).toUpperCase() || 'U'}
               </div>
            </div>
            
            <button
              onClick={onLogout}
              className="ml-2 p-2.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-300 group flex items-center justify-center"
              title="Log Out"
            >
              <svg xmlns="http://www.w3.org" className="h-5 w-5 transform group-hover:translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation (Bottom Bar or Simple Scroll) */}
      <div className="md:hidden flex overflow-x-auto px-4 py-3 bg-white/95 border-t border-slate-100 shadow-inner hide-scrollbar">
         <div className="flex space-x-2">
           {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                      : 'bg-slate-50 text-slate-600 border border-slate-100'
                    }`}
                >
                  <span className={`${isActive ? 'opacity-100 drop-shadow-sm' : 'opacity-70'}`}>{link.icon}</span>
                  {link.name}
                </Link>
              );
            })}
         </div>
      </div>
    </nav>
  );
}
