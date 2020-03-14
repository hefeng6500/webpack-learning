const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const baseWebpackConfig = require('./webpack.base.js');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
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
        }
      }
    }
  },
  plugins: [
    new BundleAnalyzerPlugin({}),
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
    }),
    new CleanWebpackPlugin()
  ]
});
