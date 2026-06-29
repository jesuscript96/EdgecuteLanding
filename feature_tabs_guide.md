# Guía Completa de Implementación: Componente de Pestañas Autoreproducibles (`FeatureTabs`)

Esta guía te proporcionará el código fuente y las explicaciones detalladas para montar el componente de pestañas (tabs) que avanza automáticamente, incluye una barra de progreso visual integrada dentro del botón activo, y realiza transiciones premium utilizando **Framer Motion**. Además, está adaptado para soportar tanto **videos** como **imágenes**.

---

## 🛠️ Requisitos Previos e Instalación

Para que el componente funcione correctamente, asegúrate de tener instaladas las siguientes librerías de React e iconos:

```bash
# Instalación de Framer Motion (o 'motion/react' si usas versiones recientes de React 19)
npm install framer-motion lucide-react

# O si estás usando el nuevo entrypoint para React 19:
npm install motion
```

---

## 📋 Estructura de Datos (TypeScript)

Define la estructura de los datos que alimentarán tu componente. Es recomendable crear una interfaz para asegurar que todas las secciones cuenten con los campos necesarios (incluyendo soporte opcional para video).

```typescript
export interface TabItem {
  slug: string;
  index: string;      // Ej: "01", "02"
  name: string;       // Título corto del tab (Ej: "Producto Digital")
  tagline: string;    // Título llamativo principal (Ej: "Software a medida...")
  intro: string;      // Párrafo descriptivo
  image?: string;     // URL de la imagen de fondo/lado
  video?: string;     // URL del video (MP4/WebM) de fondo/lado
  link: string;       // Enlace de destino al hacer clic en el botón de acción
}
```

---

## 💻 Código de Componente Autocontenido (`AutoplayTabs.tsx`)

A continuación se muestra el código completo del componente. Hemos removido dependencias propietarias o librerías externas complejas (como GSAP) reemplazándolas por animaciones nativas de **Framer Motion** para que puedas copiarlo y pegarlo directamente en cualquier proyecto React:

```tsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Nota: Cambiar a "motion/react" si usas React 19 + Motion
import { ArrowRight } from "lucide-react";

// 1. Duración del autoplay por pestaña en milisegundos (8000ms = 8 segundos)
const AUTOPLAY_INTERVAL = 8000;

export interface TabItem {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  intro: string;
  image?: string;
  video?: string;
  link: string;
}

interface AutoplayTabsProps {
  items: TabItem[];
  title?: string;
  subtitle?: string;
}

export function AutoplayTabs({ items, title, subtitle }: AutoplayTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Referencias para gestionar el tiempo exacto y frames de animación sin lagunas de CPU
  const startTimeRef = useRef<number>(Date.now());
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    // Cada vez que cambia el índice activo (por clic o autoplay), reiniciamos el cronómetro
    startTimeRef.current = Date.now();
    setProgress(0);

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      // Calculamos el porcentaje transcurrido (de 0 a 100)
      const newProgress = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= AUTOPLAY_INTERVAL) {
        // Al completar el tiempo, pasamos de manera cíclica a la siguiente pestaña
        setActiveIndex((prev) => (prev + 1) % items.length);
        startTimeRef.current = Date.now();
      } else {
        // Continuamos solicitando frames de animación
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);

    // Limpieza de subscripciones al desmontar el componente o cambiar de tab
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeIndex, items.length]);

  const activeItem = items[activeIndex];

  // Si no hay datos, evitamos errores de renderizado
  if (!items || items.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-zinc-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabecera Opcional */}
        {(title || subtitle) && (
          <div className="mb-14 max-w-3xl">
            {subtitle && (
              <span className="block font-mono text-xs tracking-[0.35em] uppercase text-zinc-400 mb-4">
                / {subtitle}
              </span>
            )}
            {title && (
              <h2 className="text-4xl md:text-6xl font-normal text-white tracking-tight leading-[1.1] text-balance">
                {title}
              </h2>
            )}
          </div>
        )}

        {/* 2. Botones / Pestañas de Navegación con Barra de Carga */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-4 border-b border-zinc-800">
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.slug}
                onClick={() => setActiveIndex(index)}
                className={`flex-none px-5 py-2.5 rounded-sm text-sm font-medium transition-all relative overflow-hidden uppercase tracking-wider ${
                  isActive
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "bg-transparent text-zinc-400 hover:bg-zinc-800/40 hover:text-white"
                }`}
              >
                {/* Texto por encima de la barra de carga */}
                <span className="relative z-10">{item.name}</span>
                
                {/* Capa de barra de progreso */}
                {isActive && (
                  <div className="absolute inset-0 z-0 bg-zinc-700 pointer-events-none">
                    <div
                      className="h-full bg-zinc-800 transition-none"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* 3. Panel de Contenido con Transición (AnimatePresence) */}
        <div className="relative bg-black rounded-lg overflow-hidden h-[600px] lg:h-[700px] flex items-center shadow-2xl border border-zinc-800">
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
              <div className="w-full lg:w-5/12 p-8 md:p-16 flex flex-col justify-center z-20 bg-gradient-to-r from-black via-black/90 to-transparent lg:bg-black">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase mb-4 block">
                    {activeItem.index} — {activeItem.name}
                  </span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight mb-6 text-balance">
                    {activeItem.tagline}
                  </h3>
                  <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10 max-w-md">
                    {activeItem.intro}
                  </p>

                  <a
                    href={activeItem.link}
                    className="inline-flex items-center gap-2 text-white font-medium hover:text-zinc-300 transition-colors group text-sm uppercase tracking-wider"
                  >
                    Ver más
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>

              {/* Lado Derecho: Contenido Multimedia (Imagen o Video) */}
              <div className="absolute lg:relative inset-0 lg:inset-auto lg:w-7/12 h-full z-10 flex items-center justify-center bg-zinc-950">
                {/* Degradado oscuro para móviles (asegura legibilidad del texto superior) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent lg:hidden z-20" />
                
                <div className="w-full h-full relative overflow-hidden">
                  {activeItem.video ? (
                    // Reproductor de Video
                    <motion.video
                      key={`video-${activeIndex}`}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      src={activeItem.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover object-center grayscale-[20%] opacity-60 lg:opacity-100"
                    />
                  ) : activeItem.image ? (
                    // Imagen Estática
                    <motion.img
                      key={`image-${activeIndex}`}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 4, ease: "easeOut" }}
                      src={activeItem.image}
                      alt={activeItem.name}
                      className="w-full h-full object-cover object-center grayscale-[20%] opacity-60 lg:opacity-100"
                    />
                  ) : null}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
```

---

## 🎨 CSS Auxiliar Requerido

El componente utiliza la clase `hide-scrollbar` para ocultar la barra de desplazamiento horizontal de las pestañas en móviles sin romper el scroll táctil nativo. Añade las siguientes reglas en tu archivo CSS global (ej. `globals.css` o `index.css`):

```css
/* Ocultar barra de desplazamiento manteniendo funcionalidad de scroll */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari y Opera */
}
```

---

## 🔍 Explicación Detallada de la Lógica Clave

### 1. Animación del Cargador Visual (ProgressBar)
En lugar de utilizar un `setInterval` común (que suele desincronizarse del framerate del monitor y consumir CPU innecesariamente cuando la pestaña no está visible), este componente utiliza **`requestAnimationFrame`**:
- **Medición de Tiempo Real**: Usamos `Date.now() - startTimeRef.current`. Esto asegura que si el navegador ralentiza el renderizado, la barra mostrará exactamente el tiempo transcurrido, previniendo bugs visuales de velocidad irregular.
- **Auto-reinicio al Interactuar**: Al incluir `activeIndex` como dependencia en el `useEffect`, si el usuario hace clic manualmente en un botón, React destruye el efecto anterior (llamando a `cancelAnimationFrame`), y ejecuta el nuevo efecto desde `0ms`, logrando que la barra comience a llenarse desde cero en el tab clicado de manera fluida.
- **Efecto Visual de Llenado**: El botón activo cambia su color de fondo a un gris intermedio (`bg-zinc-700`). Sobre él, renderizamos la barra con el ancho dinámico `${progress}%` coloreada en el color original del botón (`bg-zinc-800`). Esto da la ilusión visual de que la barra se va "borrando" o "llenando" de izquierda a derecha.

### 2. Transición Animada entre Contenidos (`AnimatePresence`)
- El contenedor utiliza `AnimatePresence` de Framer Motion con la propiedad `mode="popLayout"`. Esto evita el molesto salto de layout (donde un elemento se muestra temporalmente debajo de otro mientras se desvanece), permitiendo que el elemento saliente mantenga una posición absoluta y el entrante ocupe el mismo espacio de forma simultánea.
- La animación combina `y` (desplazamiento vertical), `opacity` (opacidad) y `scale` (escala).
  - Al entrar: El panel se desplaza hacia arriba (`y: 30` -> `0`), se vuelve opaco y se agranda ligeramente.
  - Al salir: El panel sigue subiendo (`0` -> `y: -30`), se desvanece y crece un poco más, imitando un zoom en profundidad cinematográfico.

### 3. Configuración Óptima para Videos Autoreproducibles
Para asegurar que los videos se reproduzcan automáticamente sin bloquearse en dispositivos móviles (iOS/Android) y navegadores modernos (Safari/Chrome), el elemento `<video>` requiere obligatoriamente estos atributos:
- **`autoPlay`**: Inicia la reproducción de manera inmediata.
- **`muted`**: Silencia el video (los navegadores modernos prohíben el autoPlay de videos con audio activo).
- **`playsInline`**: Evita que en iOS el video se abra a pantalla completa en el reproductor nativo del sistema, permitiendo que permanezca integrado en el diseño del tab.
- **`loop`**: Hace que el video se repita indefinidamente mientras la pestaña esté seleccionada.
- **`key={\`video-\${activeIndex}\`}`**: Usamos un `key` dinámico basado en el índice. Esto obliga a React a recrear el tag de video cuando el tab cambia, forzando la descarga e inicio inmediato del nuevo archivo de video en lugar de intentar reusar el elemento multimedia previo.
