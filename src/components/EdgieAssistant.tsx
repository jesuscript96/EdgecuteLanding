import { motion } from 'motion/react';
import { 
  Sparkles, 
  Terminal, 
  Layers, 
  MessageSquare, 
  VolumeX, 
  Volume2,
  RotateCcw, 
  Settings, 
  X, 
  Paperclip, 
  Mic, 
  Send 
} from 'lucide-react';
import { useState } from 'react';
import edgieVideo from '../../assets/edgie-bg-video.mp4';

// Cute branding robot head SVG logo
function EdgieLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      {/* Outer circle with branding color */}
      <circle cx="50" cy="50" r="45" className="stroke-copper fill-dark" strokeWidth="5" />
      {/* Robot head */}
      <rect x="25" y="40" width="50" height="35" rx="10" className="stroke-copper fill-none" strokeWidth="4" />
      {/* Eyes */}
      <circle cx="40" cy="55" r="4" className="fill-copper" />
      <circle cx="60" cy="55" r="4" className="fill-copper" />
      {/* Mouth */}
      <line x1="42" y1="65" x2="58" y2="65" className="stroke-copper" strokeWidth="3" strokeLinecap="round" />
      {/* Antenna */}
      <line x1="50" y1="40" x2="50" y2="28" className="stroke-copper" strokeWidth="4" />
      <circle cx="50" cy="24" r="5" className="fill-copper" />
      {/* Ears */}
      <rect x="20" y="50" width="5" height="15" rx="2" className="fill-copper" />
      <rect x="75" y="50" width="5" height="15" rx="2" className="fill-copper" />
    </svg>
  );
}

export function EdgieAssistant({ onOpenWaitlist }: { onOpenWaitlist: () => void }) {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <section className="py-24 px-6 bg-darker border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-12">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-stretch">
          
          {/* Card 1: Text Content (Existing copy) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="col-span-12 lg:col-span-5 bg-surface border border-border p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-center relative overflow-hidden shadow-2xl min-h-[380px]"
          >
            {/* Ambient background glow */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-copper/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              {/* Tag/Badge */}
              <span className="text-xs font-mono text-copper uppercase tracking-widest mb-4 block">
                Edgie • Asistente de Trading
              </span>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] mb-6 text-white tracking-tight">
                Edgie, tu asistente de trading.
              </h2>

              {/* Text description */}
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                Este asistente te ayuda a procesar la muchísima información que hay en el mercado de Small Caps, 
                facilitándote la vida para que puedas operar con absoluta claridad y profesionalismo.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Video Background Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="col-span-12 lg:col-span-7 rounded-[2.5rem] border border-border overflow-hidden min-h-[380px] lg:min-h-full shadow-2xl relative bg-darker"
          >
            <video
              src={edgieVideo}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-[1.02]"
            />
          </motion.div>

          {/* Card 3: Presentation and Chat Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="col-span-12 bg-surface border border-border p-8 md:p-12 lg:p-16 rounded-[2.5rem] grid lg:grid-cols-12 gap-8 lg:gap-16 items-center shadow-2xl relative overflow-hidden"
          >
            {/* Accent background glow */}
            <div className="absolute -bottom-48 -right-48 w-[450px] h-[450px] bg-copper/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Left side: Feature highlights */}
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-center z-10">
              <span className="text-xs font-mono text-copper uppercase tracking-widest mb-3 block">
                Edgie en Acción
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight">
                Tu copiloto inteligente en tiempo real.
              </h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-copper/10 border border-copper/20 text-copper shrink-0 mt-0.5">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">Análisis Financiero Instantáneo</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Carga filings de la SEC (10-K, 10-Q, S-3), interpreta noticias o examina datasets completos en segundos.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-copper/10 border border-copper/20 text-copper shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">Automatización sin Código</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Configura, modifica y ejecuta backtests complejos y simulaciones históricas pidiéndolo directamente.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-copper/10 border border-copper/20 text-copper shrink-0 mt-0.5">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">Navegación Interactiva</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Controla la aplicación de Edgecute mediante voz o texto para cambiar pantallas o cargar tickers al instante.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right side: Realistic Chat UI Mockup */}
            <div className="col-span-12 lg:col-span-7 flex justify-center items-center relative z-10 py-4">
              
              {/* Main Chat Mock Window */}
              <div className="w-full max-w-[460px] bg-[#0D0D0F] border border-border rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col relative">
                
                {/* Header */}
                <div className="bg-[#131316] border-b border-border px-4 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Small branding icon */}
                    <div className="relative">
                      <EdgieLogo className="w-9 h-9" />
                      {/* Pulsing indicator */}
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#131316] animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-sm leading-none">Edgie</span>
                        <span className="text-[9px] font-mono font-bold bg-copper/10 text-copper px-1.5 py-0.5 rounded leading-none">ASSISTANT</span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 block mt-1 uppercase tracking-wider">
                        En Línea
                      </span>
                    </div>
                  </div>

                  {/* Header Actions */}
                  <div className="flex items-center gap-3.5 text-gray-500">
                    <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white transition-colors cursor-pointer">
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <button className="hover:text-white transition-colors cursor-pointer">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button className="hover:text-white transition-colors cursor-pointer">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="hover:text-white transition-colors cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Chat Feed */}
                <div className="p-4 flex flex-col gap-4 min-h-[340px] overflow-y-auto">
                  {/* Bot Message */}
                  <div className="flex gap-2.5 items-start">
                    <EdgieLogo className="w-7 h-7 mt-0.5 shrink-0" />
                    <div className="bg-[#1A1A1D] border border-border/40 rounded-2xl rounded-tl-none p-3.5 text-gray-200 text-[11px] md:text-xs leading-relaxed max-w-[85%]">
                      Hola, soy <strong className="text-white font-semibold">Edgie</strong>, tu asistente de trading en Edgecute. Puedo analizar datos financieros y también operar la aplicación por ti: configurar y lanzar backtests, crear estrategias o datasets, navegar entre páginas... Pídemelo por texto o con el micrófono. ¿Qué hacemos hoy?
                    </div>
                  </div>

                  {/* User Message (Visual sample matching screenshot) */}
                  <div className="flex justify-end">
                    <div className="bg-copper/5 border border-copper/20 rounded-2xl rounded-tr-none p-3.5 text-gray-200 text-[11px] md:text-xs leading-relaxed max-w-[85%] text-left">
                      Dime cuál es el total de float shares de AAPL y hazme un resumen de la info corporativa con un idioma de trader sistemático.
                    </div>
                  </div>

                  {/* Bot Processing */}
                  <div className="flex gap-2.5 items-center mt-1">
                    <EdgieLogo className="w-7 h-7 shrink-0" />
                    <div className="bg-[#1A1A1D] border border-border/40 rounded-xl rounded-tl-none px-3.5 py-2.5 text-gray-400 text-[11px] md:text-xs flex items-center gap-2">
                      <span>Edgie procesando datos de AAPL</span>
                      <span className="flex gap-1 items-center mt-0.5">
                        <span className="w-1.5 h-1.5 bg-copper rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-copper rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-copper rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Input Bar */}
                <div className="bg-[#131316] border-t border-border p-3.5 flex items-center gap-3.5">
                  <button className="text-gray-500 hover:text-white transition-colors cursor-pointer">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="text-gray-500 hover:text-white transition-colors cursor-pointer">
                    <Mic className="w-4 h-4" />
                  </button>
                  
                  {/* Mock Text Field */}
                  <div className="flex-1 bg-[#1A1A1D] border border-border rounded-xl px-3 py-2 text-xs text-gray-500 font-sans cursor-text flex items-center">
                    Pregúntale a Edgie...
                  </div>

                  <button className="w-8 h-8 rounded-lg bg-copper hover:bg-[#A25215] text-white flex items-center justify-center transition-all cursor-pointer shadow-[0_2px_10px_rgba(201,105,31,0.3)]">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Floating Action Button (Lower Right overlay representation) */}
              <div className="absolute -bottom-6 -right-6 md:-right-8 lg:-right-10 pointer-events-none hidden md:block">
                <div className="w-14 h-14 rounded-full border-2 border-copper bg-[#0D0D0F] shadow-[0_8px_30px_rgba(201,105,31,0.25)] flex items-center justify-center relative">
                  <EdgieLogo className="w-10 h-10" />
                  {/* Pulse Ring */}
                  <span className="absolute inset-0 rounded-full border border-copper animate-ping opacity-30" style={{ animationDuration: '3s' }} />
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <button
            onClick={onOpenWaitlist}
            className="bg-copper hover:bg-[#A25215] text-white px-8 py-4 rounded-xl text-base font-bold transition-all cursor-pointer shadow-[0_4px_24px_rgba(201,105,31,0.25)] hover:shadow-[0_6px_32px_rgba(201,105,31,0.4)]"
          >
            Solicitar acceso a la beta
          </button>
        </motion.div>
      </div>
    </section>
  );
}
