import path from 'path';
import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';

// https://vitejs.dev/config
export default defineConfig({
    root: 'src/assets',
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    plugins: [vuePlugin()],
});
