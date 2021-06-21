const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

const host = process.env.HOST || 'localhost';
process.env.NODE_ENV = 'development';

module.exports = {

    // Environment mode
    mode: 'development',
    entry: resolveAppPath('src'),

    output: {
        // Development filename output
        path: __dirname + "/build",
        filename: "bundle.js",
        chunkFilename: '[name].js'
    },

    devServer: {
        contentBase: resolveAppPath('public'),
        compress: true,
        hot: true,
        host,
        inline: true,
        port: 3000,
        open: "chrome"
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: resolveAppPath('src'),
                loader: 'babel-loader',
                options: {
                    presets: [
                        require.resolve('babel-preset-react-app'),
                    ]
                }
            },
            {
                test: /\.(s(a|c)ss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ],

    },

    resolve: {
        extensions: [ '*', '.js', '.jsx' ],
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),
        ],
    },

    plugins: [
        new Dotenv(),
        new MiniCssExtractPlugin({ filename: "app.css" }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: resolveAppPath('public/index.html'),
        }),

    ],

};