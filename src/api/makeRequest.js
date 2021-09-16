import axios from 'axios';

function makeRequest({ url, method }, { data, params, headers }) {
  return axios({
    url: `http://air.nw-sys.ru:8007/api/v1/${url}`,
    method,
    params,
    data,
    headers,
  });
}

export default makeRequest;
