import { useSwimStore } from '@/store/useSwimStore';
import { SwimmerTraining } from '../types';
import { useState } from 'react';

export enum TrainingSessionStep {
  CONFIG = 'config',
  SWIMMERS = 'swimmers',
  TIMER = 'timer',
}

export const useTrainingSession = () => {
  // Usar el estado global en lugar de local
  const { step, setStep, TrainingSessionConfig, setTrainingSessionConfig, sessionState, setSessionState } =
    useSwimStore();

  // Navegación entre pasos
  const goToStep = (newStep: TrainingSessionStep) => {
    setStep(newStep);
  };

  const goBack = () => {
    if (step === TrainingSessionStep.CONFIG || sessionState?.isRunning) {
      return;
    }
    switch (step) {
      case TrainingSessionStep.SWIMMERS:
        goToStep(TrainingSessionStep.CONFIG);
        break;
      case TrainingSessionStep.TIMER:
        goToStep(TrainingSessionStep.SWIMMERS);
        break;
      default:
        break;
    }
  };

  // Manejadores específicos para cada paso
  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!TrainingSessionConfig) {
      return;
    }
    goToStep(TrainingSessionStep.SWIMMERS);
  };

  const handleSwimmersSubmit = (swimmers: SwimmerTraining[]) => {
    console.log('handleSwimmersSubmit - swimmers recibidos:', swimmers);

    // Usar el setter del store global
    setSessionState({
      swimmers,
      isRunning: false,
      isEnded: false,
      sessionConfig: TrainingSessionConfig || undefined,
    });

    console.log('handleSwimmersSubmit - sessionState actualizado:', {
      swimmers,
      isRunning: false,
      isEnded: false,
      sessionConfig: TrainingSessionConfig,
    });

    goToStep(TrainingSessionStep.TIMER);
  };

  return {
    // Estado actual
    step,
    TrainingSessionConfig,
    sessionState,

    // Setters
    setTrainingSessionConfig,
    setSessionState,

    // Navegación
    goToStep,
    goBack,

    // Handlers específicos
    handleConfigSubmit,
    handleSwimmersSubmit,
  };
};
