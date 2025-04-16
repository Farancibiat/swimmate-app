

  import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button  from '@/components/ui/Button';

export const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Hero Section with Swimmer Background */}
      <div className="relative bg-primary text-white overflow-hidden">
        {/* Navigation */}
        <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="font-bold text-2xl">LOGO</div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
          <a href="/dashboard" className="hover:text-accent font-medium">Dashboard</a>
            <a href="#features" className="hover:text-accent font-medium">Features</a>
            <a href="#pricing" className="hover:text-accent font-medium">Pricing</a>
            <a href="/login" className="hover:text-accent font-medium">Login</a>
            <a href="/register" className="hover:text-accent font-medium">Register</a>

          </div>
        </nav>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary absolute top-20 left-0 right-0 z-50 shadow-lg">
            <div className="flex flex-col items-center py-4">
              <a href="#features" className="py-2 hover:text-accent">Features</a>
              <a href="#pricing" className="py-2 hover:text-accent">Pricing</a>
              <a href="#" className="hover:text-accent font-medium">Login</a>
              <a href="#register" className="py-2 hover:text-accent">Register</a>
            </div>
          </div>
        )}
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="md:w-1/2">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Training Tracking for Coaches and Swimmers
            </h1>
            <div className="mt-8">
                <Button
                to='/register'
                size='lg'
                variant="destructive">
                  Register
                </Button>
                
            </div>
          </div>
        </div>
        
        {/* Background Image (In a real app, you'd use an actual image) */}
        {/* <div className="absolute inset-0 bg-primary opacity-80"></div> */}
        <div className="absolute right-0 top-1/3 md:top-1/4 w-full md:w-1/2 opacity-80">
          {/* This would be your swimmer image */}
          <div className="w-full h-64 md:h-96"></div>
        </div>
      </div>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-bold mb-6 text-primary">Track Progress</h3>
              <div className="mb-6 w-48">
                <div className="border-2 border-black rounded-3xl overflow-hidden inline-block">
                  <div className="bg-secondary p-4 rounded-t-lg">
                    <div className="bg-white mt-4 rounded-lg p-4">
                      <div className="h-1 bg-secondary rounded-full mb-2 w-3/4"></div>
                      <div className="h-1 bg-secondary rounded-full mb-2"></div>
                      <div className="h-1 bg-secondary rounded-full mb-2 w-1/2"></div>
                      <div className="h-1 bg-muted rounded-full mb-2"></div>
                      <div className="h-1 bg-secondary rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-2 flex justify-between">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <div className="w-16 h-2 bg-secondary rounded-full"></div>
                    <div className="w-2 h-2 bg-muted rounded-full"></div>
                  </div>
                </div>
              </div>
              <p className="text-background-foreground">
                Provides your training's progress data.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-bold mb-6 text-primary">Manage Schedules</h3>
              <div className="mb-6 w-48">
                <div className="border-2 border-black rounded-3xl overflow-hidden inline-block">
                  <div className="bg-secondary p-4 rounded-t-lg">
                    <div className="bg-white mt-4 rounded-lg p-4">
                      <div className="grid grid-cols-7 gap-1 text-xs">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                      </div>
                      <div className="grid grid-cols-7 gap-1 mt-2 text-xs">
                        {[...Array(31)].map((_, i) => (
                          <div key={i} className={i === 10 ? "bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center" : ""}>
                            {i < 28 ? i + 1 : ""}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-2 flex justify-between">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <div className="w-2 h-2 bg-muted rounded-full"></div>
                    <div className="w-2 h-2 bg-muted rounded-full"></div>
                  </div>
                </div>
              </div>
              <p className="text-background-foreground">
                Provides promotion about tracking output.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-bold mb-6 text-primary">Plan Workouts</h3>
              <div className="mb-6 w-48">
                <div className="border-2 border-black rounded-3xl overflow-hidden inline-block">
                  <div className="bg-secondary p-4 rounded-t-lg">
                    <div className="bg-white mt-4 rounded-lg p-4">
                      <div className="mb-4 text-sm font-bold">Calendar</div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xs">Filter</div>
                        <div className="text-xs">▼</div>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xs">Count</div>
                        <div className="text-xs">▼</div>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xs">Sort</div>
                        <div className="text-xs">▼</div>
                      </div>
                      <div className="h-1 bg-muted rounded-full mb-2"></div>
                      <div className="h-1 bg-secondary rounded-full mb-2"></div>
                      <div className="h-1 bg-muted rounded-full mb-2"></div>
                      <div className="h-1 bg-secondary rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-2 flex justify-between">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <div className="w-2 h-2 bg-muted rounded-full"></div>
                    <div className="w-2 h-2 bg-muted rounded-full"></div>
                  </div>
                </div>
              </div>
              <p className="text-background-foreground">
                Feature one<br />
                Feature two<br />
                Feature three
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-primary border border-white bg-opacity-40 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Free</h3>
              <div className="text-4xl font-bold mb-2">$20<span className="text-xl font-normal">/month</span></div>
              <ul className="mt-6 space-y-3 text-left">
                <li className="flex items-start">
                  <span className="mr-2 text-xl">•</span>
                  <span>Feature one</span>
                </li>
                {/* Add more features as needed */}
              </ul>
            </div>
            
            {/* Pro Plan - Highlighted */}
            <div className="bg-accent text-white rounded-lg p-8 text-center transform scale-105 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <div className="text-4xl font-bold mb-2">$40<span className="text-xl font-normal">/month</span></div>
              <ul className="mt-6 space-y-3 text-left">
                <li className="flex items-start">
                  <span className="mr-2 text-xl">•</span>
                  <span>Feature one</span>
                </li>
                {/* Add more features as needed */}
              </ul>
            </div>
            
            {/* Elite Plan */}
            <div className="bg-primary border border-white bg-opacity-40 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Elite</h3>
              <div className="text-4xl font-bold mb-2">$80<span className="text-xl font-normal">/month</span></div>
              <ul className="mt-6 space-y-3 text-left">
                <li className="flex items-start">
                  <span className="mr-2 text-xl">•</span>
                  <span>Feature one</span>
                </li>
                {/* Add more features as needed */}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-primary-foreground text-primary py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Training Tracking App. All rights reserved. By <a href="https://www.farancibiat.cl" target='_blank' className="hover:text-accent font-medium">Farancibiat</a> </p> 
        </div>
      </footer>
    </div>
  );
};
