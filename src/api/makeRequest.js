import axios from 'axios';

/**
 *
 * @param {Object} params
 * @param {String} params.url
 * @param {String} params.method
 * @param {Object} [params.data]
 * @param {Object} [params.params]
 * @param {Object} [params.headers]
 */
function makeRequest({ url, method, data = {}, params = {}, headers = {} }) {
  return axios({
    url: `https://air.nw-sys.ru/api/v1${url}`,
    method,
    params,
    data,
    headers,
  });
}

export default makeRequest;
