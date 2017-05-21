const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const paths = require('./config/paths');
const srcDir = __dirname;

const htmlPluginConfig = {
    inject: true,
    template: path.resolve(srcDir, 'Application', 'index.html'),
    favicon: path.resolve(srcDir, 'Application', "favicon.ico"),
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDocType: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
    }
};

module.exports = {
    devtool: false,
    bail: true,
    entry: path.join(srcDir, 'Application', 'index.jsx'),
    output: {
        path: paths.buildPath,
        publicPath: '/',
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: srcDir,
                loader: 'babel-loader',
            },
            {
                test: /\.?scss$/,
                include: srcDir,
                loader: ExtractTextPlugin.extract({
                    loader: ['css-loader', 'resolve-url-loader', 'sass-loader', 'postcss-loader'],
                    fallbackLoader: 'style-loader',
                }),
            },
            {
              test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
              include: srcDir,
              loaders: [
                'url-loader?limit=10000'
              ]
            },
        ],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new CopyWebpackPlugin([{from: path.join(srcDir, 'public'), to: paths.buildPath}]),
        new ExtractTextPlugin({filename: '[name].[contenthash:8].css', allChunks: true}),
        new HtmlWebpackPlugin(htmlPluginConfig),
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
        new webpack.optimize.UglifyJsPlugin(),
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
    performance: {
        hints: false
    },
};