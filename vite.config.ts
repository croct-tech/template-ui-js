import {defineConfig} from 'vite';
import {externalizeDeps} from 'vite-plugin-externalize-deps'
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts'
import {fixImportsPlugin} from "esbuild-fix-imports-plugin";
import preserveDirectives from "rollup-plugin-preserve-directives";


export default defineConfig({
    plugins: [react(), externalizeDeps(), fixImportsPlugin(), dts({
        exclude: ['**/*.stories.{ts,tsx}'],
    })],
    build: {
        outDir: 'build',
        lib: {
            entry: [
                'src/react/index.ts',
                'src/next/index.ts',
                'src/web/index.ts',
                'src/web/registry.ts',
            ],
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            preserveEntrySignatures: 'strict',
            output: {
                preserveModules: true,
                preserveModulesRoot: 'src',
            },
            plugins: [preserveDirectives()]
        }
    },
});
