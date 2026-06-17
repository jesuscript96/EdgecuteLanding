export function Footer() {
  return (
    <footer className="bg-dark border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          {/* Isotipo SVG */}
          <svg 
            viewBox="0 0 90 90" 
            className="w-6 h-6 flex-shrink-0"
          >
            <rect x="0" y="0" width="90" height="90" rx="8" fill="#D87A3D" />
            <rect x="20" y="18" width="52" height="10" fill="#16181A" />
            <rect x="20" y="40" width="38" height="10" fill="#16181A" />
            <rect x="20" y="62" width="52" height="10" fill="#16181A" />
          </svg>
          <span className="brand-wordmark opacity-60">
            Edgecute
          </span>
          <span className="text-xs font-mono text-gray-600 ml-1">
            © 2026
          </span>
        </div>
        
        <div className="flex items-center gap-6 text-sm font-mono text-gray-500">
          <a href="#" className="hover:text-copper transition-colors">Términos</a>
          <a href="#" className="hover:text-copper transition-colors">Privacidad</a>
          <a href="#" className="hover:text-copper transition-colors">Twitter (X)</a>
          <a href="#" className="hover:text-copper transition-colors">Discord</a>
        </div>
      </div>
    </footer>
  );
}
