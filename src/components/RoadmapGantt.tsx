import { useState } from 'react';
import { ArrowLeft, Calendar, CheckCircle2, PlayCircle, HelpCircle } from 'lucide-react';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  track: 'analisis' | 'backtester' | 'dilution' | 'risk' | 'scanner' | 'execution';
  startSprint: number; // 1-indexed (1 to 8)
  durationSprints: number; // number of sprints this spans
  status: 'done' | 'active' | 'planned';
  phase: string;
}

const roadmapItems: RoadmapItem[] = [
  // Track 1: Análisis
  {
    id: 'a1',
    title: 'Análisis de Tickers (Core)',
    description: 'Información clave de float, dirección de cierre diario y links directos a noticias relevantes integrada por ticker.',
    track: 'analisis',
    startSprint: 1,
    durationSprints: 1,
    status: 'done',
    phase: 'Fase 1 (Disponible)'
  },
  {
    id: 'a2',
    title: 'Ampliación Dilutiva & IA',
    description: 'Integración de herramientas de análisis de dilución y backtest por IA y en tiempo real.',
    track: 'dilution',
    startSprint: 3,
    durationSprints: 2,
    status: 'planned',
    phase: 'Fase 2'
  },

  // Track 2: Backtester
  {
    id: 'b1',
    title: 'Motor de Backtest Completo',
    description: 'Simulación histórica con herramientas básicas de optimización 3D y validación IS-OOS.',
    track: 'backtester',
    startSprint: 1,
    durationSprints: 2,
    status: 'done',
    phase: 'Fase 1 (Disponible)'
  },
  {
    id: 'b2',
    title: 'Robustez y Validación',
    description: 'Simulaciones Montecarlo Bootstrap, CPCV de López de Prado para evitar sobreajuste, pruebas de estrés (Black Swan) y coste de locates.',
    track: 'backtester',
    startSprint: 5,
    durationSprints: 2,
    status: 'planned',
    phase: 'Fase 3'
  },

  // Track 3: Repositorio & Portfolios
  {
    id: 'r1',
    title: 'Repositorio de Estrategias',
    description: 'Gestión centralizada de setups, carga de datasets históricos y comparador gráfico de curvas de equity.',
    track: 'risk',
    startSprint: 1,
    durationSprints: 2,
    status: 'done',
    phase: 'Fase 1 (Disponible)'
  },
  {
    id: 'r2',
    title: 'Portfolio Manager & Modelos',
    description: 'Modelos HRP, Kelly, Markov, Risk Parity, Montecarlo Bootstrap, y análisis comparativo manual vs. backtest.',
    track: 'risk',
    startSprint: 4,
    durationSprints: 2,
    status: 'planned',
    phase: 'Fase 2'
  },

  // Track 4: Screener & Market
  {
    id: 's1',
    title: 'Market Análisis Avanzado',
    description: 'Situación actual de mercado de Small Caps: ciclos, modelos ARIMA/SARIMA, y modelización de sympathy plays.',
    track: 'scanner',
    startSprint: 6,
    durationSprints: 2,
    status: 'planned',
    phase: 'Fase 4'
  },
  {
    id: 's2',
    title: 'Screener Personalizado',
    description: 'Buscador en tiempo real con configuración de alarmas acústicas y visuales según presets y parámetros de estrategias.',
    track: 'scanner',
    startSprint: 3,
    durationSprints: 2,
    status: 'planned',
    phase: 'Fase 2'
  },

  // Track 5: Journal & Notas
  {
    id: 'j1',
    title: 'Journal Avanzado',
    description: 'Bitácora operativa automatizada para registrar, clasificar y auditar tu operativa manual respecto a resultados ideales.',
    track: 'scanner',
    startSprint: 4,
    durationSprints: 1,
    status: 'planned',
    phase: 'Fase 2'
  },

  // Track 6: Soporte & Docs
  {
    id: 'e1',
    title: 'Soporte & Docs',
    description: 'Tutorización de herramientas en videos, documentación y soporte online.',
    track: 'execution',
    startSprint: 5,
    durationSprints: 1,
    status: 'planned',
    phase: 'Fase 2'
  },

  // Track 7: Automatización Pro
  {
    id: 'bot1',
    title: 'Automatización Das Pro',
    description: 'Integración de avisos personalizados en screeners y configuración de bot de automatización de la operativa con Das Pro.',
    track: 'scanner',
    startSprint: 7,
    durationSprints: 2,
    status: 'planned',
    phase: 'Fase 5'
  }
];

const sprints = [
  { num: 1, name: 'Sprint 1', dates: 'Jun 1 - Jun 14' },
  { num: 2, name: 'Sprint 2', dates: 'Jun 15 - Jun 28' },
  { num: 3, name: 'Sprint 3', dates: 'Jun 29 - Jul 12' },
  { num: 4, name: 'Sprint 4', dates: 'Jul 13 - Jul 26' },
  { num: 5, name: 'Sprint 5', dates: 'Jul 27 - Aug 9' },
  { num: 6, name: 'Sprint 6', dates: 'Aug 10 - Aug 23' },
  { num: 7, name: 'Sprint 7', dates: 'Aug 24 - Sep 6' },
  { num: 8, name: 'Sprint 8', dates: 'Sep 7 - Sep 20' }
];

const tracks = [
  { id: 'all', name: 'Todos los Tracks' },
  { id: 'analisis', name: 'Análisis' },
  { id: 'backtester', name: 'Backtester' },
  { id: 'dilution', name: 'Dilución SEC' },
  { id: 'risk', name: 'Riesgo & Portfolio' },
  { id: 'scanner', name: 'Screener & Market' },
  { id: 'execution', name: 'Soporte & Docs' }
];

export function RoadmapGantt({ onBack }: { onBack: () => void }) {
  const [filterTrack, setFilterTrack] = useState<string>('all');
  const [hoveredItem, setHoveredItem] = useState<RoadmapItem | null>(null);

  const filteredItems = filterTrack === 'all'
    ? roadmapItems
    : roadmapItems.filter(item => item.track === filterTrack);

  return (
    <div className="min-h-screen bg-dark text-gray-300 font-sans antialiased flex flex-col">
      {/* Top Navbar */}
      <nav className="border-b border-border bg-dark/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-copper transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            /volver
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-copper text-white flex items-center justify-center font-mono font-bold leading-none transform -skew-x-12">
              E
            </div>
            <span className="font-mono font-bold text-xl tracking-tighter text-white">
              EDGECUTE
            </span>
          </div>

          <div className="text-xs font-mono text-gray-500 uppercase tracking-widest hidden md:block">
            roadmap público • gantt v1
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 flex flex-col gap-8">
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-3 text-white">Roadmap de Sprints</h1>
            <p className="text-gray-400 text-lg max-w-2xl font-light">
              Nuestra planificación técnica detallada en sprints de dos semanas. Transparencia y rigor en cada entrega de código.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-gray-500 bg-surface border border-border px-4 py-2.5 rounded-lg shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span>Completado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-copper animate-pulse"></span>
              <span>En progreso</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-600"></span>
              <span>Planificado</span>
            </div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none -mx-6 px-6 md:mx-0 md:px-0">
          {tracks.map(t => (
            <button
              key={t.id}
              onClick={() => setFilterTrack(t.id)}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase border transition-all shrink-0 cursor-pointer ${
                filterTrack === t.id
                  ? 'bg-copper text-white border-copper shadow-[0_0_15px_rgba(201,105,31,0.2)]'
                  : 'bg-surface border-border text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Gantt Interactive Board */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl relative">
          
          {/* Header Row: Sprints */}
          <div className="grid grid-cols-[160px_1fr] md:grid-cols-[240px_1fr] border-b border-border/80 bg-[#141416] sticky top-0 z-10">
            <div className="p-4 font-mono text-xs font-bold text-gray-500 border-r border-border uppercase tracking-widest">
              Funcionalidad / Módulos
            </div>
            
            <div className="grid h-full items-stretch" style={{ gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }}>
              {sprints.map(s => {
                const isCurrent = s.num === 1; // Simulated current sprint is Sprint 1
                return (
                  <div 
                    key={s.num} 
                    className={`p-3 flex flex-col justify-between border-r border-border/40 last:border-none text-center font-mono relative overflow-hidden ${
                      isCurrent ? 'bg-copper/5' : ''
                    }`}
                  >
                    {isCurrent && (
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-copper"></div>
                    )}
                    <span className={`text-xs font-bold ${isCurrent ? 'text-copper' : 'text-gray-300'}`}>
                      {s.name}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">
                      {s.dates}
                    </span>
                    {isCurrent && (
                      <span className="absolute bottom-1 right-2 text-[8px] tracking-wider font-bold text-copper/80 uppercase">
                        Hoy
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Body Rows: Gantt Bars */}
          <div className="divide-y divide-border/60">
            {filteredItems.map(item => {
              const isCurrent = item.status === 'active';
              return (
                <div 
                  key={item.id} 
                  className="grid grid-cols-[160px_1fr] md:grid-cols-[240px_1fr] items-stretch min-h-[76px] hover:bg-[#1A1A1D]/30 transition-colors group/row"
                >
                  {/* Left Metadata Cell */}
                  <div className="p-4 border-r border-border/80 flex flex-col justify-center gap-1">
                    <div className="flex items-center gap-2">
                      {item.status === 'done' && <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />}
                      {item.status === 'active' && <PlayCircle className="w-3.5 h-3.5 text-copper shrink-0 animate-pulse" />}
                      {item.status === 'planned' && <div className="w-3.5 h-3.5 rounded-full border border-gray-600 shrink-0" />}
                      <span className="text-sm font-bold text-white group-hover/row:text-copper transition-colors line-clamp-1">
                        {item.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        {item.track}
                      </span>
                      <span className="text-[9px] font-mono bg-dark px-1.5 py-0.5 rounded text-gray-400 border border-border">
                        {item.phase}
                      </span>
                    </div>
                  </div>

                  {/* Right Timeline Grid */}
                  <div className="relative grid items-center h-full" style={{ gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }}>
                    
                    {/* Vertical background divider gridlines */}
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                      <div key={i} className="absolute top-0 bottom-0 border-r border-border/20 pointer-events-none" style={{ left: `${(i / 8) * 100}%` }}></div>
                    ))}

                    {/* Today indicator vertical thin line (middle of sprint 1) */}
                    <div className="absolute top-0 bottom-0 w-px bg-copper/30 border-dashed border-l border-copper/30 pointer-events-none" style={{ left: `${((0.5) / 8) * 100}%` }}></div>

                    {/* Horizontal Gantt Bar */}
                    <div 
                      style={{
                        gridColumnStart: item.startSprint,
                        gridColumnEnd: item.startSprint + item.durationSprints,
                      }}
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`relative mx-2 p-3.5 rounded-xl cursor-pointer transition-all border select-none group/bar flex flex-col justify-center ${
                        item.status === 'done'
                          ? 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50'
                          : item.status === 'active'
                            ? 'bg-copper/20 border-copper/40 text-copper-300 hover:bg-copper/30 hover:border-copper/60 shadow-[0_0_20px_rgba(201,105,31,0.1)]'
                            : 'bg-surface border-border text-gray-500 hover:bg-surface-hover hover:border-gray-700 hover:text-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold tracking-wide truncate">
                          {item.title}
                        </span>
                        <HelpCircle className="w-3.5 h-3.5 opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                      </div>
                      
                      {/* Active glow dot */}
                      {item.status === 'active' && (
                        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-copper animate-ping"></div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Context Tooltip Panel below the Gantt board */}
        <div className="bg-surface border border-border rounded-2xl p-6 relative overflow-hidden transition-all duration-300 min-h-[140px] flex items-center justify-center">
          <div className="absolute top-0 left-0 w-1.5 h-full copper-gradient"></div>
          {hoveredItem ? (
            <div className="w-full flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 text-[10px] font-mono rounded uppercase tracking-wider ${
                  hoveredItem.status === 'done' 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : hoveredItem.status === 'active'
                      ? 'bg-copper/10 text-copper border border-copper/20'
                      : 'bg-gray-800 text-gray-400 border border-border'
                }`}>
                  {hoveredItem.status === 'done' ? 'Completado' : hoveredItem.status === 'active' ? 'En desarrollo' : 'Planificado'}
                </span>
                <span className="text-xs font-mono text-gray-500">
                  Fase: <strong className="text-gray-400">{hoveredItem.phase}</strong>
                </span>
                <span className="text-xs font-mono text-gray-500">
                  Track: <strong className="text-gray-400 uppercase tracking-widest">{hoveredItem.track}</strong>
                </span>
                <span className="text-xs font-mono text-gray-500">
                  Sprints: <strong className="text-gray-400">{hoveredItem.startSprint} - {hoveredItem.startSprint + hoveredItem.durationSprints - 1}</strong>
                </span>
              </div>
              <h4 className="text-xl font-bold text-white">{hoveredItem.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{hoveredItem.description}</p>
            </div>
          ) : (
            <div className="text-center text-gray-500 font-mono text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-copper" />
              <span>Coloca el cursor sobre cualquier barra para ver el detalle de la tarea del Sprint.</span>
            </div>
          )}
        </div>

        {/* Back button at the bottom */}
        <div className="flex justify-center mt-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 bg-[#1A1A1D] hover:bg-[#232326] text-white border border-border px-8 py-3.5 rounded-xl font-medium font-mono text-sm tracking-wide transition-colors cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-copper" />
            Volver a la Página Principal
          </button>
        </div>
      </main>

      {/* Mini Footer */}
      <footer className="border-t border-border/40 py-8 bg-darker mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-600">
          <span>&copy; 2026 Edgecute. Todos los derechos reservados.</span>
          <span>Actualizado hace: 1 día (Sprint 1 activo)</span>
        </div>
      </footer>
    </div>
  );
}
