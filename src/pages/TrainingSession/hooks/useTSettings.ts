import { useState } from 'react';
import { TrainingSessionState, SwimmerTraining } from '../types';
import { useSwimStore } from '@/store/useSwimStore';

export const useTSettings = () => {
  const [sessionState, setSessionState] = useState<TrainingSessionState | null>(null);
  const { step, TrainingSessionConfig, setStep, setTrainingSessionConfig } = useSwimStore();

  const handleSwimmersComplete = (swimmers: SwimmerTraining[]) => {
    if (!TrainingSessionConfig) {
      return;
    }

    setSessionState({
      swimmers,
      isRunning: false,
      isEnded: false,
    });
    setStep('timer');
  };
  const handleBack = () => {
    switch (step) {
      case 'swimmers':
        setStep('config');
        break;
      case 'timer':
        setStep('swimmers');
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('swimmers');
  };

  return {
    step,
    TrainingSessionConfig,
    sessionState,
    setTrainingSessionConfig,
    handleSwimmersComplete,
    handleBack,
    handleSubmit,
  };
};
