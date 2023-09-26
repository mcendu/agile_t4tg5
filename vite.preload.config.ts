/*
 * Copyright (C) 2023 Goldsmiths, University of London.
 * All rights reserved.
 */

import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    build: {
        target: ['chrome114', 'node18'],
        rollupOptions: {
            output: {
                format: 'cjs',
                chunkFileNames: '[name]-[hash].cjs',
                entryFileNames: '[name].cjs',
            },
        },
    },
});
