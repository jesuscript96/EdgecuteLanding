import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [discord, setDiscord] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setName('');
      setEmail('');
      setDiscord('');
      setWhatsapp('');
      setErrorMessage('');
      setTimeout(() => nameRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && status !== 'submitting') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose, status]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          discord: discord.trim(),
          whatsapp: whatsapp.trim(),
        }),
      });

      if (!res.ok) throw new Error('Error al enviar');

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Hubo un error al enviar. Inténtalo de nuevo.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget && status !== 'submitting') onClose(); }}
        >
          <div className="absolute inset-0 bg-dark/90 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 copper-gradient" />

            <button
              onClick={onClose}
              disabled={status === 'submitting'}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-surface-hover transition-colors cursor-pointer disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 md:p-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-copper/10 border border-copper/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-copper" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
                  Ya perteneces a la comunidad de Edgecute
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Vas a tener privilegios en forma de funcionalidades beta y descuentos.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-copper bg-copper/5 border border-copper/10 px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Solicitud recibida
                </div>
                <button
                  onClick={onClose}
                  className="mt-8 bg-copper hover:bg-[#A25215] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </motion.div>
            ) : (
              <div className="p-8 md:p-10">
                <div className="mb-6">
                  <span className="text-xs font-mono text-copper uppercase tracking-widest block mb-3">
                    Beta Privada
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
                    Edgecute está en beta privada
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    El acceso se entrega personalmente. Rellena el formulario y te contactaremos.
                  </p>
                </div>

                <div className="bg-copper/5 border border-copper/10 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-copper/20 flex items-center justify-center shrink-0 mt-px">
                    <span className="text-[10px] text-copper font-bold">%</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    <span className="text-copper font-semibold">Descuentos vitalicios</span> para los primeros que accedan a la plataforma como early adopters.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1.5">
                      Nombre / Alias
                    </label>
                    <input
                      ref={nameRef}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Tu nombre o alias"
                      className="w-full bg-[#1A1A1D] border border-border rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-copper transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1.5">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="tu@email.com"
                      className="w-full bg-[#1A1A1D] border border-border rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-copper transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1.5">
                      Discord
                    </label>
                    <input
                      type="text"
                      value={discord}
                      onChange={(e) => setDiscord(e.target.value)}
                      placeholder="@usuario"
                      className="w-full bg-[#1A1A1D] border border-border rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-copper transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1.5">
                      WhatsApp
                    </label>
                    <input
                      type="text"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full bg-[#1A1A1D] border border-border rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-copper transition-colors"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-xs">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting' || !name.trim() || !email.trim()}
                    className="w-full bg-copper hover:bg-[#A25215] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Solicitar acceso
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
