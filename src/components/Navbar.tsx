import { LogOut } from 'lucide-react';

interface LoginUser {
  name: string;
  email: string;
  provider: 'google' | 'discord' | 'email';
}

interface NavbarProps {
  onViewLanding: () => void;
  onViewRoadmap: () => void;
  onViewLogin: () => void;
  isLoggedIn: boolean;
  user: LoginUser | null;
  onLogout: () => void;
}

export function Navbar({ onViewLanding, onViewRoadmap, onViewLogin, isLoggedIn, user, onLogout }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-dark/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div 
          onClick={onViewLanding}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          {/* Logo with slanted 'E' vibe */}
          <div className="w-8 h-8 bg-copper text-white flex items-center justify-center font-mono font-bold leading-none transform -skew-x-12 group-hover:scale-105 transition-transform">
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
          {isLoggedIn && user ? (
            <div className="flex items-center gap-3">
              {/* Profile Pill */}
              <div className="flex items-center gap-2 bg-surface border border-border px-3 py-1.5 rounded-lg text-xs font-mono text-white select-none">
                <span className={`w-2 h-2 rounded-full ${
                  user.provider === 'google' ? 'bg-blue-400' : user.provider === 'discord' ? 'bg-[#5865F2]' : 'bg-copper'
                }`}></span>
                <span className="max-w-[120px] truncate">{user.name}</span>
              </div>
              
              {/* Logout Button */}
              <button 
                onClick={onLogout}
                className="flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-red-400 transition-colors cursor-pointer border border-transparent hover:border-red-900/10 hover:bg-red-950/20 px-3 py-1.5 rounded-lg"
                title="Cerrar sesión"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cerrar sesión</span>
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={onViewLogin}
                className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                Login
              </button>
              <button 
                onClick={onViewLogin}
                className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-semibold transition-colors cursor-pointer"
              >
                Start Free Trial
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
