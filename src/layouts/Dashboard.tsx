import { DashboardRoutes } from '@/routes/DashboardRoutes';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



// Elemento de menú
const MenuItem = ({ to, label }: { to: string; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`block px-4 py-2 my-1 rounded transition-colors ${
        isActive 
          ? 'bg-secondary text-secondary-foreground' 
          : 'text-background-foreground hover:bg-muted'
      }`}
    >
      {label}
    </Link>
  );
};

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground p-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Swim Coach</h2>
        </div>
        <nav>
          <MenuItem to="/dashboard" label="Dashboard" />
          <MenuItem to="/dashboard/athletes" label="Atletas" />
          <MenuItem to="/dashboard/session" label="Entrenamiento" />
          <MenuItem to="/dashboard/analytics" label="Análisis" />
          <MenuItem to="/dashboard/settings" label="Configuración" />
        </nav>
        <div className="mt-auto pt-6">
          <Link to="/" className="text-sm hover:underline">Cerrar Sesión</Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <DashboardRoutes />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;