import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    resolve: {
        mainFields: ['module', 'jsnext:main', 'jsnext'],
    },
    build: {
        rollupOptions: {
            external: ['better-sqlite3'],
            output: {
                format: 'cjs',
                chunkFileNames: '[name]-[hash].cjs',
                entryFileNames: '[name].cjs',
            },
        },
    },
});
