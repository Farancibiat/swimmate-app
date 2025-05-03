import { SwimmerTraining } from '../types';
import { Swimmer } from '@/types';
import { useTrainingSession } from './useTrainingSession';
import { useState, useEffect, useMemo } from 'react';
import { env } from '@/utils/env';

export const useSwimmers = () => {
  const [selectedSwimmers, setSelectedSwimmers] = useState<SwimmerTraining[]>([]);
  const [availableSwimmers, setAvailableSwimmers] = useState<Swimmer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { TrainingSessionConfig, handleSwimmersSubmit, goBack } = useTrainingSession();

  useEffect(() => {
    // Aquí deberías cargar los nadadores disponibles desde tu API
    setIsLoading(true);

    fetch(`${env.API_URL}/users?role=swimmer`)
      .then((res) => res.json())
      .then((users: Swimmer[]) => {
        setAvailableSwimmers(users);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading swimmers:', error);
        setIsLoading(false);
      });
  }, []);

  // Estado para ordenamiento
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Pick<Swimmer, 'firstName' | 'lastName' | 'lastName2' | 'category'>;
    direction: 'asc' | 'desc';
  }>({ key: 'firstName', direction: 'asc' });

  const handleSwimmerToggle = (swimmer: Swimmer) => {
    console.log('handleSwimmerToggle - nadador seleccionado:', swimmer);

    const isSelected = selectedSwimmers.some((s) => s.id === swimmer.id);

    if (isSelected) {
      setSelectedSwimmers((prev) => prev.filter((s) => s.id !== swimmer.id));
    } else {
      const newSwimmer: SwimmerTraining = {
        id: swimmer.id,
        role: 'swimmer',
        firstName: swimmer.firstName,
        lastName: swimmer.lastName,
        lastName2: swimmer.lastName2,
        category: swimmer.category,
        age: swimmer.age,
        specialties: swimmer.specialties,
        profileImage: swimmer.profileImage,
        laps: [],
        tiemposAcumulados: [],
        total: 0,
        avg: 0,
        createdAt: swimmer.createdAt,
      };

      console.log('handleSwimmerToggle - nuevo nadador creado:', newSwimmer);

      setSelectedSwimmers((prev) => [...prev, newSwimmer]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit - nadadores seleccionados:', selectedSwimmers);

    if (selectedSwimmers.length > 0) {
      handleSwimmersSubmit(selectedSwimmers);
    }
  };

  const handleSort = (key: keyof Pick<Swimmer, 'firstName' | 'lastName' | 'lastName2' | 'category'>) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  // Nadadores ordenados según configuración actual
  const sortedSwimmers = useMemo(() => {
    const sortableSwimmers = [...availableSwimmers];
    sortableSwimmers.sort((a, b) => {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortableSwimmers;
  }, [availableSwimmers, sortConfig]);

  return {
    selectedSwimmers,
    sortedSwimmers,
    sortConfig,
    availableSwimmers,
    TrainingSessionConfig,
    isLoading,
    handleSwimmerToggle,
    handleSubmit,
    handleBack: goBack,
    handleSort,
  };
};
