export function Footer() {
  return (
    <footer className="bg-dark border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 bg-border text-gray-400 flex items-center justify-center font-mono font-bold text-xs transform -skew-x-12">
            E
          </div>
          <span className="font-mono text-sm tracking-tighter text-gray-500">
            EDGECUTE © 2026
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
