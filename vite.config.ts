import {defineConfig} from 'vite';
import {externalizeDeps} from 'vite-plugin-externalize-deps'
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [react(), externalizeDeps(), dts({
        exclude: ['**/*.stories.{ts,tsx}'],
    })],
    build: {
        outDir: 'build',
        lib: {
            entry: [
                'src/react/index.ts',
                'src/web/index.ts',
                'src/web/registry.ts',
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
