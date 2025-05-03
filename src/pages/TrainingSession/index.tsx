import ConfigView from './views/TSettingsView';
import SwimmersView from './views/SwimmersView';
import { TimerView } from './views/TimerView';
import { useTrainingSession } from './hooks/useTrainingSession';

export const TrainingSession = () => {
  const { step } = useTrainingSession();

  const stepComponents = {
    config: <ConfigView />,
    swimmers: <SwimmersView />,
    timer: <TimerView />,
  };

  return (
    <div className="container mx-auto px-4 ">
      <div className="mt-6">{stepComponents[step]}</div>
    </div>
  );
};
