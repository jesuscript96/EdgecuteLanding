import { Play, Navigation, Mail } from 'lucide-react';
import heroVideo from '../../assets/EdgecuteHero.webm';

export function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
        {/* Left Column: Copy & Form */}
        <div className="max-w-lg lg:max-w-none mx-auto lg:mx-0 lg:col-span-4">
          <h1 className="text-4xl lg:text-5xl font-bold leading-[1.1] mb-6">
            Inteligencia y backtesting para small caps.
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Scanner, journal, ticker research, dilution y backtester profesional no-code. En español. Por menos de lo que pagas hoy por una sola de esas herramientas.
          </p>

          {/* Claude-style Login/Signup Card */}
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 copper-gradient"></div>
            
            <button className="w-full flex items-center justify-center gap-3 bg-[#1A1A1D] border border-border hover:bg-[#232326] text-white py-3 rounded-lg font-medium transition-colors mb-5">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continuar con Google
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div className="h-px bg-border flex-1"></div>
              <span className="text-[11px] font-mono text-gray-500 uppercase">o con email</span>
              <div className="h-px bg-border flex-1"></div>
            </div>

            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="tu@email.com" 
                className="w-full bg-[#1A1A1D] border border-border rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-copper transition-colors"
              />
              <button className="w-full bg-white text-black hover:bg-gray-200 py-3 rounded-lg text-sm font-semibold transition-colors">
                Crear cuenta gratis
              </button>
            </div>
            
            <p className="text-[11px] text-gray-500 mt-5 text-center">
              Al continuar aceptas nuestros términos.
            </p>
          </div>
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
                src={heroVideo}
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
