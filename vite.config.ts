import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages sirve el proyecto en /corallo-care-autodiagnostico/, no en
  // la raíz del dominio. Vercel (BASE_PATH sin definir) sigue usando "/".
  base: process.env.BASE_PATH ?? '/',
})
