import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
    plugins: [react(), cssInjectedByJsPlugin()],
    define: {
        'process.env': {}
    },
    build: {
        outDir: 'build',
        minify: true,
        lib: {
            fileName: 'template-ui',
            entry: 'src/web/registry.ts',
            formats: ['es'],
        },
    },
});
