export function Navbar() {
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
          <a
            href="https://app.edgecute.com"
            className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-semibold transition-colors cursor-pointer"
          >
            Entrar a la app
          </a>
        </div>
      </div>
    </nav>
  );
}
