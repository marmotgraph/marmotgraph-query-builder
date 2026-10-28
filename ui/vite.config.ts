import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react()],
    server: {
        port: 3000,
        strictPort: true,
        proxy: {
            '/api': {
                // target: 'https://query.kg-dev.tds.cscs.ch',
                target: 'http://localhost:8080',
                changeOrigin: true
            }
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        css: true,
        reporters: ['verbose']
    },
    build: {
        outDir: 'build'
    }
});
