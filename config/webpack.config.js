const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.join(__dirname, '../lib'),
        libraryTarget: 'umd',
        library: 'formsDropdown',
        filename: '[name].js',
    },
    target: 'node',
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
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
                use: [{loader: 'babel-loader'}],
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
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                        }
                    },
                    'sass-loader',
                ],
            },
        ]
    },
    node: {
        Buffer: false
    },
    devtool: 'source-map',
};