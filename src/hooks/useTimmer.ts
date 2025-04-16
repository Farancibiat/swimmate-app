
import { useState, useCallback, useRef } from 'react';

export const useTimmer = (nadadoresIniciales: { id: string; name: string, laps: number[], total: number, avg: number }[]) => {
  const [nadadores, setNadadores] = useState(
    nadadoresIniciales.map(n => ({ ...n, laps: [...n.laps] as number[] }))
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number>(0);


  const terminarSession = ()=>{
    detenerCronometro();
    setIsRunning(false);
    setIsEnded(true);
  }

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
    startTimeRef.current = performance.now();
    setIsRunning(true);
  };

  const agregarVuelta = (nadadorId: string) => {
    if (!isRunning || !startTimeRef.current) return;
    const tiempoVuelta = performance.now() - startTimeRef.current;

    setNadadores(prev => prev.map(n => {
      if (n.id === nadadorId) {
        const resta=n.laps.length>0?n.laps[n.laps.length-1]:0;
        return { ...n, laps: [...n.laps, tiempoVuelta-resta] }
      } else return n;
    }
    ));
  };

  const detenerCronometro = () => {
    setIsRunning(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  return {
    nadadores,
    isRunning,
    isEnded,
    terminarSession,
    iniciarCronometro,
    agregarVuelta,
    detenerCronometro,
    actualizarTiempo
  };
}