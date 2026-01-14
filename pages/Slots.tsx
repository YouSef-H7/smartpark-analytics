
import React from 'react';
import SlotTable from '../components/SlotTable';
import { ParkingSlot } from '../api/types';

interface SlotsProps {
  slots: ParkingSlot[];
}

const Slots: React.FC<SlotsProps> = ({ slots }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Slot Inventory</h2>
          <p className="text-slate-400 mt-1">Comprehensive view of all parking bays and their current operational status.</p>
        </div>
        <SlotTable slots={slots} />
      </section>
    </div>
  );
};

export default Slots;
