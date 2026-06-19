import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { EdgieAssistant } from './components/EdgieAssistant';
import { ComingSoon } from './components/ComingSoon';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { RoadmapGantt } from './components/RoadmapGantt';
import { Login } from './components/Login';

interface LoginUser {
  name: string;
  email: string;
  provider: 'google' | 'discord' | 'email';
}

export default function App() {
  const [view, setView] = useState<'landing' | 'roadmap' | 'login'>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<LoginUser | null>(null);

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleLoginSuccess = (userData: LoginUser) => {
    setUser(userData);
    setIsLoggedIn(true);
    setView('landing');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  if (view === 'roadmap') {
    return <RoadmapGantt onBack={() => setView('landing')} />;
  }

  if (view === 'login') {
    return (
      <Login 
        onBack={() => setView('landing')} 
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar 
        onViewLanding={() => setView('landing')}
        onViewRoadmap={() => setView('roadmap')} 
        onViewLogin={() => setView('login')}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1 flex flex-col">
        <Hero onViewLogin={() => setView('login')} />
        <Features />
        <EdgieAssistant />
        <ComingSoon onViewRoadmap={() => setView('roadmap')} />
        <Pricing onViewLogin={() => setView('login')} />
      </main>
      <Footer />
    </div>
  );
}

