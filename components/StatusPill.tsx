
import React from 'react';

interface StatusPillProps {
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
}

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  const configs = {
    ONLINE: { color: 'bg-emerald-500', text: 'ONLINE', pulse: 'bg-emerald-400' },
    DEGRADED: { color: 'bg-amber-500', text: 'DEGRADED', pulse: 'bg-amber-400' },
    OFFLINE: { color: 'bg-rose-500', text: 'OFFLINE', pulse: 'bg-rose-400' },
  };

  const config = configs[status];

  return (
    <div className="flex items-center space-x-2 px-3 py-1 bg-slate-900 border border-slate-700 rounded-full">
      <div className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.pulse} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.color}`}></span>
      </div>
      <span className="text-[10px] font-bold tracking-wider text-slate-200">{config.text}</span>
    </div>
  );
};

export default StatusPill;
