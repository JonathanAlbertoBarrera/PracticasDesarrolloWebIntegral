import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'webshell',
      // REMOTOS que consume: nombre lógico -> URL del remoteEntry.js servido.
      remotes: {
        pets_front: 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', '@nimbus/commons'],
    }),
  ],
  build: { target: 'esnext' },
  server: { port: 5000 },
  preview: { port: 5000 },
});