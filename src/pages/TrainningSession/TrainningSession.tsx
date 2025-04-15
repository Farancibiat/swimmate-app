// components/TrainningSession.tsx
import { useTimmer } from '@/hooks/useTimmer';
import Button  from '@/components/ui/Button/index';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { formatTime } from '@/utils/format';
import TimmerTable from '@/components/TimmerTable';


export const TrainningSession=()=> {
  const { 
    nadadores, 
    isRunning, 
    iniciarCronometro, 
    agregarVuelta,
    detenerCronometro, 
    actualizarTiempo 
  } = useTimmer([
    { id: '1', nombre: 'Ada La gimnasta Soto', laps: [] },
    { id: '2', nombre: 'Felipe Arancibia', laps: [] },
  ]);

  const [tiempoActual, setTiempoActual] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    return actualizarTiempo(setTiempoActual);
  }, [isRunning, actualizarTiempo, detenerCronometro]);



  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-4xl font-mono">
            {formatTime(tiempoActual)}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button 
            onClick={iniciarCronometro} 
            disabled={isRunning}
            className="w-32"
          >
            {isRunning ? 'En progreso...' :tiempoActual==0? 'Iniciar':'Continuar'}
          </Button>
          <Button 
            onClick={ detenerCronometro } 
            variant='destructive'
            disabled={!isRunning}
            className="w-32 mx-2"
          >
            {'Pausar'}
          </Button>
          <Button 
            onClick={ detenerCronometro } 
            variant='default'
            disabled={isRunning}
            className="w-32 mx-2"
          >
            <Save className="w-auto text-blue-500" /> Grabar
          </Button>
          <Button 
            onClick={ detenerCronometro } 
            variant='destructive'
            disabled={isRunning}
            className="w-32 mx-2"
          >
            <RotateCcw className="w-auto text-blue-500" /> Descartar
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <TimmerTable
        swimmers={nadadores}
        onLapRecorded={agregarVuelta}
        />
        {/* {nadadores.map((nadador) => (
          <Card key={nadador.id}>
            <CardHeader>
              <CardTitle>{nadador.nombre}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                onClick={() => agregarVuelta(nadador.id)}
                className="w-full"
              >
                Registrar Vuelta
              </Button>
              <div className="mt-2 space-y-1">
                <p className="text-sm font-medium">Vueltas: {nadador.laps.length}</p>
                {nadador.laps.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    Última: {formatTime(nadador.laps.slice(-1)[0])}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))} */}
      </div>
    </div>
  );
}