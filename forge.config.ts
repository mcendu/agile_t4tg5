import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { VitePlugin } from '@electron-forge/plugin-vite';

import mainConfig from './vite.main.config';
import preloadConfig from './vite.preload.config';
import rendererConfig from './vite.renderer.config';

const config: ForgeConfig = {
    packagerConfig: {
        asar: true,
    },
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({}),
        new MakerZIP({}, ['darwin']),
        new MakerRpm({}),
        new MakerDeb({}),
    ],
    plugins: [
        new AutoUnpackNativesPlugin({}),
        new VitePlugin({
            // `build` can specify multiple entry builds, which can be
            // Main process, Preload scripts, Worker process, etc.
            build: [
                {
                    // `entry` is an alias for `build.lib.entry`
                    // in the corresponding file of `config`.
                    entry: 'src/main.ts',
                    config: 'vite.main.config.ts',
                },
                {
                    entry: 'src/assets/js/preload.ts',
                    config: 'vite.preload.config.ts',
                },
            ],
            renderer: [
                {
                    name: 'main_window',
                    config: 'vite.renderer.config.ts',
                },
            ],
        }),
    ],
};

module.exports = config;
