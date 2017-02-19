'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var Bump = require("bump-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');


module.exports = {
    entry: './src/ngapp/app.js',
    output: {
        path: path.resolve(__dirname, "public"),
        filename: 'bundle.js',
        publicPath: "/",
        pathinfo: true
    },
    resolve : {
        modules: [path.resolve(__dirname, "src/theme/styles"), "node_modules"]
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            include: path.join(__dirname, 'src'),
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            include: path.join(__dirname, 'src'),
            loader: "style-loader!css-loader!less-loader"
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack-loader'
            ]
        }]
    },
    plugins: [
        new ngAnnotatePlugin({
            add: true
        }),
        new webpackUglifyJsPlugin({
            cacheFolder: path.resolve(__dirname, 'public/cached_uglify/'),
            debug: true,
            mangle: false,
            minimize: true,
            sourceMap: false,
            output: {
                comments: false
            },
            compressor: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            filename: "../public/index.html",
            inject: 'body',
            hash: true
        }),
        new Bump([
            'package.json'
        ]),
        new CleanWebpackPlugin(['public'], {
            root: __dirname,
            verbose: true,
            dry: false,
            exclude: ['.htaccess']
        })
    ]
};