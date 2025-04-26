import React, { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import { useSwimmers } from '../hooks/useSwimmers';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, ChevronsUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { AquaticDiscipline, SwimmingStyle, SwimmingStyleLabels } from '@/constants/swimming';
import { Swimmer } from '@/types';

// interface SwimmersViewProps {
//   config: SessionConfig;
//   onBack: () => void;
//   onComplete: (state: SessionState) => void;
// }

const SwimmersView = () => {
  const { selectedSwimmers, availableSwimmers, TrainingSessionConfig, handleSwimmerToggle, handleSubmit, handleBack } =
    useSwimmers();

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Pick<Swimmer, 'firstName' | 'lastName' | 'lastName2' | 'category'>;
    direction: 'asc' | 'desc';
  }>({ key: 'firstName', direction: 'asc' });

  const sortedSwimmers = useMemo(() => {
    if (!availableSwimmers.length) return availableSwimmers;

    return [...availableSwimmers].sort((a, b) => {
      let valueA: string | undefined;
      let valueB: string | undefined;

      switch (sortConfig.key) {
        case 'firstName':
          valueA = a.firstName;
          valueB = b.firstName;
          break;
        case 'lastName':
          valueA = a.lastName;
          valueB = b.lastName;
          break;
        case 'lastName2':
          valueA = a.lastName2 || '';
          valueB = b.lastName2 || '';
          break;
        case 'category':
          valueA = a.category;
          valueB = b.category;
          break;
        default:
          valueA = a.firstName;
          valueB = b.firstName;
      }

      // Handle potential undefined values
      if (valueA == null) return sortConfig.direction === 'asc' ? 1 : -1;
      if (valueB == null) return sortConfig.direction === 'asc' ? -1 : 1;

      // Compare values
      const comparison = valueA.localeCompare(valueB);

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [availableSwimmers, sortConfig]);

  const handleSort = (key: keyof Pick<Swimmer, 'firstName' | 'lastName' | 'lastName2' | 'category'>) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const renderSortIcon = (key: keyof Pick<Swimmer, 'firstName' | 'lastName' | 'lastName2' | 'category'>) => {
    if (sortConfig.key !== key) return <ChevronsUpDown className="inline-block ml-1 h-4 w-4 opacity-50" />;
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="inline-block ml-1 h-4 w-4" />
    ) : (
      <ArrowDown className="inline-block ml-1 h-4 w-4" />
    );
  };

  return (
    <div className="container max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Seleccionar Nadadores</h2>
        <Button variant="outline" onClick={handleBack}>
          Volver
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Configuration Card */}
        <Card className="border">
          <CardHeader className="pb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TrainingSessionConfig?.discipline === AquaticDiscipline.POOL_SWIMMING && (
                <>
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-medium text-muted-foreground tracking-wider">Piscina</h4>
                    <p className="text-sm font-medium">
                      {TrainingSessionConfig?.poolLength}
                      {TrainingSessionConfig?.poolUnit}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-medium text-muted-foreground tracking-wider">Vueltas</h4>
                    <p className="text-sm font-medium">{TrainingSessionConfig?.lapsCount}</p>
                  </div>
                </>
              )}

              {TrainingSessionConfig?.discipline === AquaticDiscipline.OPEN_WATER && (
                <>
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-medium text-muted-foreground tracking-wider">Distancia Total</h4>
                    <p className="text-sm font-medium">{TrainingSessionConfig?.totalDistance} km</p>
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-medium text-muted-foreground tracking-wider">Vueltas</h4>
                    <p className="text-sm font-medium">{TrainingSessionConfig?.lapsCount}</p>
                  </div>
                  {(TrainingSessionConfig?.lapsCount || 0) > 1 && (
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-medium text-muted-foreground tracking-wider">Largo de Vuelta</h4>
                      <p className="text-sm font-medium">{TrainingSessionConfig?.lapLength} km</p>
                    </div>
                  )}
                </>
              )}

              <div className="space-y-1.5">
                <h4 className="text-xs font-medium text-muted-foreground tracking-wider">Tipo</h4>
                <p className="text-sm font-medium">
                  {TrainingSessionConfig?.sessionType === 'training' ? 'Entrenamiento' : 'Evaluación'}
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-medium text-muted-foreground tracking-wider">Estilo</h4>
                <p className="text-sm font-medium">
                  {SwimmingStyleLabels[TrainingSessionConfig?.style as SwimmingStyle]}
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-medium text-muted-foreground tracking-wider">Disciplina</h4>
                <p className="text-sm font-medium">
                  {TrainingSessionConfig?.discipline === AquaticDiscipline.POOL_SWIMMING
                    ? 'Natación en Piscina'
                    : 'Aguas Abiertas'}
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Swimmers Table */}
        <form onSubmit={handleSubmit}>
          <Card className="border-none p-0">
            <ScrollArea className="h-[400px] p-0">
              <Table>
                <TableHeader className="sticky top-0 bg-card z-10">
                  <TableRow>
                    <TableHead className="w-12 text-center">Foto</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('firstName')}>
                      Primer Nombre{renderSortIcon('firstName')}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('lastName')}>
                      Primer Apellido{renderSortIcon('lastName')}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('lastName2')}>
                      Segundo Apellido{renderSortIcon('lastName2')}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>
                      Categoría{renderSortIcon('category')}
                    </TableHead>
                    <TableHead>Edad</TableHead>
                    <TableHead>Especialidades</TableHead>
                    <TableHead className="w-12 text-center">Selección</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedSwimmers.map((swimmer) => {
                    const isSelected = selectedSwimmers.some((s) => s.id === swimmer.id);
                    return (
                      <TableRow
                        key={swimmer.id}
                        className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                          isSelected ? 'bg-primary/10' : ''
                        }`}
                        onClick={() => handleSwimmerToggle(swimmer)}
                      >
                        <TableCell className="w-12 text-center">
                          <div className="size-10 rounded-full bg-muted overflow-hidden mx-auto">
                            <img
                              src={swimmer.profileImage}
                              alt={`${swimmer.firstName} ${swimmer.lastName}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{swimmer.firstName}</TableCell>
                        <TableCell>{swimmer.lastName}</TableCell>
                        <TableCell>{swimmer.lastName2 || 'N/A'}</TableCell>
                        <TableCell>{swimmer.category || 'N/A'}</TableCell>
                        <TableCell>{swimmer.age || 'N/A'}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {swimmer.specialties?.join(', ') || 'N/A'}
                        </TableCell>
                        <TableCell className="w-12 text-center">
                          {isSelected ? (
                            <div className="size-6 rounded-full bg-primary flex items-center justify-center mx-auto">
                              <Check className="size-4 text-primary-foreground" />
                            </div>
                          ) : (
                            <div className="size-6 rounded-full border-2 border-gray-300 mx-auto"></div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </Card>

          <div className="mt-6 flex justify-end">
            <Button type="submit" size="lg">
              Comenzar Sesión ({selectedSwimmers.length} nadadores)
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SwimmersView;
