import { SwimmerTraining } from '../types';
import { Swimmer } from '@/types';
import { useTrainingSession } from '../hooks/useTrainingSession';
import { useState, useEffect } from 'react';

export const useSwimmers = () => {
  const [selectedSwimmers, setSelectedSwimmers] = useState<SwimmerTraining[]>([]);
  const [availableSwimmers, setAvailableSwimmers] = useState<Swimmer[]>([]);
  const { TrainingSessionConfig, handleSwimmersComplete, handleBack } = useTrainingSession();
  useEffect(() => {
    // Aquí deberías cargar los nadadores disponibles desde tu API
    fetch('http://localhost:3000/users?role=swimmer')
      .then((res) => res.json())
      .then((users: Swimmer[]) => {
        setAvailableSwimmers(users);
      })
      .catch((error) => {
        console.error('Error loading swimmers:', error);
      });
  }, []);

  const handleSwimmerToggle = (swimmer: Swimmer) => {
    const isSelected = selectedSwimmers.some((s) => s.id === swimmer.id);

    if (isSelected) {
      setSelectedSwimmers((prev) => prev.filter((s) => s.id !== swimmer.id));
    } else {
      const newSwimmer: SwimmerTraining = {
        id: swimmer.id,
        role: 'swimmer',
        firstName: swimmer.firstName,
        lastName: swimmer.lastName,
        laps: [],
        total: 0,
        avg: 0,
        createdAt: swimmer.createdAt,
      };
      setSelectedSwimmers((prev) => [...prev, newSwimmer]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSwimmersComplete(selectedSwimmers);
    // if (selectedSwimmers.length === 0) {
    //   alert('Por favor, selecciona al menos un nadador');
    //   return;
    // }

    // const initialState: SessionState = {
    //   swimmers: selectedSwimmers,
    //   isRunning: false,
    //   isEnded: false
    // };

    // onComplete(initialState);
  };

  return {
    selectedSwimmers,
    availableSwimmers,
    TrainingSessionConfig,
    handleSwimmerToggle,
    handleSubmit,
    handleBack,
  };
};
