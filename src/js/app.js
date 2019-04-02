// eslint-disable-next-line import/no-unresolved
import 'CSS/entry/app.css';

if (module.hot) {
  module.hot.accept(error => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Cannot apply HMR update.', error);
    }
  });
}
