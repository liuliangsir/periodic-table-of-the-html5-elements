const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const { resolve } = require('path');
const { webpackConfig, commonConfig } = require('./webpack.config.base');

webpackConfig.module.rules.forEach(rule => {
  if (String(rule.test).match(/\\\.(?:sa|sc|c|le)ss|styl\b/)) {
    // eslint-disable-next-line no-param-reassign
    rule.use = [MiniCSSExtractPlugin.loader].concat(rule.use);
  }
});

webpackConfig.plugins = [
  new CleanWebpackPlugin(resolve(commonConfig.rootPath, 'dist')),
  new MiniCSSExtractPlugin({
    name: '[name].[chunkhash].css',
    chunkFilename: '[id].[chunkhash].chunk.css',
  }),
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1,
  }),
  new webpack.optimize.AggressiveSplittingPlugin({
    minSize: 10000,
    maxSize: 30000,
  }),
  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new HashedModuleIdsPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: commonConfig.indexTemplate,
    chunksSortMode: 'manual',
    chunks: ['manifest', 'vendors', 'app'],
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
    },
    templateParameters: {},
    meta: {
      'Content-Security-Policy': {
        'http-equiv': 'Content-Security-Policy',
        content:
          "default-src https:; font-src 'self' data:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'", // eslint-disable-line quotes
      },
    },
  }),
  new WebpackMd5Hash(),
].concat(webpackConfig.plugins);

webpackConfig.output.filename = '[name].[chunkhash].js';
webpackConfig.output.chunkFilename = '[name].[chunkhash].chunk.js';

// eslint-disable-next-line  import/no-dynamic-require
const { prefix, address } = require(resolve(commonConfig.rootPath, 'project.config.js'));
webpackConfig.output.publicPath = prefix + address;

webpackConfig.optimization = {
  minimizer: [
    new UglifyJSPlugin({
      include: /\.min\.js$/,
      sourceMap: false,
      output: {
        comments: false,
        ascii_only: true,
      },
      compress: {
        comparisons: false,
      },
    }),
    new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: false,
      terserOptions: {},
    }),
    new OptimizeCSSAssetsPlugin({}),
  ],
  runtimeChunk: {
    name: 'manifest',
  },
  splitChunks: {
    minSize: 0,
    maxAsyncRequests: 9,
    maxInitialRequests: 9,
    name: false,
    cacheGroups: {
      styles: {
        test: /\.css$/,
        name: 'styles',
        chunks: 'all',
        enforce: true,
      },
      commons: {
        test: /^(?!(?:.*[\\/]node_modules[\\/])).*/,
        name: 'commons',
        chunks: 'initial',
        minChunks: 2,
        reuseExistingChunk: true,
      },
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'initial',
        minChunks: 2,
        reuseExistingChunk: true,
      },
    },
  },
};

webpackConfig.mode = 'production';

module.exports = webpackConfig;
