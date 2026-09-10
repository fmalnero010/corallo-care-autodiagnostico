# Formulario de piel — Corallo Care

Formulario standalone (React + Vite) para Corallo Care: cuestionario de piel
para mujer (8 preguntas) y hombre (5 preguntas), cálculo del diagnóstico en
el servidor y aviso del resultado como lead interno por email a Anto
(la dueña) mediante una función serverless de Vercel.

**Importante:** a propósito, este formulario no se presenta como un
autodiagnóstico ni como un test de personalidad de skincare — no dice en
ningún lado "descubrí tu piel", no explica el porqué diagnóstico de cada
pregunta, y la persona que lo completa nunca ve el resultado. Todo el
desglose interpretativo (biotipo/sensibilidad/hidratación) va solo por
mail a Anto; en pantalla, quien lo completa solo ve una confirmación
neutra al final. Ver `src/components/ResultStep.tsx` y
`server/send-result.ts`.

## Stack

- **React 19 + Vite + TypeScript**
- **Zustand** — estado del wizard (género, paso actual, respuestas, contacto)
- **Zod** — validación del formulario de contacto y del payload de la API
- **TanStack Form** — formulario de contacto (solo nombre)
- **Resend** — envío del email de lead desde la función serverless (`/api/send-result`)

## Lógica de diagnóstico

La lógica en `src/logic/diagnose.ts` es un **puerto directo** de
`obtainResult()` / `obtainMenResult()` del JavaScript original de
`/autodiagnostico` (verificado condición por condición contra ese código
fuente), y además **verificado exhaustivamente** contra las 8.192
combinaciones de mujer y 1.152 de hombre provistas: 0 discrepancias en
ambos casos.

- **Mujer** (`P1`-`P8`): biotipo por conteo de A/B/C/D en `P1`-`P5` (empate →
  gana A > B > C > D), sensibilidad por `P6`, hidratación por `P7`+`P8`
  (`BB` = Hidratada, cualquier otra combinación = Deshidratada). Si el
  biotipo es Mixta o Alípida y da Hidratada, esa palabra se omite (no existen
  "Mixta Hidratada" ni "Alípida Hidratada").
- **Hombre** (`P1`-`P5`): rama Joven/Madura por edad (`P1`), y dentro de cada
  rama, condiciones puntuales sobre `P2`-`P5` para Grasa/Acneica (Joven) o
  Grasa/Grasa Sensible (Madura); el resto cae en Mixta.

El texto de preguntas y opciones (`src/data/questions.ts`) es prácticamente
literal del sitio original (arrays `questions` / `manQuestions` del JS) — se
corrigieron dos inconsistencias de tipeo ("Si" → "Sí" cuando el resto de las
opciones de la misma pregunta llevan tilde, y puntuación final pareja entre
mujer/hombre), que no afectan la lógica porque `diagnose.ts` opera sobre
`letter`, nunca sobre el texto. El `stepLabel` de cada pregunta viene del
sitio (`_textList` / `_menTextList`); `helper` es copy propio, un tip
práctico para responder la pregunta (a propósito no explica el porqué
diagnóstico de cada una — ver nota de arriba).

## Diseño y UX

Tras una auditoría de UX/UI de dos lecturas independientes (ver
`src/logic/diagnose.ts` para la lógica, esto es solo la experiencia), se
rediseñó todo el front sobre un sistema de diseño propio en vez del scaffold
por defecto de Vite:

- **Tokens** (`src/index.css`): paleta cálida ciruela/hueso —no el violeta
  SaaS por defecto—, con un tono por familia de biotipo (Mixta/Grasa/
  Seborreica/Alípida), tipografía Piazzolla (display) + Archivo (texto),
  escalas de spacing/radio/sombra, y las tres variantes de tema (claro,
  oscuro por sistema, oscuro forzado).
- **El resultado nunca se muestra en pantalla** (ver nota arriba): el
  desglose interpretativo por rasgo (biotipo, sensibilidad, hidratación)
  vive en `src/data/results.ts` pero solo se usa para armar el mail a Anto
  (`server/send-result.ts`) — la persona que completa el formulario solo ve
  una pantalla de agradecimiento neutra.
- **Bugs de estado corregidos**: "Volver" ahora restaura la opción elegida
  (antes no leía el store), el progreso se persiste en `sessionStorage`
  (antes un refresh perdía el diagnóstico), y cada paso tiene un fallback
  visible en vez de `return null` (antes dejaba una página en blanco).
- **Accesibilidad**: foco movido al encabezado en cada cambio de paso,
  `aria-live` en el contenido principal, barra de progreso con
  `aria-valuetext`, error de formulario asociado al input vía
  `aria-describedby`/`aria-invalid`.
- **Cola de reintento** (`src/api/pendingLeads.ts`): si el envío del mail
  falla, el payload queda en `localStorage` y se reintenta en la próxima
  carga de la app, en vez de perderse en silencio.

El informe completo de la auditoría (54 hallazgos, priorizados) fue el
insumo de este trabajo.

## Flujo de la app

1. Pantalla de bienvenida (`WelcomeStep`) con un único CTA ("Comenzar").
2. Elegís género (mujer/hombre).
3. Respondés el cuestionario paso a paso (una pregunta por pantalla).
4. Al responder la última pregunta se pide el nombre.
5. Se muestra un agradecimiento cálido pero neutro ("¡Gracias, [nombre]!
   Fue un gusto conocerte un poco más.") y, en paralelo y en silencio, se
   dispara `POST /api/send-result`.

La función serverless **calcula el diagnóstico en el servidor** a partir de
las respuestas recibidas y manda **un único email, a la casilla interna**
(`EMAIL_TO_INTERNAL`) con el nombre, el desglose interpretativo del
resultado y el detalle de respuestas — es el mail de Anto, la dueña. Quien
completa el formulario no ve el diagnóstico en ningún momento ni recibe
ninguna confirmación relacionada al mail. Si el envío falla, no afecta su
experiencia — igual ve la confirmación neutra, y el intento queda en una
cola de reintento local (`src/api/pendingLeads.ts`).

## Configuración

```bash
npm install
cp .env.example .env
```

Completá `.env`:

| Variable | Descripción |
| --- | --- |
| `RESEND_API_KEY` | API key de [Resend](https://resend.com/api-keys) |
| `EMAIL_FROM` | Remitente verificado en Resend (dominio propio) |
| `EMAIL_TO_INTERNAL` | Casilla interna que recibe cada lead — **obligatoria**, es el único destinatario |

En Vercel, cargá las mismas variables en **Project Settings → Environment
Variables**.

## Desarrollo local

```bash
npm run dev
```

Levanta solo el front (Vite). Las llamadas a `/api/send-result` van a fallar
con 404 porque Vite no sirve funciones serverless — es esperable, la UI
maneja el error mostrando el resultado igual, sin bloquear al usuario.

Para probar el flujo completo (front + función serverless) local, primero
generá el bundle de la función y después levantá `vercel dev`:

```bash
npm run build:api
npm i -g vercel   # una sola vez
vercel dev
```

## Build y deploy

```bash
npm run build
```

Esto corre, en orden: type-check (`tsc -b`), build del front (`vite build`)
y `build:api`, que empaqueta `server/send-result.ts` en un único archivo
autocontenido (`api/send-result.js`) con esbuild.

**Por qué la función se empaqueta así, y por qué el resultado SÍ se
commitea** (a diferencia de `dist/`): Vercel no bundlea las funciones de
`/api` que escriben `import` relativos a otras carpetas del repo — las
transpila archivo por archivo y las corre como ESM nativo de Node, que (a
diferencia de `require`) no adivina extensiones de archivo. Un
`import { x } from '../src/schemas'` sin bundlear termina en
`ERR_MODULE_NOT_FOUND` en producción aunque funcione perfecto en local.
Además, Vercel parece decidir qué funciones existen mirando el repo tal
como está en git, no el resultado del build — un `api/send-result.js`
generado solo durante el build nunca llegó a ser detectado como función
(404). Por eso el código fuente vive en `server/send-result.ts` (no en
`api/`, para que Vercel no lo detecte por su cuenta) y **el bundle generado
en `api/send-result.js` se commitea**: así existe en el repo desde el
checkout, sin depender de en qué momento corre el build.

⚠️ Si editás `server/send-result.ts`, corré `npm run build:api` y commiteá
el `api/send-result.js` actualizado junto con tu cambio — `npm run build`
lo regenera solo, pero como es un archivo trackeado, un cambio sin
regenerar quedaría desactualizado en el próximo deploy.

### Vercel (deploy recomendado — con envío de email)

Detecta Vite y la carpeta `api/` automáticamente:

```bash
vercel deploy --prod
```

### GitHub Pages (solo demo estática, sin envío de email)

Hay un workflow (`.github/workflows/deploy-pages.yml`) que compila y
publica `dist/` en cada push a `main`. Para activarlo una sola vez: **Settings
→ Pages → Build and deployment → Source: "GitHub Actions"** en el repo.

⚠️ GitHub Pages solo sirve archivos estáticos — **no puede correr la función
serverless**. El cuestionario y el cálculo del diagnóstico funcionan igual
(son 100% client-side), pero el envío de email va a fallar siempre ahí (la
UI lo maneja mostrando el resultado igual, sin bloquear). Para tener el
flujo completo con email, el deploy tiene que ser en Vercel.

## Estructura

```
src/
  types.ts                tipos compartidos (Gender, Letter, Question, ...)
  data/questions.ts        preguntas, opciones y helper copy (mujer y hombre)
  data/results.ts           contenido interpretativo por rasgo del resultado
  logic/diagnose.ts         lógica de diagnóstico (verificada exhaustivamente)
  schemas.ts                esquemas Zod (contacto y payload de la API)
  store/useQuizStore.ts     estado del wizard (Zustand + persist en sessionStorage)
  hooks/useAutoFocus.ts     foco accesible al cambiar de paso
  api/sendResult.ts         cliente fetch hacia /api/send-result
  api/pendingLeads.ts       cola de reintento local para envíos fallidos
  components/               Header, Footer, Icons, EmptyState y los pasos del wizard
server/
  send-result.ts            código fuente de la función serverless (envío con Resend)
api/
  package.json              fuerza CommonJS para lo que Vercel deploya de esta carpeta
  send-result.js             bundle generado por `npm run build:api` — SÍ se commitea
```
