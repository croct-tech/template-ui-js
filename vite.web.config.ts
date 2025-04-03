import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fixImportsPlugin} from "esbuild-fix-imports-plugin";

export default defineConfig({
    plugins: [react(), fixImportsPlugin()],
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
