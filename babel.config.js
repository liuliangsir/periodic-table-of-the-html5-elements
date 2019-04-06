module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        ignoreBrowserslistConfig: true,
        targets: {
          node: 'current',
          safari: '10.1',
          chrome: '69',
          ie: '9',
          opera: '55',
          edge: '15',
          firefox: '62',
          ios: '11.3',
          android: '67',
          esmodules: true,
        },
        useBuiltIns: 'usage',
        corejs: '3.0.0',
        exclude: ['@babel/plugin-transform-regenerator'],
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    '@babel/plugin-syntax-dynamic-import',
  ],
};
