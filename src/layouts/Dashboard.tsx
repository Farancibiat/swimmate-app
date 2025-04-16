import { DashboardRoutes } from '@/routes/DashboardRoutes';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  BarChart2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Button from "@/components/ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

// Componente MenuItem
const MenuItem = ({
  to,
  label,
  icon: Icon,
  collapsed
}: {
  to: string;
  label: string;
  icon: React.ElementType;
  collapsed: boolean;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  // const baseClasses = `flex items-center gap-3 px-4 py-2 my-1 rounded transition-colors text-sm`;
  const activeClasses = `bg-secondary text-secondary-foreground`;
  const inactiveClasses = `text-background-foreground hover:bg-muted`;

  const itemClasses = `flex ${collapsed ? 'justify-center' : 'items-center gap-3'} px-4 py-2 my-1 rounded transition-colors text-sm ${isActive ? activeClasses : inactiveClasses
    }`;

  const iconClasses = `w-5 h-5 shrink-0 ${isActive ? 'text-secondary-foreground' : 'text-background-foreground'}`;

  const content = (
    <Link to={to} className={itemClasses}>
      <div className="flex items-center justify-center w-6">
        <Icon className={iconClasses} />
      </div>
      <span
        className={`transition-all duration-300 whitespace-nowrap overflow-hidden
      ${collapsed ? 'max-w-0 opacity-0' : 'max-w-[200px] ml-2 opacity-100'}
    `}
      >
        {label}
      </span>
    </Link>
  );

  return collapsed ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    content
  );
};

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`relative bg-primary text-primary-foreground p-4 transition-all duration-300 ease-in-out
          ${collapsed ? 'w-16' : 'w-64'}
        `}
      >
        {/* Botón de colapsar */}
        <div className="absolute top-4 right-[-14px] z-10">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-full shadow-md"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        {/* Título */}
        <div className={`mb-6 transition-opacity duration-300 ${collapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <h2 className="text-xl font-bold">Swim Coach</h2>
        </div>

        {/* Menú */}
        <nav>
          <MenuItem to="/dashboard" label="Dashboard" icon={LayoutDashboard} collapsed={collapsed} />
          <MenuItem to="/dashboard/nadadores" label="Nadadores" icon={Users} collapsed={collapsed} />
          <MenuItem to="/dashboard/session" label="Entrenamiento" icon={Dumbbell} collapsed={collapsed} />
          <MenuItem to="/dashboard/analytics" label="Análisis" icon={BarChart2} collapsed={collapsed} />
          <MenuItem to="/dashboard/settings" label="Configuración" icon={Settings} collapsed={collapsed} />
        </nav>

        {/* Cerrar sesión */}
        <div className="mt-auto pt-6">
          <Link
            to="/"
            className={`flex items-center gap-3 text-sm hover:underline transition-opacity duration-300 ${collapsed ? 'justify-center' : ''
              }`}
          >
            <LogOut className={`w-5 h-5 ${collapsed ? 'text-primary-foreground' : 'text-background-foreground'}`} />
            {!collapsed && <span>Cerrar Sesión</span>}
          </Link>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 transition-all duration-300">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <DashboardRoutes />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
