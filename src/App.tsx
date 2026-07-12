import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { EdgieAssistant } from './components/EdgieAssistant';
import { Backtester } from './components/Backtester';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';

interface LoginUser {
  name: string;
  email: string;
  provider: 'google' | 'discord' | 'email';
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<LoginUser | null>(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const openWaitlist = () => setWaitlistOpen(true);
  const closeWaitlist = () => setWaitlistOpen(false);

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <WaitlistModal isOpen={waitlistOpen} onClose={closeWaitlist} />
      <Navbar
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
      </main>
      <Footer />
    </div>
  );
}
