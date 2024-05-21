import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      renderLegacyChunks: false,
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              chrome: '67',
              edge: '79',
              firefox: '67',
              safari: '12'
            },
            bugfixes: true,
          },
        ],
      ],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  esbuild: {
    target: ['chrome67', 'edge79', 'firefox67', 'safari12'],  // Cambiar a una versión de ES más nueva que soporte BigInt
  },
  build: {
    chunkSizeWarningLimit: 2000, // Ajustar el límite del tamaño del chunk si es necesario
    target: 'esnext'
  }
})
