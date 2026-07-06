import React from 'react';
import { Metric } from '../types';

const MetricCard: React.FC<Metric> = ({ title, value, change, changeType }) => {
  const isIncrease = changeType === 'increase';
  const changeColor = isIncrease ? 'text-green-400' : 'text-red-400';

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <div className="flex items-baseline justify-between mt-1">
        <p className="text-3xl font-semibold text-white">{value}</p>
        <div className={`flex items-center text-sm font-semibold ${changeColor}`}>
          {isIncrease ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;