import { useState } from "react";
import { TrainingSessionState, SwimmerTraining } from "../types";
import { useSwimStore } from "@/store/useSwimStore";

export const useTrainingSession = () => {
  const [sessionState, setSessionState] = useState<TrainingSessionState | null>(null);
  const {
 step, TrainingSessionConfig, setStep, setTrainingSessionConfig } = useSwimStore();

  const handleConfigComplete = () => {
    setStep("swimmers");
  };

  const handleSwimmersComplete = (swimmers: SwimmerTraining[]) => {
    if (!TrainingSessionConfig) {
      return;
    }

    setSessionState({
 swimmers, isRunning: false, isEnded: false 
});
    setStep("timer");
  };
  const handleBack = () => {
    switch (step) {
      case "swimmers":
        setStep("config");
        break;
      case "timer":
        setStep("swimmers");
        break;
    }
  };

  return {
    step,
    TrainingSessionConfig,
    sessionState,
    setTrainingSessionConfig,
    handleConfigComplete,
    handleSwimmersComplete,
    handleBack,
  };
};
