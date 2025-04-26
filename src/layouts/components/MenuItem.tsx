import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface MenuItemProps {
  to: string;
  label: string;
  icon: React.ElementType;
  collapsed: boolean;
  isActive: boolean;
}

export const MenuItem = ({
  to,
  label,
  icon: Icon,
  collapsed,
  isActive
}: MenuItemProps) => {
  const activeClasses = `bg-secondary text-secondary-foreground`;
  const inactiveClasses = `text-background-foreground hover:bg-muted`;

  const itemClasses = `flex ${collapsed ? 'justify-center' : 'items-center gap-3'} px-4 py-2 my-1 rounded transition-colors text-sm ${isActive ? activeClasses : inactiveClasses}`;

  const iconClasses = `w-5 h-5 shrink-0 ${isActive ? 'text-secondary-foreground' : 'text-background-foreground'}`;

  const content = (
    <Link to={to} className={itemClasses}>
      <div className="flex items-center justify-center w-6">
        <Icon className={iconClasses} />
      </div>
      <span
        className={`transition-all duration-300 whitespace-nowrap overflow-hidden
        ${collapsed ? 'max-w-0 opacity-0' : 'max-w-[200px] ml-2 opacity-100'}`}
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