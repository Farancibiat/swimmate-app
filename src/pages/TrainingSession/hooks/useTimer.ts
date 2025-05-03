import { useState, useCallback, useRef, useEffect } from 'react';
import { useSwimStore } from '@/store/useSwimStore';
import { AquaticDiscipline } from '@/constants/swimming';
import { SwimmerTraining } from '@/pages/TrainingSession/types';

// Almacenamiento global para preservar los datos finales
const ultimaSesionCompletada = {
  swimmers: [] as SwimmerTraining[],
  timestamp: 0,
};

export const useTimer = () => {
  // Usar el store global directamente
  const { sessionState, setSessionState } = useSwimStore();

  const [isRunning, setIsRunning] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number>(0);

  // Swimmers del sessionState
  const nadadores = sessionState?.swimmers || [];

  // Si ya existe un estado de sesión, sincronizamos nuestro estado local con él
  useEffect(() => {
    if (sessionState) {
      setIsRunning(sessionState.isRunning);
      setIsEnded(sessionState.isEnded);
    }
  }, [sessionState]);

  const actualizarTiempo = useCallback((callback: (tiempo: number) => void) => {
    if (!startTimeRef.current) return;

    const update = () => {
      const tiempoActual = performance.now() - startTimeRef.current!;
      callback(tiempoActual);
      animationFrameRef.current = requestAnimationFrame(update);
    };

    animationFrameRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameRef.current!);
  }, []);

  const iniciarCronometro = () => {
    if (isRunning) return;

    // Si ya tenemos un tiempo acumulado en sessionState, debemos ajustar el startTimeRef
    // para que continúe desde donde estaba al pausar
    if (sessionState?.startTime && sessionState?.pausedAtTime) {
      // Calculamos la diferencia entre el tiempo inicial y cuando se pausó
      const elapsedBeforePause = sessionState.pausedAtTime;
      // Ajustamos el tiempo inicial para continuar desde donde quedó
      startTimeRef.current = performance.now() - elapsedBeforePause;
    } else {
      // Si es primera vez que inicia, simplemente establecemos el tiempo inicial
      startTimeRef.current = performance.now();
    }

    setIsRunning(true);

    // Actualizar estado en el store
    if (sessionState) {
      setSessionState({
        ...sessionState,
        isRunning: true,
        startTime: startTimeRef.current,
        // Eliminamos pausedAtTime ya que estamos corriendo de nuevo
        pausedAtTime: undefined,
      });
    }
  };

  const detenerCronometro = () => {
    setIsRunning(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Almacenamos el tiempo transcurrido hasta el momento de pausar
    const elapsedTime = startTimeRef.current ? performance.now() - startTimeRef.current : 0;

    // Actualizar estado en el store
    if (sessionState) {
      setSessionState({
        ...sessionState,
        isRunning: false,
        pausedAtTime: elapsedTime,
      });
    }
  };

  const terminarSession = () => {
    detenerCronometro();
    setIsEnded(true);

    // // Calcular el tiempo final
    // const tiempoFinal = startTimeRef.current ? performance.now() - startTimeRef.current : 0;

    // Guardar una copia del estado final de los nadadores
    if (sessionState && sessionState.swimmers && sessionState.swimmers.length > 0) {
      // Crear copias profundas para evitar problemas de referencia
      const copiaNadadores = sessionState.swimmers.map((swimmer) => ({
        ...swimmer,
        laps: [...swimmer.laps],
        tiemposAcumulados: [...(swimmer.tiemposAcumulados || [])],
      }));

      // Almacenar en nuestro singleton global
      ultimaSesionCompletada.swimmers = copiaNadadores;
      ultimaSesionCompletada.timestamp = Date.now();

      // Actualizar estado en el store - usar siempre la copia guardada
      setSessionState({
        ...sessionState,
        swimmers: copiaNadadores,
        isRunning: false,
        isEnded: true,
      });
    }
  };

  const agregarVuelta = (nadadorId: string) => {
    // No permitir agregar vueltas si la sesión ha terminado
    if (!isRunning || !startTimeRef.current || isEnded) return;

    const tiempoActual = performance.now() - startTimeRef.current;

    if (sessionState) {
      // Primero, verificar si este es el último nadador que necesita registrar su última vuelta
      const totalLapsConfigured = sessionState.sessionConfig?.lapsCount || 0;

      // Obtener todos los nadadores excepto el actual
      const otrosNadadores = sessionState.swimmers.filter((n) => n.id !== nadadorId);

      // Verificar si todos los demás nadadores ya completaron sus vueltas
      const todosLosDemasCompletaron = otrosNadadores.every((n) => n.laps.length >= totalLapsConfigured);

      // Obtener el nadador actual
      const nadadorActual = sessionState.swimmers.find((n) => n.id === nadadorId);

      // Verificar si este es el último nadador y está por registrar su última vuelta
      const esUltimaVueltaDelUltimoNadador =
        todosLosDemasCompletaron && nadadorActual && nadadorActual.laps.length === totalLapsConfigured - 1;

      // Actualizar los nadadores con la nueva vuelta
      const swimmersActualizados = sessionState.swimmers.map((n) => {
        if (n.id === nadadorId) {
          // Calculamos el tiempo de la vuelta actual
          const vueltas = [...n.laps];

          // Si ya se completaron todas las vueltas según configuración, no hacemos nada
          if (vueltas.length >= totalLapsConfigured) {
            return n;
          }

          // Inicializamos los tiempos acumulados si no existen
          const tiemposAcumulados = n.tiemposAcumulados || [];

          // Calculamos el tiempo de la vuelta (no acumulado)
          let tiempoVuelta;
          if (vueltas.length === 0) {
            // Primera vuelta: el tiempo desde el inicio
            tiempoVuelta = tiempoActual;
          } else {
            // Vueltas subsiguientes: tiempo desde la vuelta anterior
            const tiempoAnteriorAcumulado = tiemposAcumulados[tiemposAcumulados.length - 1];
            tiempoVuelta = tiempoActual - tiempoAnteriorAcumulado;
          }

          // Guardamos tanto el tiempo de la vuelta como el tiempo acumulado
          const nuevasVueltas = [...vueltas, tiempoVuelta];
          const nuevosTiemposAcumulados = [...tiemposAcumulados, tiempoActual];

          // El total es el tiempo acumulado total (última vuelta)
          const total = tiempoActual;

          // El ritmo promedio (pace) se calcula según la configuración
          let pace = 0;
          if (sessionState.sessionConfig?.discipline === AquaticDiscipline.POOL_SWIMMING) {
            // Para piscina: tiempo promedio por longitud de piscina
            const poolLength = sessionState.sessionConfig?.poolLength || 25; // metros por defecto
            const distanciaTotal = poolLength * nuevasVueltas.length;
            pace = total / (distanciaTotal / 100); // pace por 100 metros/yardas
          } else {
            // Para aguas abiertas: tiempo promedio por vuelta o distancia
            const lapLength = sessionState.sessionConfig?.lapLength || 1; // km por defecto
            const distanciaTotal = lapLength * nuevasVueltas.length;
            pace = total / distanciaTotal; // pace por km
          }

          return {
            ...n,
            laps: nuevasVueltas,
            tiemposAcumulados: nuevosTiemposAcumulados,
            total,
            avg: pace,
          };
        }
        return n;
      });

      // Actualizar estado en el store
      setSessionState({
        ...sessionState,
        swimmers: swimmersActualizados,
      });

      // Si es la última vuelta del último nadador, debemos asegurarnos de guardar
      // una copia del estado final antes de terminar la sesión
      if (esUltimaVueltaDelUltimoNadador) {
        // Crear una copia profunda del estado actualizado
        const estadoFinal = swimmersActualizados.map((swimmer) => ({
          ...swimmer,
          laps: [...swimmer.laps],
          tiemposAcumulados: [...(swimmer.tiemposAcumulados || [])],
        }));

        // Guardar en el almacenamiento global
        ultimaSesionCompletada.swimmers = estadoFinal;
        ultimaSesionCompletada.timestamp = Date.now();
      }

      // Verificar si ahora todos los nadadores han completado sus vueltas
      const allCompleted = swimmersActualizados.every((swimmer) => swimmer.laps.length >= totalLapsConfigured);

      // Si todos completaron y la sesión no está marcada como finalizada, la finalizamos
      if (allCompleted && !isEnded && totalLapsConfigured > 0) {
        terminarSession();
      }
    }
  };

  return {
    nadadores: ultimaSesionCompletada.timestamp > 0 && isEnded ? ultimaSesionCompletada.swimmers : nadadores,
    isRunning,
    isEnded,
    terminarSession,
    iniciarCronometro,
    detenerCronometro,
    agregarVuelta,
    actualizarTiempo,
    sessionState,
  };
};
