# Guía de Trabajo con el Proyecto Edgecute Landing

Esta guía es para ti, el encargado de marketing. No necesitas saber programar: Claude Code será tu brazo técnico y ejecutará todo lo que implique terminal por ti.

---

## 1. Preparación Inicial (solo la primera vez)

### Crear la carpeta del proyecto

1. Anda a tu Escritorio.
2. Clic derecho → Nueva carpeta.
3. Ponle de nombre `EdgecuteLanding`.

### Abrir el proyecto con Claude Code

1. Abre Claude Code.
2. Usa la opción de abrir carpeta (File > Open Folder, o arrastra la carpeta `EdgecuteLanding` directamente sobre Claude Code).
3. Dentro de Claude Code, escribe el siguiente prompt. Esto hará que el agente clone el repositorio y configure todo:

```
Clona el repositorio https://github.com/jesuscript96/EdgecuteLanding.git dentro de esta carpeta.
Luego instala las dependencias con npm install.
```

El agente se encargará de ejecutar los comandos de terminal necesarios.

### Prompt de setup: enseñarle las reglas del diseño

Una vez que el proyecto está clonado, pega este prompt en Claude Code. Esto configura al agente para que respete el diseño actual del sitio:

```
A partir de ahora, al trabajar en este proyecto, cumple siempre estas reglas:

REGLAS DE DISEÑO:
- El sitio está en español (idioma principal).
- Tema oscuro premium con acentos cobrizos (#D87A3D).
- Fuentes: Inter (texto general) y Roboto Mono (etiquetas y navegación). La palabra "Edgecute" va con General Sans weight 700.
- Animaciones con la librería "motion" (importada como "motion/react").
- Íconos exclusivamente de "lucide-react". No uses emojis ni otros sets de íconos.
- Componentes como funciones exportadas con nombre (ej: export function MiComponente), no export default.
- Las tarjetas usan: bg-surface border border-border rounded-2xl.
- El espaciado y tipografía son mobile-first: mobile (1 columna) → sm (640px) → md (768px) → lg (1024px+).
- Gradiente cobrizo disponible via la clase CSS `.copper-gradient`.
- Usa clases utilitarias de Tailwind v4 para todo el diseño. No escribas CSS a mano a menos que sea estrictamente necesario.

REGLAS DE DESARROLLO:
- Cada cambio debe ser responsive en todos los breakpoints: sm, md, lg.
- Verifica con `npm run lint` que no haya errores de TypeScript antes de considerar un cambio terminado.
- Si creas un componente nuevo, ubícalo en `src/components/`.
- Mantén el patrón de estado local con useState/useEffect; no agregues librerías de estado global.
- No modifiques el archivo `vite.config.ts` ni los archivos de configuración sin preguntar.
```

---

## 2. Flujo de Trabajo Diario

### Arrancar el proyecto en local

Dentro del chat de Claude Code, simplemente escribe:

```
Arranca el proyecto en local con npm run dev
```

El agente ejecutará el comando. El sitio estará disponible en `http://localhost:3000`. Ábrelo en tu navegador para ver los cambios en tiempo real.

### Detener el servidor

Cuando termines de trabajar, dile a Claude Code:

```
Detén el servidor de desarrollo
```

### Comprobar cambios visualmente

1. Con el servidor corriendo, abre `http://localhost:3000` en Chrome.
2. Para probar diseño responsive, abre las DevTools (F12 o clic derecho → Inspeccionar) y usa el botón de "Toggle device toolbar" (el ícono de tablet/teléfono). Puedes simular distintos tamaños: iPhone, iPad, laptop.
3. **IMPORTANTE**: Siempre verifica que lo nuevo se vea bien en móvil, tablet y desktop antes de subir cambios.

---

## 3. Cómo Crear y Ejecutar un PRD con Claude Code

El PRD (Product Requirements Document) es el documento donde describes qué quieres cambiar o agregar al sitio. Lo vas a construir en conjunto con Claude.

### Paso 1: Escribe tu propuesta inicial

Dentro de Claude Code, escribe algo como:

```
Quiero agregar una sección de testimonios de traders al landing page. 
La idea es mostrar 4-5 tarjetas con foto, nombre, país y una cita textual. 
Quiero que se sienta premium y siga el estilo oscuro del sitio. 
Dame un PRD con lo que propongo y analiza si hay componentes existentes que pueda reutilizar.
```

### Paso 2: Deja que Claude analice el código

Claude va a leer los componentes actuales, entender los patrones de diseño, y te devolverá un PRD refinado con:

- Lo que propones (tu idea original)
- Lo que ya existe en el código que puedes reutilizar (tarjetas, estilos, animaciones)
- Cómo implementarlo respetando el diseño actual
- Dependencias (si necesita librerías nuevas)
- Responsive behavior (cómo se comportará en móvil/tablet/desktop)

### Paso 3: Perfecciona el PRD juntos

Responde a Claude con ajustes. Por ejemplo: "Mejor quiero 6 tarjetas y que tengan un carrusel automático". Claude actualizará el PRD.

Cuando estés satisfecho con el PRD, dile a Claude que lo guarde como un archivo dentro del proyecto (ej: `prd/testimonios.md`).

### Paso 4: Ejecuta el PRD completo

Usa el comando `/goal` para que Claude lo implemente de principio a fin:

```
/goal Ejecutar completamente el PRD que está en prd/testimonios.md
```

Claude se encargará de todo:
- Leer el PRD
- Crear los archivos necesarios
- Integrar el nuevo componente en App.tsx
- Verificar que sea responsive
- Pasar el lint (`npm run lint`)

**Si `/goal` no funciona como comando**, simplemente dile:

```
Ejecuta completamente el PRD que está en prd/testimonios.md. 
Haz todo lo necesario hasta que el cambio esté funcionando y pasando lint.
```

---

## 4. Cómo Hacer Commit y Push (Subir Cambios)

Una vez que verificaste que los cambios se ven bien en local, dile a Claude Code que los suba. El agente ejecuta todos los comandos de git por ti.

### Flujo completo en el chat

Simplemente escribe:

```
Revisa los cambios con git status, haz commit con un mensaje descriptivo y haz push a GitHub.
```

Si querés darle vos el mensaje del commit:

```
Haz commit con el mensaje "feat: agregar sección de testimonios de traders" y haz push.
```

**Formato recomendado para mensajes de commit:**
- `feat:` para funcionalidad nueva (ej: `feat: nueva sección de precios`)
- `fix:` para arreglar algo (ej: `fix: corregir texto cortado en móvil`)
- `style:` para cambios visuales (ej: `style: ajustar espaciado de tarjetas`)

---

## 5. Checklist Antes de Subir Cualquier Cambio

Repasá esto antes de hacer push:

- [ ] El diseño se ve bien en desktop (1920px)
- [ ] El diseño se ve bien en tablet (768px)
- [ ] El diseño se ve bien en móvil (375px)
- [ ] No hay errores de TypeScript (pedile a Claude que corra `npm run lint`)
- [ ] El cambio sigue el estilo visual del sitio (colores cobrizos, tema oscuro, tipografía correcta)
- [ ] Si agregaste un nuevo componente, está en `src/components/`
- [ ] Probaste en `http://localhost:3000` y todo funciona

---

## 6. Resumen: qué decirle a Claude Code en cada momento

| Situación | Qué escribir en el chat |
|---|---|
| Primera vez | `Clona el repositorio https://github.com/jesuscript96/EdgecuteLanding.git dentro de esta carpeta. Luego instala las dependencias con npm install.` |
| Arrancar a trabajar | `Arranca el proyecto en local con npm run dev` |
| Proponer una idea | `Quiero [describir la idea]. Dame un PRD analizando el código actual.` |
| Ejecutar un PRD | `/goal Ejecutar completamente el PRD que está en prd/mi-idea.md` |
| Verificar cambios | `Corre npm run lint para verificar que no haya errores.` |
| Subir cambios | `Haz commit con el mensaje "feat: descripción" y haz push.` |
| Detener el servidor | `Detén el servidor de desarrollo` |

---

Si algo falla o no entendés algo, preguntale a Claude en el chat. No necesitás saber de código: solo describí lo que querés en español y Claude lo traduce a implementación.
