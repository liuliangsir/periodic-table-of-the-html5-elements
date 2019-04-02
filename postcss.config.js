/* eslint-disable import/no-extraneous-dependencies */
const unprefix = require('postcss-unprefix');

module.exports = ({ file, options, env }) => ({
  parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    cssnano: env === 'production' ? options.cssnano : false,
    'postcss-import': { root: file.dirname },
    'postcss-easy-import': {},
    'postcss-url': {},
    'postcss-mixins': {},
    'postcss-nested': {},
    'postcss-normalize': {},
    oldie: {},
    'postcss-font-family-system-ui': {
      family:
        'system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    },
    'postcss-preset-env': {
      autoprefixer: {
        grid: true,
      },
      features: {
        'nesting-rules': true,
        'color-mod-function': { unresolved: 'warn' },
      },
      insertBefore: {
        'all-property': unprefix,
      },
    },
  },
});
