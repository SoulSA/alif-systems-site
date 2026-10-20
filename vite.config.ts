import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * Clean, standalone Vite config — no Amazon/Quick plugins.
 *  • `@root/*` → `src/*` alias (resolved via tsconfig paths)
 *  • dev server proxies /api/* to the local Express server (port 8080) so the
 *    admin editor and articles work in `npm run dev` just like in production.
 */
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});
