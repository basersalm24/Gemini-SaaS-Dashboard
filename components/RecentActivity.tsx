import React from 'react';
import { ActivityItem } from '../types';

const activityData: ActivityItem[] = [
  { id: 1, user: { name: 'Alex Johnson', avatar: 'https://picsum.photos/seed/user1/32/32' }, action: 'upgraded to', target: 'Pro Plan', timestamp: '2m ago' },
  { id: 2, user: { name: 'Maria Garcia', avatar: 'https://picsum.photos/seed/user2/32/32' }, action: 'commented on', target: 'Ticket #5821', timestamp: '15m ago' },
  { id: 3, user: { name: 'James Smith', avatar: 'https://picsum.photos/seed/user3/32/32' }, action: 'opened a new', target: 'Ticket #5822', timestamp: '45m ago' },
  { id: 4, user: { name: 'Patricia Brown', avatar: 'https://picsum.photos/seed/user4/32/32' }, action: 'closed', target: 'Ticket #5819', timestamp: '1h ago' },
  { id: 5, user: { name: 'Michael Miller', avatar: 'https://picsum.photos/seed/user5/32/32' }, action: 'joined', target: 'the team', timestamp: '3h ago' },
];

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg h-full">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
      <ul className="space-y-4">
        {activityData.map((item) => (
          <li key={item.id} className="flex items-center space-x-3">
            <img src={item.user.avatar} alt={item.user.name} className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <p className="text-sm text-slate-200">
                <span className="font-medium text-white">{item.user.name}</span> {item.action} <span className="font-medium text-indigo-400">{item.target}</span>
              </p>
            </div>
            <span className="text-xs text-slate-500">{item.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;