const path = require('path');

const config = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, '.webpack'),
        filename: 'main.cjs',
    },
    module: {
        rules: [
            {
                // We're specifying native_modules in the test because the asset
                // relocator loader generates a "fake" .node file which is really
                // a cjs file.
                test: /native_modules\/.+\.node$/,
                use: 'node-loader',
            },
            {
                test: /\.(m?js|node)$/,
                parser: { amd: false },
                use: {
                    loader: '@vercel/webpack-asset-relocator-loader',
                    options: {
                        outputAssetBase: 'native_modules',
                    },
                },
            },
            {
                test: /\.ts(x)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css'],
    },
};

module.exports = config;
