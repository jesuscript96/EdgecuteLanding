import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, LayoutDashboard, TerminalSquare, Database, Play } from 'lucide-react';

import datasetVideo from '../../assets/Edgecutedataset.webm';
import strategyVideo from '../../assets/Edgecutestrategy.webm';
import marketVideo from '../../assets/marketAnalysis.webm';

const tabs = [
  {
    id: 'analisis',
    title: 'Análisis de Tickers',
    subtitle: 'Contexto inmediato',
    icon: TerminalSquare,
    content: 'Información clave de float, dirección de cierre diario y links directos a noticias relevantes para entender el contexto inmediato del ticker sin perder tiempo.',
    imageMock: 'terminal'
  },
  {
    id: 'backtest',
    title: 'Backtesting Completo',
    subtitle: 'Simulación histórica',
    icon: LineChart,
    content: 'Motor de simulación de alta velocidad sobre datos históricos con desglose individual de trades, configuración de variables operativas y cálculo de métricas de rendimiento clave.',
    imageMock: 'chart'
  },
  {
    id: 'repositorio',
    title: 'Repositorio & Comparativa',
    subtitle: 'Gestión de estrategias',
    icon: Database,
    content: 'Almacena tus setups, gestiona tus datasets históricos y contrasta el rendimiento relativo de tus estrategias de forma gráfica y unificada.',
    imageMock: 'dashboard'
  }
];

const tabVideos: Record<string, string> = {
  analisis: marketVideo,
  backtest: strategyVideo,
  repositorio: datasetVideo,
};

// Video component with click-to-pause functionality for a premium feel
function FeatureVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="flex-1 bg-darker relative overflow-hidden group/video cursor-pointer" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
      {/* Visual feedback overlay when paused */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-dark/60 flex items-center justify-center transition-all">
          <div className="w-16 h-16 bg-copper text-white rounded-full flex items-center justify-center transform transition-transform scale-110 shadow-[0_0_30px_rgba(201,105,31,0.3)]">
            <Play className="w-6 h-6 ml-1 fill-current" />
          </div>
        </div>
      )}
    </div>
  );
}

export function Features() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`feature-mock-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    const activeEl = document.getElementById(`tab-btn-${activeTab}`);
    if (activeEl) {
      const isMobile = window.innerWidth < 1024; // lg breakpoint in Tailwind is 1024px
      if (isMobile) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  return (
    <section id="features" className="py-24 px-6 bg-darker border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo tu stack consolidado.</h2>
          <p className="text-gray-400 text-lg font-mono">01 Plataforma / 05 Herramientas eliminadas</p>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-8 lg:gap-16 items-start relative">
          {/* Sticky/Scrolling Sidebar Tabs */}
          <div 
            ref={sidebarRef}
            className="flex flex-row lg:flex-col gap-4 lg:gap-2 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-4 lg:pb-0 lg:sticky top-32 scrollbar-none -mx-6 px-6 lg:mx-0 lg:px-0"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  onClick={() => scrollToSection(tab.id)}
                  className={`text-left p-6 rounded-xl transition-all border shrink-0 w-[290px] sm:w-[330px] snap-center lg:w-full select-none cursor-pointer ${
                    isActive 
                      ? 'bg-surface border-copper shadow-[0_0_30px_rgba(201,105,31,0.05)]' 
                      : 'bg-transparent border-transparent hover:bg-surface/50 hover:border-border'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-copper/10 text-copper' : 'bg-surface border border-border text-gray-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-sm font-mono tracking-widest uppercase ${isActive ? 'text-copper' : 'text-gray-500'}`}>
                      {tab.subtitle}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                    {tab.title}
                  </h3>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-gray-400 text-sm leading-relaxed overflow-hidden"
                      >
                        <div className="pt-2">{tab.content}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Right side dynamic content windows (Scrolling sequence) */}
          <div className="flex flex-col gap-24 lg:py-16">
            {tabs.map((tab) => (
              <motion.div
                key={tab.id}
                id={`feature-mock-${tab.id}`}
                onViewportEnter={() => setActiveTab(tab.id)}
                viewport={{ margin: "-40% 0px -40% 0px" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative bg-surface rounded-2xl border border-border overflow-hidden aspect-video shadow-2xl flex flex-col group w-full lg:w-[115%] lg:origin-left"
              >
                <div className="h-10 border-b border-border bg-[#1A1A1D] flex items-center px-4 gap-4">
                   <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                   </div>
                   <div className="h-5 w-px bg-border"></div>
                   <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                     workspace • {tab.id === 'analisis' ? 'ticker_analysis' : tab.id === 'backtest' ? 'backtester' : 'strategy_repo'}
                   </div>
                </div>
                
                <FeatureVideo src={tabVideos[tab.id]} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
