import { LogOut } from 'lucide-react';

interface LoginUser {
  name: string;
  email: string;
  provider: 'google' | 'discord' | 'email';
}

interface NavbarProps {
  onOpenWaitlist: () => void;
  isLoggedIn: boolean;
  user: LoginUser | null;
  onLogout: () => void;
}

export function Navbar({ onOpenWaitlist, isLoggedIn, user, onLogout }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-dark/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 select-none">
          {/* Isotipo SVG */}
          <svg
            viewBox="0 0 90 90"
            className="w-8 h-8 flex-shrink-0"
          >
            <rect x="0" y="0" width="90" height="90" rx="8" fill="#D87A3D" />
            <rect x="20" y="18" width="52" height="10" fill="#16181A" />
            <rect x="20" y="40" width="38" height="10" fill="#16181A" />
            <rect x="20" y="62" width="52" height="10" fill="#16181A" />
          </svg>
          <span className="brand-wordmark">
            Edgecute
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium font-mono text-gray-400">
          <a href="#features" className="hover:text-copper transition-colors">/features</a>
          <a href="#backtester" className="hover:text-copper transition-colors">/backtester</a>
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
                onClick={onOpenWaitlist}
                className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={onOpenWaitlist}
                className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-semibold transition-colors cursor-pointer"
              >
                Acceso anticipado
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
