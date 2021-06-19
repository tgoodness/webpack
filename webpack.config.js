const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || 'localhost';

// Required for babel-preset-react-app
process.env.NODE_ENV = 'development';

module.exports = {

    // Environment mode
    mode: 'development',

    // Entry point of app
    entry: resolveAppPath('src'),

    output: {

        // Development filename output
        path: resolveAppPath('public'),
        filename: "assets/bundle.js",
        chunkFilename: '[name].js'
    },

    devServer: {

        // Serve index.html as the base
        contentBase: resolveAppPath('public') + "/assets/",

        // Enable compression
        compress: true,

        // Enable hot reloading
        hot: true,

        host,
        inline: true,
        port: 3000,
       


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

                        // Preset includes JSX, TypeScript, and some ESnext features
                        require.resolve('babel-preset-react-app'),
                    ]
                }
            },
            {
                test: /\.(s(a|c)ss)$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ],
    },

    plugins: [
        // Re-generate index.html with injected script tag.
        // The injected script tag contains a src value of the
        // filename output defined above.
        new HtmlWebpackPlugin({
            inject: true,
            template: resolveAppPath('public/index.html'),
        }),
        // new MiniCssExtractPlugin()
    ],

};