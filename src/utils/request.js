function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [newOptions] The options we want to pass to "fetch"
 * @param  {object} [blob] return blob or json
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, newOptions, blob) {
  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    if (newOptions.body instanceof FormData) {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    }
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => (blob ? response.blob() : response.json()));
}
