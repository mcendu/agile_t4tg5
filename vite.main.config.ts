/*
 * Copyright (C) 2023 Goldsmiths, University of London.
 * All rights reserved.
 */

import { defineConfig } from 'vite';

/// <reference types="vitest" />

// https://vitejs.dev/config
export default defineConfig({
    resolve: {
        mainFields: ['module', 'jsnext:main', 'jsnext'],
    },
    build: {
        target: ['node18'],
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
