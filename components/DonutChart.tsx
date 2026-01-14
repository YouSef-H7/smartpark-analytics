
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ParkingStats } from '../api/types';

interface DonutChartProps {
  stats: ParkingStats | null;
}

const DonutChart: React.FC<DonutChartProps> = ({ stats }) => {
  if (!stats) return <div className="h-64 flex items-center justify-center text-slate-500">No data available</div>;

  const data = [
    { name: 'Available', value: stats.available },
    { name: 'Occupied', value: stats.occupied },
    { name: 'Reserved', value: stats.reserved || 0 },
  ];

  const COLORS = ['#10b981', '#f43f5e', '#f59e0b'];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
            itemStyle={{ color: '#f8fafc' }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;
