import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const processEnv = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process?.env;
const basePath = processEnv?.BASE_PATH || '/';

export default defineConfig({
  base: basePath,
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  build: {
    sourcemap: false,
    target: 'es2020',
  },
});
