
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrendChartProps {
  history: { time: string, rate: number }[];
}

const TrendChart: React.FC<TrendChartProps> = ({ history }) => {
  if (history.length === 0) return <div className="h-64 flex items-center justify-center text-slate-500">Awaiting samples...</div>;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={history}>
          <defs>
            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#94a3b8" 
            fontSize={10} 
            tickFormatter={(val) => val.split(':')[1] + ':' + val.split(':')[2]}
            interval={Math.ceil(history.length / 5)}
          />
          <YAxis stroke="#94a3b8" fontSize={10} domain={[0, 100]} unit="%" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
            itemStyle={{ color: '#f8fafc' }}
          />
          <Area type="monotone" dataKey="rate" stroke="#6366f1" fillOpacity={1} fill="url(#colorRate)" isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
