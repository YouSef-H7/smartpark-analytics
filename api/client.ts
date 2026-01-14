
import { ParkingStats, ParkingSlot, HealthStatus } from './types';

// Runtime configuration support for Docker deployments
// window.RUNTIME_BACKEND_URL is injected by the entrypoint.sh script in Nginx
// Fix: Use type assertion for import.meta to access the 'env' property which is provided by Vite but may not be present in basic TS types.
export const API_BASE = (window as any).RUNTIME_BACKEND_URL || (import.meta as any).env?.VITE_BACKEND_URL || '';

// Fix: Use an intersection type to extend RequestInit with an optional timeout property to resolve the TS error.
async function fetchWithTimeout(resource: string, options: RequestInit & { timeout?: number } = {}) {
  const { timeout = 8000, ...fetchOptions } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...fetchOptions,
    signal: controller.signal
  });
  clearTimeout(id);
  return response;
}

export const fetchStats = async (): Promise<ParkingStats> => {
  if (!API_BASE) throw new Error("Backend not configured");
  const response = await fetchWithTimeout(`${API_BASE}/api/stats`);
  if (!response.ok) throw new Error(`Stats error: ${response.statusText}`);
  return response.json();
};

export const fetchSlots = async (): Promise<ParkingSlot[]> => {
  if (!API_BASE) throw new Error("Backend not configured");
  const response = await fetchWithTimeout(`${API_BASE}/api/slots`);
  if (!response.ok) throw new Error(`Slots error: ${response.statusText}`);
  return response.json();
};

export const fetchHealth = async (): Promise<HealthStatus> => {
  if (!API_BASE) throw new Error("Backend not configured");
  const response = await fetchWithTimeout(`${API_BASE}/health`);
  if (!response.ok) throw new Error(`Health error: ${response.statusText}`);
  return response.json();
};
