import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ComingSoon } from './components/ComingSoon';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { RoadmapGantt } from './components/RoadmapGantt';

export default function App() {
  const [view, setView] = useState<'landing' | 'roadmap'>('landing');

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  if (view === 'roadmap') {
    return <RoadmapGantt onBack={() => setView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar onViewRoadmap={() => setView('roadmap')} />
      <main className="flex-1 flex flex-col">
        <Hero />
        <Features />
        <ComingSoon onViewRoadmap={() => setView('roadmap')} />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

