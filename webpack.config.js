const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    node: {
        fs: 'empty'
      },
    mode: 'development',
    /* entry: {
        // https://github.com/webpack-contrib/webpack-hot-middleware
        // point 2:
        app: ['./src/index.ts', 'webpack-hot-middleware/client'],
        // or:
// https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/example/webpack.config.js
    }, */
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        // './index-fe.js'  // not succeed
        './src/file.js'
    ],
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            // loader succeed ; but the ts file can not console ,TODO
            // {
            //     test: /\.tsx?$/,
            //     loader: 'ts-loader',
            //     exclude: /assembly/
            // },
            {
                test: /\.ts?$/,
                loader: 'assemblyscript-typescript-loader',
                include: /assembly/,//to avoid a conflict with other ts file who use 'ts-load',so you can division them with prop 'include'
                options: {
                    limit: 1000,
                    name: `static/assembly/[name].[hash:8].wasm`
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: 'Output Management'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
};
