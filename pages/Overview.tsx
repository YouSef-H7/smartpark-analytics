
import React from 'react';
import KpiGrid from '../components/KpiGrid';
import DonutChart from '../components/DonutChart';
import TrendChart from '../components/TrendChart';
import SlotTable from '../components/SlotTable';
import { ParkingStats, ParkingSlot } from '../api/types';

interface OverviewProps {
  stats: ParkingStats | null;
  history: { time: string, rate: number }[];
  slots: ParkingSlot[];
}

const Overview: React.FC<OverviewProps> = ({ stats, history, slots }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Facility Overview</h2>
          <p className="text-slate-400 mt-1">Real-time capacity and utilization analytics for SmartPark Zone B.</p>
        </div>
        <KpiGrid stats={stats} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Occupancy Breakdown
          </h3>
          <DonutChart stats={stats} />
        </section>
        
        <section className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
              Utilization Trend
            </h3>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Live 5m Window</span>
          </div>
          <TrendChart history={history} />
        </section>
      </div>

      <section>
        <SlotTable slots={slots.slice(0, 10)} />
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            Showing top 10 slots. For full details, navigate to the Slots tab.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Overview;
