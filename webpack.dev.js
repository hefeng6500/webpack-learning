const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.js');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        'babel-loader',
        'eslint-loader'
      ]
    },
    {
      test: /\.css$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: true
          }
        },
        'css-loader',
        'postcss-loader',
        {
          loader: 'px2rem-loader',
          // options here
          options: {
            remUni: 75,
            remPrecision: 8
          }
        }
      ]
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: true
          }
        },
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            // Prefer `dart-sass`
            implementation: require('sass')
          }
        },
        'postcss-loader',
        {
          loader: 'px2rem-loader',
          // options here
          options: {
            remUni: 75,
            remPrecision: 8
          }
        }
      ]
    },
    {
      test: /\.(ttf|otf|ttc|eot|woff|woff2|font|fon)$/,
      use: [
        'file-loader'
      ]
    },
    {
      test: /\.(jpg|jpeg|png|gif|svg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunk: ['common']
    }),
    new webpack.HotModuleReplacementPlugin({})
  ]
});
