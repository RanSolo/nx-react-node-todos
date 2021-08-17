// Just consoling the error now, but can be used in production...
// with a runtime monitor like honeybadger.

// import Honeybadger from 'honeybadger';

export const init = () => {
  // Honeybadger.configure({
  //    apiKey: 'project api key',
  //    environment: 'production',
  //    revision: 'git SHA/project version'
  // });
};

export const log = (error) => {
  if (process.env.NODE_ENV === 'test') return null;
  if (!error) return null;
  // eslint-disable-next-line no-console
  console.log('Log Service Error: ', error);
  return error;
  // Honeybadger.notify(error);
};

export default { init, log };
