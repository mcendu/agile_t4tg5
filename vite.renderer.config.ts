import path from 'path';
import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';

/// <reference types="vitest" />

// https://vitejs.dev/config
export default defineConfig({
    root: 'src/assets',
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    plugins: [vuePlugin()],
    build: {
        target: ['chrome114'],
    },
});
