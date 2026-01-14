
import React, { useState } from 'react';
import { ParkingSlot, SlotState } from '../api/types';

interface SlotTableProps {
  slots: ParkingSlot[];
}

const SlotTable: React.FC<SlotTableProps> = ({ slots }) => {
  const [filter, setFilter] = useState<SlotState | 'ALL'>('ALL');

  const filteredSlots = slots.filter(s => filter === 'ALL' || s.state === filter);

  const getBadgeStyle = (state: SlotState) => {
    switch(state) {
      case 'AVAILABLE': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'OCCUPIED': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'RESERVED': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="font-semibold text-slate-100">Slot Insights</h3>
        <div className="flex bg-slate-800 p-1 rounded-lg">
          {(['ALL', 'AVAILABLE', 'OCCUPIED', 'RESERVED'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                filter === f ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Slot ID</th>
              <th className="px-6 py-4">State</th>
              <th className="px-6 py-4">Last Change</th>
              <th className="px-6 py-4">Zone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-sm">
            {filteredSlots.length > 0 ? filteredSlots.map(slot => (
              <tr key={slot.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4 font-mono font-medium text-slate-300">{slot.id}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle(slot.state)}`}>
                    {slot.state}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400">
                  {new Date(slot.lastChange).toLocaleString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </td>
                <td className="px-6 py-4 text-slate-500 font-bold">{slot.zone || 'B'}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500 italic">No slots found matching criteria</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SlotTable;
