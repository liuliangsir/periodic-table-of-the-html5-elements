// eslint-disable-next-line import/no-unresolved
import 'CSS/entry/app.css';

/* eslint-disable prettier/prettier */
import(
  /* webpackChunkName: 'dialog' */
  /* webpackMode: 'eager' */
  './dialog'
);
/* eslint-enable prettier/prettier */

if (module.hot) {
  module.hot.accept(error => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Cannot apply HMR update.', error);
    }
  });
}
