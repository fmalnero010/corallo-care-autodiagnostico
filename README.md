# Autodiagnóstico de piel — LACA Cosmética Profesional

Formulario standalone (React + Vite) que reproduce la lógica de
`/autodiagnostico` de LACA: cuestionario de piel para mujer (8 preguntas) y
hombre (5 preguntas), cálculo del diagnóstico en el cliente y envío del
resultado por email mediante una función serverless de Vercel.

## Stack

- **React 19 + Vite + TypeScript**
- **Zustand** — estado del wizard (género, paso actual, respuestas, contacto)
- **Zod** — validación del formulario de contacto y del payload de la API
- **TanStack Form** — formulario de contacto (nombre + email)
- **Resend** — envío de emails desde la función serverless (`/api/send-result`)

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

El texto de preguntas y opciones (`src/data/questions.ts`) es literal del
sitio original (arrays `questions` / `manQuestions` del JS), incluyendo
alguna inconsistencia de puntuación propia del original (p. ej. "Nunca" sin
punto en la versión hombre). El `stepLabel` de cada pregunta también viene
del sitio (`_textList` / `_menTextList`, los textos de la barra de
progreso).

## Flujo de la app

1. Elegís género (mujer/hombre).
2. Respondés el cuestionario paso a paso (una pregunta por pantalla).
3. Al responder la última pregunta se calcula el diagnóstico y se pide
   nombre + email.
4. Se muestra el resultado en pantalla y se dispara el envío de email vía
   `POST /api/send-result`.

La función serverless **recalcula el diagnóstico en el servidor** a partir
de las respuestas recibidas — nunca confía en un resultado que mande el
cliente — y envía dos emails con Resend:

- Al usuario, con su resultado y el detalle de respuestas.
- A una casilla interna (`EMAIL_TO_INTERNAL`), como lead, con `replyTo` al
  email del usuario. Este segundo envío es opcional: si no se configura
  `EMAIL_TO_INTERNAL`, solo se manda el mail al usuario.

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
| `EMAIL_TO_INTERNAL` | Casilla interna que recibe copia de cada lead (opcional) |

En Vercel, cargá las mismas variables en **Project Settings → Environment
Variables**.

## Desarrollo local

```bash
npm run dev
```

Levanta solo el front (Vite). Las llamadas a `/api/send-result` van a fallar
con 404 porque Vite no sirve funciones serverless — es esperable, la UI
maneja el error mostrando el resultado igual, sin bloquear al usuario.

Para probar el flujo completo (front + función serverless) local:

```bash
npm i -g vercel   # una sola vez
vercel dev
```

## Build y deploy

```bash
npm run build
```

Deploy en Vercel (detecta Vite y la carpeta `api/` automáticamente):

```bash
vercel deploy --prod
```

## Estructura

```
src/
  types.ts               tipos compartidos (Gender, Letter, Question, ...)
  data/questions.ts       preguntas y opciones (mujer y hombre)
  logic/diagnose.ts        lógica de diagnóstico (verificada exhaustivamente)
  schemas.ts               esquemas Zod (contacto y payload de la API)
  store/useQuizStore.ts    estado del wizard (Zustand)
  api/sendResult.ts        cliente fetch hacia /api/send-result
  components/              pasos del wizard (género, pregunta, contacto, resultado)
api/
  send-result.ts           función serverless de Vercel (envío con Resend)
```
