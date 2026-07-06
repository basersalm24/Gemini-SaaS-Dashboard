import React from 'react';
import { SearchIcon, BellIcon, ChevronDownIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="flex-shrink-0 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 shadow-md">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 pl-10 pr-4 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <BellIcon />
          </button>
          <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-lg hover:bg-slate-700 transition-colors">
            <img
              src="https://picsum.photos/seed/user/40/40"
              alt="User Avatar"
              className="w-9 h-9 rounded-full border-2 border-slate-600"
            />
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-white">Jane Doe</div>
              <div className="text-xs text-slate-400">Administrator</div>
            </div>
            <ChevronDownIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;