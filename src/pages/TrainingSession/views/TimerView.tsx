import { useTimer } from '@/pages/TrainingSession/hooks/useTimer';
import { useEffect, useState } from 'react';
import { formatTime } from '@/utils/format';
import TimerTable from '@/components/TimerTable';
import { Play, Pause, Save, Trash2, Loader2, Flag } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useSwimStore } from '@/store/useSwimStore';
import { TrainingSessionStep } from '@/pages/TrainingSession/hooks/useTrainingSession';

export const TimerView = () => {
  const {
    nadadores,
    isRunning,
    isEnded,
    terminarSession,
    iniciarCronometro,
    agregarVuelta,
    detenerCronometro,
    actualizarTiempo,
    sessionState,
  } = useTimer();

  // Acceder al store global para poder resetear y navegar
  const { setSessionState, setStep } = useSwimStore();

  const [tiempoActual, setTiempoActual] = useState(0);
  const [showConfirmacion, setShowConfirmacion] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    return actualizarTiempo(setTiempoActual);
  }, [isRunning, actualizarTiempo]);

  const handleDescartar = (): void => {
    setShowConfirmacion(true);
  };

  const handleGrabar = (): void => {
    // Lógica para guardar los datos
  };

  const handleTerminar = () => {
    terminarSession();
  };

  const handleGreenButton = () => {
    if (isEnded) handleGrabar();
    else handleTerminar();
  };

  const resetearTodosLosDatos = () => {
    if (isRunning) {
      detenerCronometro();
    }
    setTiempoActual(0);
    setSessionState(null);
    setStep(TrainingSessionStep.CONFIG);
  };

  return (
    <>
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-4xl font-mono bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {formatTime(tiempoActual)}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center gap-2">
            {/* Grupo Principal */}
            <div className="flex items-center space-x-2">
              {/* Botón Inicio/Continuar */}
              <Button
                onClick={iniciarCronometro}
                disabled={isRunning}
                className="w-32 h-12 shadow-md"
                variant={tiempoActual === 0 ? 'default' : 'secondary'}
              >
                {isRunning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                {isRunning ? 'En progreso' : tiempoActual === 0 ? 'Iniciar' : 'Continuar'}
              </Button>

              {/* Botón Pausar */}
              <Button
                onClick={detenerCronometro}
                variant="destructive"
                disabled={!isRunning}
                className="w-32 h-12 shadow-md"
              >
                <Pause className="mr-2 h-4 w-4" />
                Pausar
              </Button>
            </div>

            {/* Grupo Secundario */}
            <div className="flex items-center space-x-2">
              {/* Botón Grabar */}
              <Button
                onClick={handleGreenButton}
                variant="outline"
                disabled={tiempoActual === 0}
                className="w-32 h-12 border-green-500 text-green-600 hover:bg-green-50"
              >
                {isEnded && !isRunning ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Grabar
                  </>
                ) : (
                  <>
                    <Flag className="mr-2 h-4 w-4" />
                    Terminar
                  </>
                )}
              </Button>

              {/* Botón Descartar */}
              <Button
                onClick={handleDescartar}
                variant="outline"
                disabled={isRunning || tiempoActual === 0}
                className="w-32 h-12 border-red-500 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Descartar
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1">
          <TimerTable
            swimmers={nadadores}
            onLapRecorded={agregarVuelta}
            currentTime={tiempoActual}
            sessionState={sessionState}
          />
        </div>
      </div>

      <AlertDialog open={showConfirmacion} onOpenChange={setShowConfirmacion}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Confirmar descarte?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará todos los tiempos registrados y te devolverá al inicio del entrenamiento. Esta
              acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                resetearTodosLosDatos();
                setShowConfirmacion(false);
              }}
              className="bg-red-500 hover:bg-red-700 text-white"
            >
              Confirmar Descarte
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
