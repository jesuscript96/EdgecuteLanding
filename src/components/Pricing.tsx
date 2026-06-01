import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Free',
    target: 'Onboarding',
    price: '€0',
    frequency: '/mes',
    description: 'Para probar la velocidad.',
    features: [
      { text: '3 meses de data histórica', status: 'Disponible' },
      { text: 'Ticker research limitado', status: 'Disponible' },
      { text: 'Journal básico', status: 'Fase 2' },
      { text: 'Screener básico', status: 'Fase 2' }
    ],
    buttonText: 'Empezar gratis',
    buttonVariant: 'outline'
  },
  {
    name: 'Pro',
    target: 'La Sombra',
    price: '€49',
    frequency: '/mes',
    subtitle: '€39/mes anual (-20%)',
    description: 'Todo lo que necesitas en el intradía.',
    features: [
      { text: 'Ticker research completo', status: 'Disponible' },
      { text: '10 backtests/mes', status: 'Disponible' },
      { text: 'Journal completo', status: 'Fase 2' },
      { text: 'Screener avanzado', status: 'Fase 2' },
      { text: 'Dilution data integrado', status: 'Fase 2' }
    ],
    buttonText: 'Elegir Pro',
    buttonVariant: 'copper',
    highlight: true
  },
  {
    name: 'Elite',
    target: 'El Cazador',
    price: '€99',
    frequency: '/mes',
    subtitle: '€79/mes anual (-20%)',
    description: 'El arsenal quant sin código.',
    features: [
      { text: 'Todo lo de Pro', status: 'Disponible' },
      { text: 'Backtester ilimitado', status: 'Disponible' },
      { text: 'Monte Carlo Bootstrap', status: 'Fase 3' },
      { text: 'Walk-forward & robustez', status: 'Fase 3' },
      { text: 'Portfolios + VaR/CVaR', status: 'Fase 3' }
    ],
    buttonText: 'Elegir Elite',
    buttonVariant: 'white'
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-darker border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Pricing simple.</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            El backtester avanzado con 20 años de minute data de Polygon. <br className="hidden md:block"/>
            Pagas al mes lo que FlashResearch te cobra solo por su scanner.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative bg-surface rounded-2xl p-8 flex flex-col h-full border ${
                plan.highlight ? 'border-copper shadow-[0_0_30px_rgba(201,105,31,0.1)]' : 'border-border'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-copper text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full">
                  Más popular
                </div>
              )}
              
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-bold text-white">{plan.name}</h3>
                  <span className="font-mono text-xs text-copper bg-copper/10 px-2 py-1 rounded">
                     {plan.target}
                  </span>
                </div>
                
                <div className="mb-2">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.frequency}</span>
                </div>
                {plan.subtitle ? (
                  <p className="text-sm font-mono text-gray-400">{plan.subtitle}</p>
                ) : (
                  <div className="h-5"></div>
                )}
                
                <p className="text-gray-400 mt-4 h-10">{plan.description}</p>
              </div>

              <div className="mb-8 flex-1">
                <div className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Incluye:</div>
                <ul className="space-y-4">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center justify-between gap-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-copper shrink-0" />
                        <span className="text-sm leading-tight">{feat.text}</span>
                      </div>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 ${
                        feat.status === 'Disponible' 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : feat.status === 'Fase 2'
                            ? 'bg-copper/10 text-copper border border-copper/20'
                            : 'bg-gray-800 text-gray-400 border border-border'
                      }`}>
                        {feat.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                className={`w-full py-3.5 rounded-lg font-semibold transition-colors mt-auto ${
                  plan.buttonVariant === 'copper' 
                    ? 'bg-copper hover:bg-[#A25215] text-white' 
                    : plan.buttonVariant === 'white'
                      ? 'bg-white hover:bg-gray-200 text-black'
                      : 'bg-transparent border border-border hover:bg-border text-white'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
