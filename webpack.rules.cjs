const babelOptions = {
    presets: [
        ['@babel/preset-env', { targets: { electron: 24 }, corejs: '3.8' }],
    ],
};

module.exports = {
    babelOptions: babelOptions,
};
