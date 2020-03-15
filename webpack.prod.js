const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseWebpackConfig = require('./webpack.base.js');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        'cache-loader',
        'thread-loader',
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
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2 // 设置为 1 可以查看打包效果
        }
      }
    }
  },
  plugins: [
    new BundleAnalyzerPlugin({}),
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
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://unpkg.com/react@16/umd/react.development.js',
          global: 'React'
        },
        {
          module: 'react-dom',
          entry: 'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
          global: 'ReactDOM'
        }
      ]
    })
  ],
  stats: 'normal'
});
