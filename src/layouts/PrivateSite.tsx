import { PrivateSiteRoutes } from '@/routes/PrivateSiteRoutes';
import { useState } from 'react';
import { Sidebar } from './components/Sidebar';

const PrivateSite = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        collapsed={collapsed} 
        onToggleCollapse={() => setCollapsed(!collapsed)} 
      />

      {/* Contenido principal */}
      <main className="flex-1 p-6 transition-all duration-300">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <PrivateSiteRoutes />
        </div>
      </main>
    </div>
  );
};

export default PrivateSite;
