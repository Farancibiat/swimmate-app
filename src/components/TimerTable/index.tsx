import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Button from '@/components/ui/Button';
import { formatTime } from '@/utils/format';
import { SwimmerTraining, TrainingSessionState } from '@/pages/TrainingSession/types';
import { AquaticDiscipline } from '@/constants/swimming';
import { useEffect, useRef, useState } from 'react';

interface SwimmersTableProps {
  swimmers: SwimmerTraining[];
  onLapRecorded: (swimmerId: string) => void;
  currentTime?: number; // Tiempo actual del cronómetro
  sessionState?: TrainingSessionState | null;
}

// Mantener un registro permanente de los tiempos de vueltas finales
const tiemposFinalesCache = new Map<string, SwimmerTraining[]>();

const TimerTable = ({ swimmers, onLapRecorded, sessionState }: SwimmersTableProps) => {
  const [nadadoresFijados, setNadadoresFijados] = useState<SwimmerTraining[]>([]);

  // ID de sesión para identificar cada sesión de manera única
  const sessionId = useRef<string>(sessionState?.startTime?.toString() || 'default-session');

  // Usar nadadores fijados si existen, de lo contrario usar los nadadores actuales
  const nadadoresMostrados = nadadoresFijados.length > 0 ? nadadoresFijados : swimmers;

  // Cada vez que cambian los nadadores, actualizar nuestra caché local
  useEffect(() => {
    if (!swimmers || swimmers.length === 0) return;

    // Actualizar la caché solo si es útil (tiene al menos una vuelta registrada)
    const tienenVueltas = swimmers.some((s) => s.laps.length > 0);
    if (tienenVueltas) {
      // Crear una copia profunda de los nadadores para evitar problemas de referencia
      const copiaSwimmers = swimmers.map((swimmer) => ({
        ...swimmer,
        laps: [...swimmer.laps],
        tiemposAcumulados: [...(swimmer.tiemposAcumulados || [])],
      }));

      // Guardar en nuestra caché global
      tiemposFinalesCache.set(sessionId.current, copiaSwimmers);

      // Si la sesión ha terminado, fijar los nadadores para que no cambien
      if (sessionState?.isEnded) {
        setNadadoresFijados(copiaSwimmers);
      }
    }
  }, [swimmers, sessionState?.isEnded]);

  // Recuperar datos de la caché si es necesario al montar el componente
  useEffect(() => {
    if (sessionState?.isEnded && nadadoresFijados.length === 0) {
      const cachedData = tiemposFinalesCache.get(sessionId.current);
      if (cachedData && cachedData.length > 0) {
        setNadadoresFijados(cachedData);
      }
    }
  }, [sessionState?.isEnded, nadadoresFijados.length]);

  // Usamos lapsCount de la configuración para definir el número de columnas
  const configuredLaps = sessionState?.sessionConfig?.lapsCount || 0;

  // Encuentra el máximo de vueltas registradas para definir columnas
  const recordedLaps = nadadoresMostrados.length ? Math.max(...nadadoresMostrados.map((s) => s.laps.length), 0) : 0;

  // Usamos el mayor valor entre ambos para asegurar que siempre tengamos suficientes columnas
  const maxLaps = Math.max(configuredLaps, recordedLaps);

  // Determinar la unidad del ritmo promedio (pace) según la configuración
  const isPoolSwimming = sessionState?.sessionConfig?.discipline === AquaticDiscipline.POOL_SWIMMING;
  const paceUnit = isPoolSwimming ? `/ 100${sessionState?.sessionConfig?.poolUnit === 'yd' ? 'yd' : 'm'}` : '/ km';

  // Si no hay nadadores, mostrar un mensaje
  if (!nadadoresMostrados || nadadoresMostrados.length === 0) {
    return (
      <div className="relative w-full h-full max-h-[500px] overflow-auto border rounded-lg shadow-sm p-8 flex items-center justify-center">
        <p className="text-muted-foreground text-center">
          No hay nadadores seleccionados. Por favor, vuelve y selecciona nadadores para la sesión.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full max-h-[500px] overflow-auto border rounded-lg shadow-sm">
      <div className="sticky bottom-0 left-0 right-0 h-4 bg-background z-30"></div>{' '}
      {/* Fuerza la visualización del scroll */}
      <Table className="min-w-full">
        <TableHeader className="sticky top-0 z-10 bg-background">
          <TableRow>
            {/* Primera columna fija */}
            <TableHead className="sticky left-0 z-20 bg-background border-r min-w-[180px]">Nadador</TableHead>

            {/* Columnas de vueltas */}
            {Array.from({ length: maxLaps }).map((_, i) => (
              <TableHead key={`lap-${i}`} className="text-center min-w-[90px]">
                Vuelta {i + 1}
              </TableHead>
            ))}

            {/* Columnas fijas derechas - ahora juntas */}
            <TableHead className="sticky right-0 z-20 bg-background border-l text-center min-w-[200px]">
              <div className="flex">
                <span className="w-1/2 border-r">Ritmo {paceUnit}</span>
                <span className="w-1/2">Total</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {nadadoresMostrados.map((swimmer, i) => (
            <TableRow key={swimmer.id}>
              {/* Primera columna fija */}
              <TableCell className="sticky left-0 z-10 bg-background border-r font-medium min-w-[180px]">
                <Button
                  size="sm"
                  onClick={() => onLapRecorded(swimmer.id)}
                  variant={!(i % 2) ? 'default' : 'secondary'}
                  disabled={sessionState?.isEnded}
                >
                  {swimmer.firstName || 'Sin nombre'} {swimmer.lastName || ''}
                </Button>
              </TableCell>

              {/* Columnas de vueltas - mostrando tiempos individuales de cada vuelta */}
              {Array.from({ length: maxLaps }).map((_, i) => {
                // Si tenemos el tiempo de esta vuelta, lo mostramos
                if (i < swimmer.laps.length) {
                  // Agregar una clase diferente para destacar la última vuelta registrada
                  const isLastRecordedLap = i === swimmer.laps.length - 1;
                  return (
                    <TableCell
                      key={`${swimmer.id}-lap-${i}`}
                      className={`text-center font-mono min-w-[90px] ${isLastRecordedLap ? 'bg-primary-foreground/10' : ''}`}
                    >
                      {formatTime(swimmer.laps[i])}
                    </TableCell>
                  );
                }
                // Si aún no tenemos el tiempo, mostramos un guión
                return (
                  <TableCell key={`${swimmer.id}-lap-${i}`} className="text-center font-mono min-w-[90px]">
                    -
                  </TableCell>
                );
              })}

              {/* Columnas fijas derechas - ahora en un solo contenedor */}
              <TableCell className="sticky right-0 z-10 bg-background border-l font-mono min-w-[200px]">
                <div className="flex">
                  <span className="w-1/2 text-center border-r">{formatTime(swimmer.avg)}</span>
                  <span className="w-1/2 text-center font-bold">
                    {/* Si se completaron todas las vueltas o la sesión terminó, mostramos el total */}
                    {swimmer.laps.length >= configuredLaps || swimmer.total > 0 ? formatTime(swimmer.total) : '-'}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TimerTable;
