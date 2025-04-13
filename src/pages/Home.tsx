const Home = () => {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground p-4">
          <h1 className="text-2xl font-bold">App para Entrenadores de Natación</h1>
        </header>
        <main className="container mx-auto p-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Bienvenido a tu asistente de entrenamiento</h2>
            <p className="mb-4">Administra tus sesiones, atletas y resultados en un solo lugar.</p>
            <a
              href="/dashboard" 
              className="inline-block bg-accent text-accent-foreground px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
            >
              Ingresar al Dashboard
            </a>
          </div>
        </main>
      </div>
    );
  };
  
  export default Home;