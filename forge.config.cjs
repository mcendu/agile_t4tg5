const config = {
    packagerConfig: {
        asar: true,
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {},
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
        },
        {
            name: '@electron-forge/maker-deb',
            config: {},
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {},
        },
    ],
    plugins: [
        {
            name: '@electron-forge/plugin-auto-unpack-natives',
            config: {},
        },
        {
            name: '@electron-forge/plugin-webpack',
            config: {
                mainConfig: './webpack.config.main.cjs',
                renderer: {
                    config: './webpack.config.renderer.cjs',
                    entryPoints: [
                        {
                            name: 'main_window',
                            html: './src/assets/html/index.html',
                            js: './src/assets/js/index.ts',
                            preload: {
                                js: './src/assets/js/preload.ts',
                            },
                        },
                    ],
                },
            },
        },
    ],
};

module.exports = config;
