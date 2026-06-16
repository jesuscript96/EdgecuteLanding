import React, { useState } from 'react';
import { ArrowLeft, Loader2, CheckCircle2, Mail } from 'lucide-react';

interface LoginUser {
  name: string;
  email: string;
  provider: 'google' | 'discord' | 'email';
}

interface LoginProps {
  onBack: () => void;
  onLoginSuccess: (user: LoginUser) => void;
}

export function Login({ onBack, onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState<'google' | 'discord' | 'email' | null>(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const simulateLogin = (type: 'google' | 'discord' | 'email', userName?: string, userEmail?: string) => {
    setLoading(true);
    setLoginType(type);
    
    const delay = type === 'email' ? 1800 : 1200;
    
    setTimeout(() => {
      setSuccess(true);
      if (type === 'email') {
        setMessage('¡Enlace enviado! Hemos simulado el inicio de sesión.');
      } else {
        setMessage(`Sesión iniciada con ${type === 'google' ? 'Google' : 'Discord'}.`);
      }
      
      setTimeout(() => {
        onLoginSuccess({
          name: userName || 'Trader Pro',
          email: userEmail || 'demo@edgecute.com',
          provider: type,
        });
      }, 1000);
    }, delay);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Por favor introduce un email válido');
      return;
    }
    simulateLogin('email', email.split('@')[0], email);
  };

  return (
    <div className="min-h-screen bg-dark text-gray-300 font-sans antialiased flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Visual Background Elements */}
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" 
        style={{ maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)' }}
      />
      {/* Radial Cobre Glow */}
      <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-copper/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-copper/5 blur-[150px] pointer-events-none" />

      {/* Top Left Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <button 
          onClick={onBack}
          disabled={loading}
          className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-copper transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          /volver
        </button>
      </div>

      {/* Centered Card Container */}
      <div className="max-w-md w-full relative z-10 flex flex-col items-center">
        {/* Brand Header */}
        <div className="flex items-center gap-2 mb-8 cursor-pointer select-none" onClick={onBack}>
          <div className="w-8 h-8 bg-copper text-white flex items-center justify-center font-mono font-bold leading-none transform -skew-x-12">
            E
          </div>
          <span className="font-mono font-bold text-xl tracking-tighter text-white">
            EDGECUTE
          </span>
        </div>

        {/* Login Card */}
        <div className="bg-surface border border-border rounded-2xl p-8 shadow-2xl relative overflow-hidden w-full">
          {/* Top Copper Stripe */}
          <div className="absolute top-0 left-0 w-full h-1.5 copper-gradient"></div>

          {success ? (
            /* Success State screen inside the card */
            <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">¡Acceso concedido!</h2>
              <p className="text-gray-400 text-sm max-w-[280px]">
                {message} Redirigiendo al panel operativo...
              </p>
              <div className="mt-8 flex gap-1 justify-center items-center">
                <span className="w-2 h-2 rounded-full bg-copper animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-copper animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-copper animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          ) : loading ? (
            /* Loading State screen inside the card */
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-12 h-12 text-copper animate-spin mb-6" />
              <h3 className="text-lg font-bold text-white mb-2">Conectando cuenta</h3>
              <p className="text-gray-400 text-sm max-w-[240px]">
                Estableciendo enlace seguro con {loginType === 'google' ? 'Google OAuth2' : loginType === 'discord' ? 'Discord API' : 'servidor de email'}...
              </p>
            </div>
          ) : (
            /* Standard Login Form Screen */
            <div>
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-white mb-2">Acceso a la plataforma</h1>
                <p className="text-gray-400 text-sm">
                  Simulación histórica y backtesting inteligente.
                </p>
              </div>

              {/* Login Buttons */}
              <div className="space-y-3.5 mb-6">
                {/* Google Button */}
                <button
                  onClick={() => simulateLogin('google', 'Carlos Trader', 'carlos.trader@gmail.com')}
                  className="w-full flex items-center justify-center gap-3 bg-[#1A1A1D] border border-border hover:bg-[#232326] hover:border-gray-700 text-white py-3 px-4 rounded-xl font-medium transition-all cursor-pointer group shadow-sm active:scale-[0.98]"
                >
                  <svg className="w-5 h-5 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Continuar con Google</span>
                </button>

                {/* Discord Button */}
                <button
                  onClick={() => simulateLogin('discord', 'Álvaro Sombra', 'alvaro.sombra#1337')}
                  className="w-full flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] border border-[#5865F2] hover:border-[#4752C4] text-white py-3 px-4 rounded-xl font-medium transition-all cursor-pointer group shadow-sm active:scale-[0.98]"
                >
                  <svg className="w-5 h-5 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
                  </svg>
                  <span>Continuar con Discord</span>
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-border flex-1"></div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">o continuar con email</span>
                <div className="h-px bg-border flex-1"></div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      className="w-full bg-[#1A1A1D] border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-copper focus:ring-1 focus:ring-copper transition-all"
                    />
                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200 py-3.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  Enviar enlace de acceso
                </button>
              </form>

              {/* Footer Terms */}
              <p className="text-[11px] text-gray-500 mt-6 text-center leading-relaxed">
                Al continuar aceptas nuestros{' '}
                <a href="#terms" className="text-gray-400 hover:text-copper underline transition-colors">Términos de servicio</a>{' '}
                y{' '}
                <a href="#privacy" className="text-gray-400 hover:text-copper underline transition-colors">Política de privacidad</a>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
