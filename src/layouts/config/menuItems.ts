import {
  LayoutDashboard,
  Users,
  Dumbbell,
  BarChart2,
  Settings,
} from 'lucide-react';

export interface MenuItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

export const menuItems: MenuItem[] = [
  { path: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/app/nadadores', label: 'Nadadores', icon: Users },
  { path: '/app/session', label: 'Entrenamiento', icon: Dumbbell },
//   { path: '/app/session/create', label: 'Crear Entrenamiento', icon: Dumbbell },
//   { path: '/app/session/swimmers', label: 'Seleccionar Nadadores', icon: Users },
//   { path: '/app/session/cronometer', label: 'Cronómetro', icon: Users },
//   { path: '/app/session/resume', label: 'Resumen', icon: Users },
  { path: '/app/analytics', label: 'Análisis', icon: BarChart2 },
  { path: '/app/settings', label: 'Configuración', icon: Settings },
]; 