/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');

module.exports = {
  configCreator(config) {
    const { webpackConfig, hookConfig } = config;

    /* eslint-disable indent */
    switch (!!webpackConfig.entry) {
      case false: {
        break;
      }
      case typeof webpackConfig.entry === 'string': {
        webpackConfig.entry = path.resolve(webpackConfig.context, webpackConfig.entry);
        break;
      }
      case Array.isArray(webpackConfig.entry): {
        webpackConfig.entry = webpackConfig.entry.map(entry => path.resolve(webpackConfig.context, entry));
        break;
      }
      case typeof webpackConfig.entry === 'object': {
        Object.entries(webpackConfig.entry).forEach(([key, value]) => {
          webpackConfig.entry[key] = Array.isArray(value)
            ? value.map(entry => path.resolve(webpackConfig.context, entry))
            : path.resolve(webpackConfig.context, value);
        });
        break;
      }
      default: {
        break;
      }
    }
    /* eslint-enable indent */

    const result = Object.assign(
      {
        mode: 'development',
        plugins: [],
        devServer: {},
      },
      webpackConfig
    );

    const { before } = hookConfig;
    if (result.devServer.before) {
      const proxy = result.devServer.before;
      result.devServer.before = function replace(app) {
        // eslint-disable-next-line no-unused-expressions
        before && before(app);
        proxy(app);
      };
    } else if (before) {
      result.devServer.before = before;
    }

    return result;
  },
};
