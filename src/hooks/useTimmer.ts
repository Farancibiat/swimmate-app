
import { useState, useCallback, useRef } from 'react';

export const useTimmer=(nadadoresIniciales: { id: string; nombre: string, laps:number[] }[])=> {
  const [nadadores, setNadadores] = useState(
    nadadoresIniciales.map(n => ({ ...n, laps: [...n.laps] as number[] }))
  );
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number>(0);

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
    
    setNadadores(prev => prev.map(n => 
      n.id === nadadorId 
        ? { ...n, laps: [...n.laps, tiempoVuelta] } 
        : n
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
    iniciarCronometro,
    agregarVuelta,
    detenerCronometro,
    actualizarTiempo
  };
}