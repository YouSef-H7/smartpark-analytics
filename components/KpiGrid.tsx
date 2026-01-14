
import React from 'react';
import { ParkingStats } from '../api/types';

interface KpiGridProps {
  stats: ParkingStats | null;
}

const KpiGrid: React.FC<KpiGridProps> = ({ stats }) => {
  const utilization = stats ? ((stats.occupied / stats.total) * 100).toFixed(1) : '0';
  const reserved = stats?.reserved ?? 0;

  const items = [
    { label: 'Total Slots', value: stats?.total ?? '--', color: 'text-slate-50' },
    { label: 'Available', value: stats?.available ?? '--', color: 'text-emerald-400' },
    { label: 'Occupied', value: stats?.occupied ?? '--', color: 'text-rose-400' },
    { label: 'Reserved', value: reserved, color: 'text-amber-400' },
    { label: 'Utilization', value: `${utilization}%`, color: 'text-indigo-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
          <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default KpiGrid;
