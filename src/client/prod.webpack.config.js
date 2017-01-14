const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const srcDir = __dirname;
const buildPath = path.join(srcDir, 'build');

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

const uglifyJsPluginConfig = {
    compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
    },
    mangle: {
        screw_ie8: true
    },
    output: {
        comments: false,
        screw_ie8: true,
    },
    sourceMap: false,
};

module.exports = {
    devtool: false,
    bail: true,
    entry: path.join(srcDir, 'Application', 'index.jsx'),
    output: {
        path: buildPath,
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
                    loader: ['css-loader', 'sass-loader', 'postcss-loader'],
                    fallbackLoader: 'style-loader',
                })
            },
        ],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new CopyWebpackPlugin([{from: path.join(srcDir, 'public'), to: buildPath}]),
        new ExtractTextPlugin({filename: '[name].[contenthash:8].css', allChunks: true}),
        new HtmlWebpackPlugin(htmlPluginConfig),
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
        new webpack.LoaderOptionsPlugin({minimize: true, debug: false}),
        new webpack.optimize.UglifyJsPlugin(uglifyJsPluginConfig),
        new OfflinePlugin(),
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