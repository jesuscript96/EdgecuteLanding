import { Navigation } from 'lucide-react';
import tickerAnalysisVideo from '../../assets/tickeranalysis.webm';

export function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
        {/* Left Column: Copy & CTA */}
        <div className="max-w-lg lg:max-w-none mx-auto lg:mx-0 lg:col-span-4">
          <span className="text-xs font-mono text-copper uppercase tracking-widest mb-3 block">
            Asistente de Trading · Scanner · Backtester
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold leading-[1.1] mb-6">
            El asistente para trading en small caps.
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Un asistente pensado para traders de small caps, con un scanner profesional para encontrar tus próximas oportunidades y un backtester sin código para que los sistemáticos validen sus estrategias sin escribir una línea. Todo en una sola plataforma.
          </p>

          <a
            href="https://app.edgecute.com"
            className="w-full flex items-center justify-center bg-copper hover:bg-[#A25215] text-white py-3 rounded-lg font-bold transition-all cursor-pointer shadow-[0_4px_24px_rgba(201,105,31,0.25)] hover:shadow-[0_6px_32px_rgba(201,105,31,0.4)]"
          >
            Entrar a la app
          </a>
          <p className="text-[11px] text-gray-500 mt-4 text-center">
            app.edgecute.com
          </p>
        </div>

        {/* Right Column: Platform Video Mockup */}
        <div className="relative lg:col-span-8 w-full lg:w-[115%] lg:origin-left">
          {/* Brutalist terminal lines in background */}
          <div className="absolute -inset-4 bg-surface/50 border border-border/50 rounded-2xl transform rotate-2 -z-10"></div>

          <div className="bg-surface border border-border rounded-xl shadow-2xl overflow-hidden aspect-video relative flex flex-col group">
            {/* Fake macOS / Browser header */}
            <div className="bg-[#1A1A1D] border-b border-border px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
              </div>
              <div className="mx-auto bg-dark border border-border rounded text-[10px] font-mono px-3 py-1 text-gray-500 flex items-center gap-2">
                <Navigation className="w-3 h-3" />
                app.edgecute.com/research/SPY
              </div>
            </div>

            {/* Autoplay Video Content */}
            <div className="flex-1 bg-darker relative overflow-hidden">
              <video
                  src={tickerAnalysisVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
