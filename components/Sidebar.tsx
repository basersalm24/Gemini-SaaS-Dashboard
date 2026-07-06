import React from 'react';
import { HomeIcon, ChartIcon, UsersIcon, SettingsIcon, LogoutIcon } from './icons';

const NavLink: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <a
    href="#"
    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
      active
        ? 'bg-indigo-600 text-white shadow-lg'
        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-4">{label}</span>
  </a>
);

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 bg-slate-800 p-4 hidden md:flex flex-col justify-between border-r border-slate-700">
      <div>
        <div className="flex items-center mb-8 px-4">
          <svg className="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
          </svg>
          <span className="ml-2 text-xl font-bold text-white">Dashboard</span>
        </div>
        <nav className="space-y-2">
          <NavLink icon={<HomeIcon />} label="Home" active />
          <NavLink icon={<ChartIcon />} label="Analytics" />
          <NavLink icon={<UsersIcon />} label="Users" />
          <NavLink icon={<SettingsIcon />} label="Settings" />
        </nav>
      </div>
      <div className="space-y-2">
        <NavLink icon={<LogoutIcon />} label="Log Out" />
      </div>
    </aside>
  );
};

export default Sidebar;