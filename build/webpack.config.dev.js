const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCSSChunks = require('extract-css-chunks-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const { webpackConfig, commonConfig } = require('./webpack.config.base');

const port = process.env.PORT || 3000;
const entries = [`webpack-dev-server/client?http://localhost:${port}/`, 'webpack/hot/dev-server'];

Object.entries(webpackConfig.entry).forEach(([key, value]) => {
  webpackConfig.entry[key] = entries.concat(value);
});

webpackConfig.module.rules = [
  {
    test: /\.(jpe?g|png|gif|svg|cur)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 1000,
          prefix: 'img/',
        },
      },
    ],
  },
  {
    test: /\.(woff2?|eot|ttf|otf)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          prefix: 'font/',
        },
      },
    ],
  },
].concat(webpackConfig.module.rules);

const extractCSSChunksLoader = {
  loader: ExtractCSSChunks.loader,
  options: {
    hot: true,
    reloadAll: true,
  },
};
webpackConfig.module.rules.forEach(rule => {
  if (String(rule.test).match(/\\\.(?:sa|sc|c|le)ss|styl\b/)) {
    rule.use.forEach(loader => {
      if (typeof loader === 'string') return;
      // eslint-disable-next-line no-param-reassign
      loader.options.sourceMap = true;
    });

    rule.use.unshift(extractCSSChunksLoader);
  } else if (String(rule.use).match(/babel-loader/)) {
    // eslint-disable-next-line no-param-reassign
    rule.use = Array.isArray(rule.use) ? rule.use : [rule.use];
  }
});

webpackConfig.plugins = [
  new ExtractCSSChunks({
    filename: '[name].css',
    chunkFilename: '[id].chunk.css',
    orderWarning: true,
  }),
  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
  new HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    inject: true,
    cache: false,
    filename: 'index.html',
    template: commonConfig.indexTemplate,
    chunksSortMode: 'manual',
    chunks: ['manifest', 'vendors', 'app'],
    meta: {
      'theme-color': '#333',
    },
    title: 'periodic table of the html5 elements',
    favicon: resolve(commonConfig.rootPath, 'src', 'img', 'favicon.ico'),
  }),
].concat(webpackConfig.plugins);

webpackConfig.devtool = 'cheap-eval-source-map';
webpackConfig.output.filename = 'assets/[name].js';
webpackConfig.output.chunkFilename = 'assets/[name].chunk.js';

const publicPath = `//localhost:${port}/`;
webpackConfig.output.publicPath = publicPath;
webpackConfig.devServer = {
  hot: true,
  inline: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    children: false,
  },
  headers: {},
  publicPath,
};

webpackConfig.optimization = {
  noEmitOnErrors: true,
  runtimeChunk: {
    name: 'manifest',
  },
  splitChunks: {
    minSize: 0,
    maxAsyncRequests: 9,
    maxInitialRequests: 9,
    cacheGroups: {
      commons: {
        chunks: 'initial',
        name: 'commons',
        filename: '[name].bundle.js',
        minChunks: 2,
        reuseExistingChunk: true,
      },
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all',
        name: 'vendors',
      },
      default: false,
    },
  },
};

module.exports = webpackConfig;
