import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { EdgieAssistant } from './components/EdgieAssistant';
import { Backtester } from './components/Backtester';
import { ComingSoon } from './components/ComingSoon';
import { Footer } from './components/Footer';
import { RoadmapGantt } from './components/RoadmapGantt';
import { WaitlistModal } from './components/WaitlistModal';

interface LoginUser {
  name: string;
  email: string;
  provider: 'google' | 'discord' | 'email';
}

export default function App() {
  const [view, setView] = useState<'landing' | 'roadmap'>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<LoginUser | null>(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const openWaitlist = () => setWaitlistOpen(true);
  const closeWaitlist = () => setWaitlistOpen(false);

  if (view === 'roadmap') {
    return <RoadmapGantt onBack={() => setView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <WaitlistModal isOpen={waitlistOpen} onClose={closeWaitlist} />
      <Navbar
        onViewLanding={() => setView('landing')}
        onViewRoadmap={() => setView('roadmap')}
        onOpenWaitlist={openWaitlist}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1 flex flex-col">
        <Hero onOpenWaitlist={openWaitlist} />
        <EdgieAssistant onOpenWaitlist={openWaitlist} />
        <Backtester onOpenWaitlist={openWaitlist} />
        <Features />
        <ComingSoon onViewRoadmap={() => setView('roadmap')} />
      </main>
      <Footer />
    </div>
  );
}
