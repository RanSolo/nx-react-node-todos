import axios from 'axios';

import { log } from './log-service';

axios.defaults.headers.common['X-CSRFToken'] = window.django?.csrf;

axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response
    && error.response.status >= 400
    && error.response.status < 500;
  if (!expectedError && error) {
    log('Logging the error', error);
    log('An unexpected error occurred');
  }
  log(error.response);
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  cancel: axios.CancelToken,
};
