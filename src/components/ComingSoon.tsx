import { Zap, Bot, Briefcase, Globe, ArrowRight } from 'lucide-react';

const upcomingFeatures = [
  {
    icon: Zap,
    title: 'Alertas Live',
    description: 'Notificaciones vía webhook o SMS cuando tu setup ideal con look-ahead bias se forma en el scanner intradía.',
    tag: 'Infra'
  },
  {
    icon: Bot,
    title: 'Ejecución Automatizada',
    description: 'API directa para enrutar órdenes basadas en tus estrategias testeadas, modelando slippage avanzado.',
    tag: 'Quant'
  },
  {
    icon: Briefcase,
    title: 'Portfolios Dinámicos',
    description: 'Rebalanceo dinámico y análisis de correlaciones de Pearson entre múltiples estrategias.',
    tag: 'Risk'
  },
  {
    icon: Globe,
    title: 'Large Caps & Futuros',
    description: 'Expansión del universo de datos más allá de small caps. Mismo backtester, nuevos mercados.',
    tag: 'Data'
  }
];

interface ComingSoonProps {
  onViewRoadmap: () => void;
}

export function ComingSoon({ onViewRoadmap }: ComingSoonProps) {
  return (
    <section id="roadmap" className="py-32 bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Honestidad técnica.</h2>
          <p className="text-gray-400 text-lg md:text-xl font-light">
            No te vendemos promesas. Esto es lo que no está hoy, pero llegará en Fase 2.
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


      <div className="relative max-w-[1400px] mx-auto px-6">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {upcomingFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx} 
                className="bg-surface border border-border rounded-[2rem] flex flex-col w-[340px] md:w-[400px] h-[520px] snap-center shrink-0 overflow-hidden group cursor-pointer"
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
                    {idx === 0 && ( // Alertas Live
                      <>
                        <div className="h-8 bg-green-500/10 border border-green-500/20 rounded flex items-center px-3 gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <div className="w-20 h-2 bg-green-500/50 rounded"></div>
                        </div>
                        <div className="h-12 bg-darker border border-border rounded p-2 flex flex-col gap-2">
                          <div className="w-3/4 h-2 bg-gray-700 rounded"></div>
                          <div className="w-1/2 h-2 bg-gray-600 rounded"></div>
                        </div>
                      </>
                    )}
                    
                    {idx === 1 && ( // Ejecución
                      <>
                        <div className="flex justify-between items-center text-xs font-mono text-gray-500 mb-2">
                           <span>POST /api/v1/order</span>
                           <span className="text-copper">200 OK</span>
                        </div>
                        <div className="flex-1 bg-darker rounded border border-border p-3 flex flex-col gap-2">
                           <div className="w-full h-2 bg-copper/20 rounded"></div>
                           <div className="w-2/3 h-2 bg-copper/20 rounded"></div>
                           <div className="w-4/5 h-2 bg-copper/20 rounded"></div>
                        </div>
                      </>
                    )}

                    {idx === 2 && ( // Portfolios
                      <>
                        <div className="flex gap-4 h-full pt-2">
                          <div className="w-16 h-16 rounded-full border-4 border-border border-t-copper border-r-copper shrink-0"></div>
                          <div className="flex flex-col gap-2 w-full justify-center">
                            <div className="w-full h-2 bg-border rounded"></div>
                            <div className="w-2/3 h-2 bg-border rounded"></div>
                            <div className="w-4/5 h-2 bg-border rounded"></div>
                          </div>
                        </div>
                      </>
                    )}

                    {idx === 3 && ( // Large Caps
                      <>
                        <div className="grid grid-cols-2 gap-2 h-full">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-darker border border-border rounded p-2 flex flex-col justify-between">
                              <div className="w-8 h-2 bg-gray-600 rounded"></div>
                              <div className="w-16 h-3 bg-copper/50 rounded"></div>
                            </div>
                          ))}
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
