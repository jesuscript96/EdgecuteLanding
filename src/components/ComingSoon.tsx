import { ArrowRight, FileText, BarChart3, ShieldCheck, PenTool, Layers, Bell, BookOpen } from 'lucide-react';

const upcomingFeatures = [
  {
    icon: FileText,
    title: 'Información Dilutiva',
    description: 'Ampliación del análisis de tickers con análisis automático y resumen inteligente de información dilutiva (S-3, S-1, ATMs, warrants).',
    tag: 'Fase 2 • SEC'
  },
  {
    icon: BarChart3,
    title: 'Market Análisis',
    description: 'Monitoreo en tiempo real del entorno de gappers y runners, detección de simpatías de mercado (sympathy plays) y métricas complejas.',
    tag: 'Fase 2 • Estructura'
  },
  {
    icon: PenTool,
    title: 'Journal de Álvaro',
    description: 'Bitácora operativa automatizada diseñada por Álvaro más gestor de notas avanzado para el aprendizaje y optimización operativa.',
    tag: 'Fase 2 • Bitácora'
  },
  {
    icon: Bell,
    title: 'Screener y Alertas',
    description: 'Buscador en tiempo real con alarmas acústicas y visuales según tus presets y parámetros de estrategias individuales.',
    tag: 'Fase 2 • Alertas'
  },
  {
    icon: BookOpen,
    title: 'Tutoriales & Soporte',
    description: 'Portal de tutoriales prácticos guiados paso a paso y canal de soporte individualizado para dominar la plataforma al 100%.',
    tag: 'Fase 2 • Soporte'
  },
  {
    icon: ShieldCheck,
    title: 'Validación y Robustez',
    description: 'Simulaciones de Montecarlo Bootstrap y validación Walk-Forward para modelar el nivel de Drawdown máximo soportable.',
    tag: 'Fase 3 • Validación'
  },
  {
    icon: Layers,
    title: 'Portfolio Manager',
    description: 'Integración de estrategias en portafolios ponderados por modelos estadísticos, analíticas VaR y CVaR, y matrices de correlación.',
    tag: 'Fase 3 • Riesgo'
  }
];

interface ComingSoonProps {
  onViewRoadmap: () => void;
}

export function ComingSoon({ onViewRoadmap }: ComingSoonProps) {
  // Duplicate features array to create a seamless infinite marquee effect
  const doubleFeatures = [...upcomingFeatures, ...upcomingFeatures];

  return (
    <section id="roadmap" className="py-32 bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Honestidad técnica.</h2>
          <p className="text-gray-400 text-lg md:text-xl font-light">
            No te vendemos humo. Esto es lo que no está hoy en el MVP, planificado para las siguientes fases de desarrollo.
          </p>
        </div>
        <button 
          onClick={onViewRoadmap}
          className="flex items-center gap-2 bg-[#1A1A1D] hover:bg-[#232326] text-white border border-border px-5 py-3 rounded-xl font-medium transition-colors cursor-pointer"
        >
          Ver roadmap público
          <ArrowRight className="w-4 h-4 text-copper" />
        </button>
      </div>

      <div className="relative w-full mx-auto px-6 overflow-hidden">
        {/* Smooth scrolling CSS marquee container */}
        <div className="flex gap-6 pb-12 pt-4 animate-marquee hover:[animation-play-state:paused]">
          {doubleFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            const originalIdx = idx % upcomingFeatures.length;
            return (
              <div 
                key={idx} 
                className="bg-surface border border-border rounded-[2rem] flex flex-col w-[340px] md:w-[400px] h-[520px] shrink-0 overflow-hidden group cursor-pointer"
              >
                {/* Content (Top) */}
                <div className="p-10 pb-0 flex flex-col items-start gap-5 flex-none">
                  <div className="font-mono text-xs font-semibold text-copper bg-copper/10 px-3 py-1.5 rounded-full flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    {feat.tag}
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Abstract Visual Mockup (Bottom) */}
                <div className="mt-auto pt-10 px-8 w-full h-[240px] relative overflow-hidden flex items-end justify-center">
                  {/* Subtle Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-darker to-transparent"></div>
                  
                  {/* Fake UI Card that slides up slightly on hover */}
                  <div className="w-full h-full bg-[#1A1A1D] border border-border border-b-0 rounded-t-2xl shadow-2xl relative p-5 flex flex-col gap-4 transform transition-transform duration-500 ease-out group-hover:-translate-y-4">
                    
                    {/* Fake Header */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
                    </div>

                    {/* Specific Fake Content per card type */}
                    {originalIdx === 0 && ( // Dilution
                      <>
                        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mb-1">
                          <span>FORM S-3 / AMENDMENT</span>
                          <span className="text-copper">ACTIVE SHELF</span>
                        </div>
                        <div className="h-12 bg-darker border border-border rounded p-2 flex flex-col gap-2 justify-center">
                          <div className="w-11/12 h-2 bg-copper/20 rounded"></div>
                          <div className="w-2/3 h-2 bg-gray-700 rounded"></div>
                        </div>
                      </>
                    )}
                    
                    {originalIdx === 1 && ( // Market Analysis
                      <>
                        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mb-1">
                          <span>GAPPERS & RUNNERS</span>
                          <span className="text-green-500">+142%</span>
                        </div>
                        <div className="h-12 bg-darker border border-border rounded p-2 flex items-center justify-between">
                          <div className="flex flex-col gap-1 w-2/3">
                            <div className="w-full h-1.5 bg-gray-700 rounded"></div>
                            <div className="w-3/4 h-1.5 bg-gray-600 rounded"></div>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-dashed border-copper/30 flex items-center justify-center text-[9px] font-mono text-copper">
                            SYM
                          </div>
                        </div>
                      </>
                    )}

                    {originalIdx === 2 && ( // Journal de Alvaro
                      <>
                        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mb-1">
                          <span>JOURNAL LOG</span>
                          <span className="text-gray-400">06/01</span>
                        </div>
                        <div className="h-12 bg-darker border border-border rounded p-2 flex flex-col gap-1">
                          <div className="text-[9px] font-mono text-green-400">+$1,420.00 (VWAP Fade Setup)</div>
                          <div className="w-11/12 h-1 bg-gray-700 rounded"></div>
                        </div>
                      </>
                    )}

                    {originalIdx === 3 && ( // Screener
                      <>
                        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mb-1">
                          <span>LIVE SCREENER FEED</span>
                          <span className="text-red-500 animate-pulse">ALERT</span>
                        </div>
                        <div className="h-12 bg-red-950/20 border border-red-500/20 rounded p-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-white leading-none">HALT WARNING: XYZ</span>
                            <span className="text-[8px] font-mono text-gray-500 leading-none mt-1">Float Rotation &gt; 2.5</span>
                          </div>
                        </div>
                      </>
                    )}

                    {originalIdx === 4 && ( // Tutoriales
                      <>
                        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mb-1">
                          <span>EDGE KNOWLEDGEBASE</span>
                          <span className="text-gray-400">HELP</span>
                        </div>
                        <div className="h-12 bg-darker border border-border rounded p-2 flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-copper/10 flex items-center justify-center text-copper font-bold text-[10px]">
                            ?
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="w-24 h-1.5 bg-gray-700 rounded"></div>
                            <div className="w-16 h-1.5 bg-gray-600 rounded"></div>
                          </div>
                        </div>
                      </>
                    )}

                    {originalIdx === 5 && ( // Validation & Robustness
                      <>
                        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mb-1">
                          <span>MONTE CARLO SIMULATOR</span>
                          <span className="text-gray-400">95% CI</span>
                        </div>
                        <div className="h-12 bg-darker border border-border rounded p-2 flex items-end gap-1 justify-between">
                          {[40, 60, 30, 80, 50, 90, 70, 45, 65, 85].map((h, i) => (
                            <div key={i} className="bg-copper/30 w-1.5 rounded-t" style={{ height: `${h}%` }}></div>
                          ))}
                        </div>
                      </>
                    )}

                    {originalIdx === 6 && ( // Portfolio
                      <>
                        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mb-1">
                          <span>PORTFOLIO ALLOCATION</span>
                          <span className="text-copper">VaR: 4.2%</span>
                        </div>
                        <div className="h-12 bg-darker border border-border rounded p-2 flex gap-3 items-center">
                          <div className="w-6 h-6 rounded-full border-2 border-copper/30 border-t-copper shrink-0 animate-spin" style={{ animationDuration: '4s' }}></div>
                          <div className="flex flex-col gap-1 w-full">
                            <div className="w-full h-1 bg-gray-700 rounded"></div>
                            <div className="w-2/3 h-1 bg-gray-600 rounded"></div>
                          </div>
                        </div>
                      </>
                    )}

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
