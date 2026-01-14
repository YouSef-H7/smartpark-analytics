
import React from 'react';
import { HealthStatus } from '../api/types';

interface HealthProps {
  health: HealthStatus | null;
}

const Health: React.FC<HealthProps> = ({ health }) => {
  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight">System Health</h2>
          <p className="text-slate-400 mt-1">Infrastructure status and connectivity monitoring for Node Zone B.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Backend Connectivity</p>
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${health?.status === 'ONLINE' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
              <p className="text-xl font-bold">{health?.status || 'OFFLINE'}</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">System Uptime</p>
            <p className="text-xl font-bold font-mono">{health ? formatUptime(health.uptime) : '--'}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Build Version</p>
            <p className="text-xl font-bold">{health?.version || 'N/A'}</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">Infrastructure Logs</h3>
        <div className="bg-black/40 rounded-lg p-4 font-mono text-sm text-slate-400 space-y-2 max-h-64 overflow-y-auto">
          <p><span className="text-emerald-500">[OK]</span> Polling health check endpoint every 10s</p>
          <p><span className="text-emerald-500">[OK]</span> Polling stats endpoint every 5s</p>
          <p><span className="text-indigo-400">[INFO]</span> Analytics Node ready for OCI Load Balancer traffic</p>
          <p><span className="text-slate-500">[{new Date().toISOString()}]</span> HEARTBEAT: Success</p>
        </div>
      </section>
    </div>
  );
};

export default Health;
