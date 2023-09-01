import { defineConfig } from 'vitest/config';
import vuePlugin from '@vitejs/plugin-vue';

export default defineConfig({
    test: {
        include: ['tests/**', 'src/assets/tests/**'],
        environmentMatchGlobs: [['src/assets/tests/**', 'happy-dom']],
    },
    plugins: [vuePlugin()],
});
