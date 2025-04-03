import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': {}
    },
    build: {
        outDir: 'build',
        lib: {
            fileName: 'template-ui',
            entry: 'src/web/registry.ts',
            formats: ['es'],
        },
    },
});
