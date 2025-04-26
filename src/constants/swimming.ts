import { TrainingSessionConfig } from '@/pages/TrainingSession/types';

export enum SwimmingStyle {
  FREESTYLE = 'freestyle',
  BACKSTROKE = 'backstroke',
  BREASTSTROKE = 'breaststroke',
  BUTTERFLY = 'butterfly',
  MEDLEY = 'medley',
}

export const SwimmingStyleLabels: Record<SwimmingStyle, string> = {
  [SwimmingStyle.FREESTYLE]: 'Libre',
  [SwimmingStyle.BACKSTROKE]: 'Espalda',
  [SwimmingStyle.BREASTSTROKE]: 'Pecho',
  [SwimmingStyle.BUTTERFLY]: 'Mariposa',
  [SwimmingStyle.MEDLEY]: 'Combinado',
};

export enum PoolUnit {
  METERS = 'm',
  YARDS = 'yd',
}

export const PoolUnitLabels: Record<PoolUnit, string> = {
  [PoolUnit.METERS]: 'Metros',
  [PoolUnit.YARDS]: 'Yardas',
};

export enum SessionType {
  TRAINING = 'training',
  EVALUATION = 'evaluation',
}

export const SessionTypeLabels: Record<SessionType, string> = {
  [SessionType.TRAINING]: 'Entrenamiento',
  [SessionType.EVALUATION]: 'Evaluación',
};

export enum AquaticDiscipline {
  POOL_SWIMMING = 'pool_swimming',
  OPEN_WATER = 'open_water',
  // WATER_POLO = 'water_polo',
  // ARTISTIC_SWIMMING = 'artistic_swimming',
}

export const AquaticDisciplineLabels: Record<AquaticDiscipline, string> = {
  [AquaticDiscipline.POOL_SWIMMING]: 'Natación en Piscina',
  [AquaticDiscipline.OPEN_WATER]: 'Aguas Abiertas',
  // [AquaticDiscipline.WATER_POLO]: 'Waterpolo',
  // [AquaticDiscipline.ARTISTIC_SWIMMING]: 'Natación Artística',
};

export const DEFAULT_POOL_LENGTHS = [25, 50] as const;
export type PoolLength = (typeof DEFAULT_POOL_LENGTHS)[number];

export const DEFAULT_TRAINING_SESSION_CONFIG: TrainingSessionConfig = {
  poolLength: 25,
  poolUnit: PoolUnit.METERS,
  lapsCount: 1,
  sessionType: SessionType.TRAINING,
  style: SwimmingStyle.FREESTYLE,
  discipline: AquaticDiscipline.POOL_SWIMMING,
  totalDistance: 0,
  lapLength: 0,
};
