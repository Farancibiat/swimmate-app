import { DEFAULT_TRAINING_SESSION_CONFIG } from '@/constants/swimming';
import { TrainingSessionConfig } from '@/pages/TrainingSession/types';
import { User } from '@/types';
import { create } from 'zustand';



interface AppState {
  //Global
  user: User | null,
  setUser: (user: User | null) => void;

  //Training Session
  TrainingSessionConfig: TrainingSessionConfig | null,
  setTrainingSessionConfig: (TrainingSessionConfig: TrainingSessionConfig | null) => void;
  step: 'config' | 'swimmers' | 'timer';
  setStep: (step: 'config' | 'swimmers' | 'timer') => void;
}

export const useSwimStore = create<AppState>((set) => ({
  //Global
  user: null,
  setUser: (user) => set({ user }),
  
  //Training Session
  step: 'config',
  setStep: (step) => set({step}),
  TrainingSessionConfig: DEFAULT_TRAINING_SESSION_CONFIG,
  setTrainingSessionConfig: (TrainingSessionConfig) => set({TrainingSessionConfig}),

}));