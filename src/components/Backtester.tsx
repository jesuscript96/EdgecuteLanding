import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import backtesterWizard from '../../assets/backtester_wizard.webm';
import backtesterEquity from '../../assets/backtester_equity.webm';
import backtesterOptimization1 from '../../assets/backtester_optimization_1.webm';
import backtesterOptimization23d from '../../assets/backtester_optimization_2_3d.webm';

const AUTOPLAY_INTERVAL = 8000;

export interface TabItem {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  intro: string;
  video: string;
  link: string;
}

const items: TabItem[] = [
  {
    slug: 'wizard',
    index: '01',
    name: 'Estrategias sin código (Wizard)',
    tagline: 'Aprende y crea desde el primer segundo.',
    intro: 'La forma más intuitiva de operar. Diseña, edita y prueba tus setups en un asistente visual paso a paso sin escribir una sola línea de código.',
    video: backtesterWizard,
    link: '#pricing'
  },
  {
    slug: 'equity',
    index: '02',
    name: 'Curva de capital y estadísticas',
    tagline: 'Métricas cuantitativas e institucionales al detalle.',
    intro: 'Analiza el desglose completo de tu operativa: curva de equity, drawdown máximo histórico, profit factor, ratio de Sharpe y un diario detallado con cada operación simulada.',
    video: backtesterEquity,
    link: '#pricing'
  },
  {
    slug: 'opt1',
    index: '03',
    name: 'Optimización de Parámetros',
    tagline: 'Encuentra la configuración ideal automáticamente.',
    intro: 'Somete tu estrategia a cientos de combinaciones simultáneas. Ajusta de forma inteligente tus stop loss, target prices e indicadores técnicos en segundos para maximizar el rendimiento.',
    video: backtesterOptimization1,
    link: '#pricing'
  },
  {
    slug: 'opt2',
    index: '04',
    name: 'Espacio de Robustez 3D',
    tagline: 'Visualización en tres dimensiones contra el overfitting.',
    intro: 'No te dejes engañar por una simulación demasiado optimizada. Visualiza la estabilidad de tus parámetros en un espacio 3D interactivo para garantizar que tu ventaja sea real y duradera.',
    video: backtesterOptimization23d,
    link: '#pricing'
  }
];

export function Backtester() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const startTimeRef = useRef<number>(Date.now());
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
    setProgress(0);

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= AUTOPLAY_INTERVAL) {
        setActiveIndex((prev) => (prev + 1) % items.length);
        startTimeRef.current = Date.now();
      } else {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeIndex]);

  const activeItem = items[activeIndex];

  return (
    <section id="backtester" className="py-24 md:py-32 bg-darker text-white border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabecera */}
        <div className="mb-14 max-w-3xl">
          <span className="block font-mono text-xs tracking-[0.35em] uppercase text-copper mb-4">
            / EL MOTOR DE SIMULACIÓN
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] text-balance">
            El Backtester Sin Código Más Rápido del Mercado
          </h2>
        </div>

        {/* Botones / Pestañas de Navegación con Barra de Carga */}
        <div className="flex overflow-x-auto scrollbar-none gap-2 mb-8 pb-4 border-b border-border">
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.slug}
                onClick={() => setActiveIndex(index)}
                className={`flex-none px-5 py-3 rounded-lg text-xs font-semibold tracking-wider font-mono transition-all relative overflow-hidden uppercase cursor-pointer select-none ${
                  isActive
                    ? "bg-surface text-white shadow-sm border border-border"
                    : "bg-transparent text-gray-500 hover:bg-surface/40 hover:text-gray-300"
                }`}
              >
                {/* Texto por encima de la barra de carga */}
                <span className="relative z-10">{item.name}</span>
                
                {/* Capa de barra de progreso */}
                {isActive && (
                  <div className="absolute inset-0 z-0 bg-copper/5 pointer-events-none">
                    <div
                      className="h-full bg-copper/10 transition-none"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Panel de Contenido con Transición (AnimatePresence) */}
        <div className="relative bg-surface rounded-2xl overflow-hidden h-[600px] lg:h-[650px] flex items-center shadow-2xl border border-border">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // EaseOutExpo
              className="absolute inset-0 flex flex-col lg:flex-row w-full h-full"
            >
              {/* Lado Izquierdo: Textos */}
              <div className="w-full lg:w-5/12 p-8 md:p-16 flex flex-col justify-center z-20 bg-gradient-to-r from-surface via-surface/95 to-transparent lg:bg-surface relative">
                {/* Ambient background glow inside text box */}
                <div className="absolute -top-24 -left-24 w-80 h-80 bg-copper/5 rounded-full blur-[80px] pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="relative z-10"
                >
                  <span className="text-copper font-mono text-xs tracking-widest uppercase mb-4 block">
                    {activeItem.index} — {activeItem.name}
                  </span>
                  <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-white tracking-tight leading-[1.1] mb-6 text-balance">
                    {activeItem.tagline}
                  </h3>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-md">
                    {activeItem.intro}
                  </p>

                  <a
                    href={activeItem.link}
                    className="inline-flex items-center gap-2 text-white font-semibold hover:text-copper transition-colors group text-sm uppercase tracking-wider font-mono cursor-pointer"
                  >
                    Probar ahora
                    <ArrowRight className="w-4 h-4 text-copper group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>

              {/* Lado Derecho: Contenido Multimedia (Video) */}
              <div className="absolute lg:relative inset-0 lg:inset-auto lg:w-7/12 h-full z-10 flex items-center justify-center bg-[#050505]">
                {/* Degradado oscuro para móviles (asegura legibilidad del texto superior) */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent lg:hidden z-20" />
                
                <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                  {/* Reproductor de Video */}
                  <motion.video
                    key={`video-${activeIndex}`}
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    src={activeItem.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center opacity-65 lg:opacity-100"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
