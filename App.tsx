
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import Overview from './pages/Overview';
import Slots from './pages/Slots';
import Health from './pages/Health';
import { fetchStats, fetchSlots, fetchHealth, API_BASE } from './api/client';
import { ParkingStats, ParkingSlot, HealthStatus } from './api/types';

const App: React.FC = () => {
  const [stats, setStats] = useState<ParkingStats | null>(null);
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<{ time: string, rate: number }[]>([]);
  
  const backoffRef = useRef({ stats: 1000, slots: 1000, health: 1000 });

  const updateData = useCallback(async () => {
    if (!API_BASE) return;

    try {
      const statsData = await fetchStats();
      setStats(statsData);
      backoffRef.current.stats = 1000; // Reset backoff
      setError(null);
    } catch (err) {
      setError('Connection to Stats API failed. Retrying...');
      backoffRef.current.stats = Math.min(backoffRef.current.stats * 2, 30000);
    }

    try {
      const slotsData = await fetchSlots();
      setSlots(slotsData);
      backoffRef.current.slots = 1000;
    } catch (err) {
      backoffRef.current.slots = Math.min(backoffRef.current.slots * 2, 30000);
    }
  }, []);

  const updateHealth = useCallback(async () => {
    if (!API_BASE) return;
    try {
      const healthData = await fetchHealth();
      setHealth(healthData);
      backoffRef.current.health = 1000;
    } catch (err) {
      setHealth({ status: 'OFFLINE', uptime: 0, version: 'N/A' });
      backoffRef.current.health = Math.min(backoffRef.current.health * 2, 30000);
    }
  }, []);

  // Utilization History (last 5 mins, 5s intervals = 60 samples)
  useEffect(() => {
    const interval = setInterval(() => {
      if (stats) {
        const rate = stats.total > 0 ? (stats.occupied / stats.total) * 100 : 0;
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setHistory(prev => {
          const newHistory = [...prev, { time: now, rate: parseFloat(rate.toFixed(1)) }];
          return newHistory.slice(-60);
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [stats]);

  // Polling logic
  useEffect(() => {
    const statsTimer = setInterval(updateData, 5000);
    const healthTimer = setInterval(updateHealth, 10000);
    
    updateData();
    updateHealth();

    return () => {
      clearInterval(statsTimer);
      clearInterval(healthTimer);
    };
  }, [updateData, updateHealth]);

  return (
    <BrowserRouter basename="/analytics">
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
        <Banner message={!API_BASE ? "Backend not configured" : error} type={!API_BASE ? "warning" : "error"} />
        <Header status={health?.status || 'OFFLINE'} />
        
        <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
          <Routes>
            <Route path="/" element={<Overview stats={stats} history={history} slots={slots} />} />
            <Route path="/slots" element={<Slots slots={slots} />} />
            <Route path="/health" element={<Health health={health} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="border-t border-slate-800 py-6 px-4 bg-slate-900/50">
          <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <p>SmartPark Analytics Node – Zone B</p>
            <p className="mt-2 md:mt-0 opacity-60">© {new Date().getFullYear()} SmartPark Pro Enterprise</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
