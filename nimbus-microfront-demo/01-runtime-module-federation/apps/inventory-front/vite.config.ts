import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'inventory_front',
      filename: 'remoteEntry.js',
      // QUÉ exponemos. El host importará: import('inventory_front/ProductsModule')
      exposes: {
        './ProductsModule': './src/ProductsModule.tsx',
      },
      // Dependencias compartidas: una sola copia en la página.
      shared: ['react', 'react-dom', '@nimbus/commons'],
    }),
  ],
  build: { target: 'esnext', minify: false, cssCodeSplit: false },
  server: { port: 5001 },
  preview: { port: 5001 },
});