import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const ddocVersion = JSON.parse(
  readFileSync('node_modules/@fileverse-dev/ddoc/package.json', 'utf8'),
).version;

export default defineConfig({
  plugins: [react()],
  server: { port: 5181, strictPort: true },
  define: { __DDOC_VERSION__: JSON.stringify(ddocVersion) },
  resolve: { dedupe: ['react', 'react-dom', 'yjs'] },
});
