/* eslint-disable import/no-extraneous-dependencies */
const defaultPreset = require('cssnano-preset-default');

module.exports = defaultPreset({
  safe: true,
  autoprefixer: { disable: true },
  mergeLonghand: false,
  calc: false,
  discardComments: {
    removeAll: true,
  },
  svgo: {
    exclude: true,
  },
});
