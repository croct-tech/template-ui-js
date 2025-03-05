import {defineConfig} from 'vite';
import {externalizeDeps} from 'vite-plugin-externalize-deps'

import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react(), externalizeDeps()],
    build: {
        outDir: 'build',
        lib: {
            entry: [
                'src/react/index.ts',
                'src/web/index.ts'
            ],
            formats: ['es'],
        },
        rollupOptions: {
            preserveEntrySignatures: 'strict',
            output: {
                preserveModules: true,
                preserveModulesRoot: 'src',
            },
        }
    },
});
