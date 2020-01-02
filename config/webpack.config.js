const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
    // devtool: 'source-map',
    mode: 'production',
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.join(__dirname, '../lib'),
        libraryTarget: 'umd',
        library: 'formsDropdown',
        filename: '[name].js',
    },
    externals: {
        react: 'react',
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer, precss],
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{ loader: 'babel-loader' }],
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                            publicPath: '../',
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
        ]
    }
};