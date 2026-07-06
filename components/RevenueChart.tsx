import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartDataPoint } from '../types';

interface RevenueChartProps {
  data: ChartDataPoint[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg h-96">
      <h3 className="text-lg font-semibold text-white mb-4">Revenue Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
          <YAxis stroke="#9ca3af" tickFormatter={(value) => `$${Number(value) / 1000}k`} tick={{ fill: '#9ca3af', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              borderColor: '#4b5563',
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#d1d5db' }}
          />
          <Legend wrapperStyle={{fontSize: "14px", bottom: 0}}/>
          <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={{ r: 4, fill: '#6366f1' }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;