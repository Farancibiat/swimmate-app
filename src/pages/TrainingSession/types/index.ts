import { Swimmer as ApiSwimmer } from '@/types';

// Configuración de la sesión
export interface SessionConfig {
  poolLength: number;
  poolUnit: 'm' | 'yd';
  lapsCount: number;
  sessionType: 'training' | 'evaluation';
  style?: string;
  notes?: string;
}

// Nadador durante la sesión
export interface Swimmer {
  id: string;
  name: string;
  laps: number[];
  total: number;
  avg: number;
}

// Estado de la sesión
export interface SessionState {
  swimmers: Swimmer[];
  startTime?: number;
  isRunning: boolean;
  isEnded: boolean;
}

// Tipos para eventos
export interface LapEvent {
  swimmerId: string;
  lapTime: number;
  lapNumber: number;
  timestamp: number;
}

// DTOs para la API
export interface CreateSessionDTO {
  config: SessionConfig;
  swimmers: string[]; // IDs de los nadadores
  coachId: string;
}

export interface SessionResponse {
  id: string;
  config: SessionConfig;
  swimmers: ApiSwimmer[];
  events: LapEvent[];
  createdAt: string;
  updatedAt: string;
}
