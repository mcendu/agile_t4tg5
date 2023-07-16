const { VueLoaderPlugin } = require('vue-loader');

/**
 * @type {import('@electron-forge/plugin-webpack/dist/Config').WebpackConfiguration}
 */
const config = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.ts(x)?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.vue'],
    },
    plugins: [new VueLoaderPlugin()],
};

module.exports = config;
