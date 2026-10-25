import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  theme: {
    extend: {
      keyframes: {
        rain: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
        snow: { '0%': { transform: 'translateY(-10px)' }, '100%': { transform: 'translateY(50px)' } },
        drift: { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '300px 0' } },
        wind: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
      }
    }
  }
})