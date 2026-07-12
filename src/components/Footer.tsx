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

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-border/50">
        <p className="text-xs text-gray-600 leading-relaxed max-w-4xl">
          Edgecute no es un asesor de inversión ni presta servicios de asesoramiento financiero. Todo el contenido, datos, estadísticas y herramientas de la plataforma (incluyendo el scanner, el backtester y el asistente) se ofrecen únicamente con fines informativos y educativos. Ninguna información de Edgecute debe interpretarse como una recomendación de compra o venta de ningún valor. Cualquier decisión de trading o inversión que tomes es responsabilidad exclusiva tuya, y Edgecute no asume ninguna responsabilidad por pérdidas o daños derivados del uso de la plataforma.
        </p>
      </div>
    </footer>
  );
}
