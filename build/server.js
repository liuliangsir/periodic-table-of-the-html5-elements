/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chokidar = require('chokidar');
const childProcess = require('child_process');
const config = require('./webpack.config.dev');

const port = process.env.PORT || 3000;
try {
  childProcess.exec(`kill -9 \`lsof -t -i:${port}\``);
} catch (error) {} // eslint-disable-line no-empty

const compiler = webpack(config);
const devServerOption = Object.assign({}, config.devServer, {
  before(app, server) {
    chokidar.watch(['*pug', 'template/**/*.pug'].map(path => `./src/${path}`)).on('all', () => {
      server.sockWrite(server.sockets, 'content-changed');
    });
  },
});
const server = new WebpackDevServer(compiler, devServerOption);

server.listen(port, '127.0.0.1', () => {
  // eslint-disable-next-line no-console
  console.log(`Starting server on http://localhost:${port}`);
});
