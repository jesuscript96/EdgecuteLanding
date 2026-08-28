import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { EdgieAssistant } from './components/EdgieAssistant';
import { Backtester } from './components/Backtester';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <EdgieAssistant />
        <Backtester />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
