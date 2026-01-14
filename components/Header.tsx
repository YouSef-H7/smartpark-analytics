
import React from 'react';
import { NavLink } from 'react-router-dom';
import StatusPill from './StatusPill';

interface HeaderProps {
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
}

const Header: React.FC<HeaderProps> = ({ status }) => {
  const navItems = [
    { to: '/', label: 'Overview' },
    { to: '/slots', label: 'Slots' },
    { to: '/health', label: 'Health' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight hidden sm:block">SmartPark Analytics</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6 ml-10">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-indigo-400 ${
                    isActive ? 'text-indigo-500' : 'text-slate-400'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
           <StatusPill status={status} />
        </div>
      </div>
    </header>
  );
};

export default Header;
