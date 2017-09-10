const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const distDirectory = path.join(__dirname, 'public');

module.exports = {
  entry: './js/index.js',
  output: {
    path: distDirectory,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg|woff2?)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                minimize: true,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')(),
                ],
              },
            },
          ],
        }),
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({template: './index.html', inlineSource: '.css$'}),
    new HtmlWebpackInlineSourcePlugin(),
    new ScriptExtHtmlWebpackPlugin({defaultAttribute: 'async'}),
    new CopyWebpackPlugin([{from: './assets'}]),
    new webpack.optimize.UglifyJsPlugin(),
    new OfflinePlugin({
      AppCache: false,
    }),
  ],
};