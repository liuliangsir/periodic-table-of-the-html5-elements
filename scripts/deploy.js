/* eslint-disable import/no-extraneous-dependencies */

const ghPages = require('gh-pages');
const localGitConfigAccessor = require('gitconfiglocal');

const rootDir = 'dist';
const ghPagesConfig = {
  message: 'Chore: :bookmark:release new version',
};
// eslint-disable-next-line no-console
const callback = message => console.log(message);

if ('GH_TOKEN' in process.env) {
  localGitConfigAccessor('./', (error, config) => {
    if (error) {
      return callback(error);
    }

    if (!('remote' in config) || !('origin' in config.remote) || !('url' in config.remote.origin)) {
      return callback('repository has no origin url');
    }

    let { url } = config.remote.origin;
    const match =
      url.match(/^git@github.com:([^/]+)\/([^.]+)\.git$/) || url.match(/^https:\/\/github.com\/([^/]+)\/([^.]+)\.git$/);

    if (match) {
      url = `https://${process.env.GH_TOKEN}@github.com/${match[1]}/${match[2]}.git`;
    }

    ghPagesConfig.repo = url;
    return ghPages.publish(rootDir, ghPagesConfig, callback);
  });
} else {
  ghPages.publish(rootDir, ghPagesConfig, callback);
}
