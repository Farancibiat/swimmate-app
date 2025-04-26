import { Link, useLocation } from 'react-router-dom';
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from "@/components/ui/Button";
import { MenuItem } from './MenuItem';
import { menuItems } from '../config/menuItems';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar = ({ collapsed, onToggleCollapse }: SidebarProps) => {
  const location = useLocation();

  return (
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
          onClick={onToggleCollapse}
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
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            to={item.path}
            label={item.label}
            icon={item.icon}
            collapsed={collapsed}
            isActive={location.pathname === item.path}
          />
        ))}
      </nav>

      {/* Cerrar sesión */}
      <div className="mt-auto pt-6">
        <Link
          to="/"
          className={`flex items-center gap-3 text-sm hover:underline transition-opacity duration-300 ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className={`w-5 h-5 ${collapsed ? 'text-primary-foreground' : 'text-background-foreground'}`} />
          {!collapsed && <span>Cerrar Sesión</span>}
        </Link>
      </div>
    </aside>
  );
}; 