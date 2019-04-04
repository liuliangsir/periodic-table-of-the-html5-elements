const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
// const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const webpack = require('webpack');
const cssnano = require('cssnano');
const { resolve } = require('path');
const { webpackConfig, commonConfig } = require('./webpack.config.base');

webpackConfig.module.rules.forEach(rule => {
  if (String(rule.test).match(/\\\.(?:sa|sc|c|le)ss|styl\b/)) {
    // eslint-disable-next-line no-param-reassign
    rule.use = [MiniCSSExtractPlugin.loader].concat(rule.use);
  }
});

webpackConfig.plugins = [
  new CleanWebpackPlugin(),
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
    inject: true,
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
    meta: {
      'theme-color': '#333',
      'Content-Security-Policy': {
        'http-equiv': 'Content-Security-Policy',
        content:
          "default-src https:; font-src 'self' data:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'", // eslint-disable-line quotes
      },
    },
    title: 'periodic table of the html5 elements',
    favicon: resolve(commonConfig.rootPath, 'src', 'img', 'favicon.ico'),
  }),
  // new InlineManifestWebpackPlugin('manifest'),
  new WebpackMd5Hash(),
  new Visualizer(),
].concat(webpackConfig.plugins);

webpackConfig.output.filename = '[name].[chunkhash].js';
webpackConfig.output.chunkFilename = '[name].[chunkhash].chunk.js';

// eslint-disable-next-line  import/no-dynamic-require
const { address } = require(resolve(commonConfig.rootPath, 'project.config.js'));
webpackConfig.output.publicPath = address;

// eslint-disable-next-line  import/no-dynamic-require
const cssProcessorOptions = require(resolve(commonConfig.rootPath, 'cssnano.config.js'));
webpackConfig.optimization = {
  minimizer: [
    new UglifyJSPlugin({
      exclude: /\.min\.js$/,
      cache: true,
      parallel: true,
      sourceMap: false,
      extractComments: false,
      uglifyOptions: {
        compress: {
          drop_console: true,
        },
        output: {},
      },
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      canPrint: true,
      cssProcessor: cssnano,
      cssProcessorOptions,
    }),
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
        minChunks: 1,
      },
    },
  },
};

webpackConfig.mode = 'production';

module.exports = webpackConfig;
