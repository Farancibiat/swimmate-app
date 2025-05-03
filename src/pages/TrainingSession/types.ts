import { PoolLength, PoolUnit, SessionType, SwimmingStyle, AquaticDiscipline } from '@/constants/swimming';
import { Swimmer } from '@/types';

export interface TrainingSessionConfig {
  poolLength?: PoolLength;
  poolUnit?: PoolUnit;
  lapsCount?: number;
  sessionType?: SessionType;
  style?: SwimmingStyle;
  discipline?: AquaticDiscipline;
  totalDistance?: number;
  lapLength?: number;
}

export interface SwimmerTraining extends Swimmer {
  laps: number[];
  tiemposAcumulados: number[];
  total: number;
  avg: number;
}

export interface TrainingSessionState {
  swimmers: SwimmerTraining[];
  startTime?: number;
  isRunning: boolean;
  isEnded: boolean;
  pausedAtTime?: number;
  sessionConfig?: TrainingSessionConfig;
}
