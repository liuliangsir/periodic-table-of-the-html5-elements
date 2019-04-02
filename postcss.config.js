/* eslint-disable import/no-extraneous-dependencies */
const unprefix = require('postcss-unprefix');

module.exports = ({ file }) => ({
  parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    'postcss-at-rules-variables': {},
    'postcss-import': { root: file.dirname },
    'postcss-easy-import': {},
    'postcss-url': {},
    'postcss-mixins': {},
    'postcss-for': {},
    'postcss-define-function': {},
    'postcss-calc': {},
    'postcss-normalize': { forceImport: true },
    'postcss-preset-env': {
      autoprefixer: {
        grid: true,
      },
      features: {
        'nesting-rules': true,
        'color-mod-function': { unresolved: 'warn' },
        'custom-properties': { preserve: false },
        'system-ui-font-family': { family: 'system-ui, Helvetica Neue' },
      },
      insertBefore: {
        'all-property': unprefix,
      },
    },
  },
});
