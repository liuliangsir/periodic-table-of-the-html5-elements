/* eslint-disable import/no-extraneous-dependencies */
const defaultPreset = require('cssnano-preset-default');

module.exports = defaultPreset({
  calc: false,
  discardComments: {
    removeAll: true,
  },
  svgo: {
    exclude: true,
  },
});
