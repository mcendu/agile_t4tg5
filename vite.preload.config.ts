import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                format: 'cjs',
                chunkFileNames: '[name]-[hash].cjs',
                entryFileNames: '[name].cjs',
            },
        },
    },
});
