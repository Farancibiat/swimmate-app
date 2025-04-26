
import { useTimmer } from '@/pages/TrainingSession/hooks/useTimmer';
import { useEffect, useState } from 'react';
import { formatTime } from '@/utils/format';
import TimmerTable from '@/components/TimmerTable';
import {
  Play,
  Pause,
  Save,
  Trash2,
  Loader2,
  Flag
} from "lucide-react";
import Button from '@/components/ui/Button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


export const TimerView = () => {
  const {
    nadadores,
    isRunning,
    isEnded,
    terminarSession,
    iniciarCronometro,
    agregarVuelta,
    detenerCronometro,
    actualizarTiempo
  } = useTimmer([
    { id: "1", name: "Alex", laps: [], total: 0, avg: 0 },
    { id: "2", name: "Alicia", laps: [], total: 0, avg: 0 },
    { id: "3", name: "Geo", laps: [], total: 0, avg: 0 },
    { id: "4", name: "Matías", laps: [], total: 0, avg: 0 },
    { id: "5", name: "Pehuén", laps: [], total: 0, avg: 0 },
    { id: "6", name: "Gregorio Paltrinieri", laps: [], total: 0, avg: 0 },
    { id: "7", name: "Sun Yang", laps: [], total: 0, avg: 0 },
    { id: "8", name: "Mack Horton", laps: [], total: 0, avg: 0 }
  ]);

  const [tiempoActual, setTiempoActual] = useState(0);
  const [showConfirmacion, setShowConfirmacion] = useState(false);
  useEffect(() => {
    if (!isRunning) return;
    return actualizarTiempo(setTiempoActual);
  }, [isRunning, actualizarTiempo, detenerCronometro]);



  const handleDescartar = (): void => {
    setShowConfirmacion(true)
    console.log("testing ")
  }

  const handleGrabar = ():void => {
    console.log("testing ")
  }

  const handleTerminar=()=>{
    terminarSession();
    console.log('termina vuelta');

  }

  const handleGreenButton=()=>{
    if(isEnded) handleGrabar();
    else handleTerminar();
  }


  const resetearTodosLosDatos = () => {
    
    console.log('testing')
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
                variant={tiempoActual === 0 ? "default" : "secondary"}
              >
                {isRunning ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
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
               {isEnded && !isRunning?
               <>
                <Save className="mr-2 h-4 w-4" />
                Grabar
               </> :<>
                <Flag className="mr-2 h-4 w-4" />
                Terminar
               </>
               }
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
          <TimmerTable
            swimmers={nadadores}
            onLapRecorded={agregarVuelta}
          />
        </div>
      </div>
      <AlertDialog open={showConfirmacion} onOpenChange={setShowConfirmacion}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Confirmar descarte?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará todos los tiempos registrados y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                resetearTodosLosDatos();
                setShowConfirmacion(false);
              }}
              className="bg-accent  hover:bg-red-700"
            >
              Confirmar Descarte
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* {showFeedback && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          Tiempos guardados correctamente!
        </div>
      )} */}
    </>
  );
}