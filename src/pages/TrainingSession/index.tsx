import ConfigView from './views/ConfigView';
import SwimmersView from './views/SwimmersView';
import { TimerView } from './views/TimerView';
import { useSwimStore } from '@/store/useSwimStore';

export const TrainingSession = () => {
  const { step } = useSwimStore();
  const stepComponents = {
    config: <ConfigView />,
    swimmers: <SwimmersView />,
    timer: <TimerView />,
  };

  return (
    <div className="container mx-auto px-4 ">
      <div className="mt-6">{stepComponents[step] || <div>No se encontró el paso</div>}</div>
    </div>
  );
};
