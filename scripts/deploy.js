/* eslint-disable import/no-extraneous-dependencies */

const gh = require('gh-pages');

gh.publish(
  'dist',
  {
    add: false,
    message: 'Chore: release new version',
  },
  error => {
    // eslint-disable-next-line no-console
    console.error(error);
  }
);
