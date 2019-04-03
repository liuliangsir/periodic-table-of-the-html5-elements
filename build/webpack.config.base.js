const { resolve } = require('path');
const helper = require('./webpack.config.helper');

const rootPath = resolve(__dirname, '..');
const SRC_PATH = resolve(rootPath, 'src');

const commonConfig = {
  indexTemplate: resolve(SRC_PATH, 'index.pug'),
  rootPath: resolve(rootPath, ''),
};
const webpackConfig = helper.configCreator({
  webpackConfig: {
    context: SRC_PATH,
    entry: {
      app: ['./js/app'],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]--[hash:base64:5]',
                hashPrefix: 'hash',
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: [SRC_PATH],
          use: [
            'cache-loader',
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader',
          options: {
            knownHelpersOnly: false,
            partialDirs: [resolve(SRC_PATH, 'template')],
          },
        },
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'pug-loader',
              options: {
                pretty: true,
              },
            },
          ],
        },
      ],
    },
    output: {
      path: resolve(rootPath, 'dist'),
    },
    resolve: {
      alias: {
        CSS: resolve(SRC_PATH, 'css'),
      },
      cacheWithContext: false,
      enforceExtension: false,
      extensions: ['.js', '.jsx', '.json'],
      modules: [SRC_PATH, 'node_modules'],
      symlinks: false,
    },
  },
  hookConfig: {},
});

module.exports = {
  webpackConfig,
  commonConfig,
};
