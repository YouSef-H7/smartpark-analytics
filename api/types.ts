
export type SlotState = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED';

export interface ParkingSlot {
  id: string;
  state: SlotState;
  lastChange: string;
  zone?: string;
}

export interface ParkingStats {
  total: number;
  available: number;
  occupied: number;
  reserved?: number;
  lastUpdated: string;
}

export interface HealthStatus {
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  uptime: number;
  version: string;
}
