import { Terminal } from 'lucide-react';

interface NavbarProps {
  onViewRoadmap: () => void;
}

export function Navbar({ onViewRoadmap }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-dark/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo with slanted 'E' vibe */}
          <div className="w-8 h-8 bg-copper text-white flex items-center justify-center font-mono font-bold leading-none transform -skew-x-12">
            E
          </div>
          <span className="font-mono font-bold text-xl tracking-tighter text-white">
            EDGECUTE
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium font-mono text-gray-400">
          <a href="#features" className="hover:text-copper transition-colors">/features</a>
          <a 
            href="#roadmap" 
            onClick={(e) => {
              e.preventDefault();
              onViewRoadmap();
            }}
            className="hover:text-copper transition-colors cursor-pointer"
          >
            /roadmap
          </a>
          <a href="#pricing" className="hover:text-copper transition-colors">/pricing</a>
        </div>


        <div className="flex items-center gap-4">
          <button className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Login
          </button>
          <button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-semibold transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>
    </nav>
  );
}
