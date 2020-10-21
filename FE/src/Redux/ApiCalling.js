import axios from 'axios';
export function callApi(url, type = 'get', data = {}, header = {}) {
  let reqHeader = Object.assign(header, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // auth_token: header ? header : '',
  });
  if (__DEV__) {
    console.log('URL - ', url);
  }

  if (type === 'get') {
    return axios
      .get(url, {headers: reqHeader})
      .then((response) => {
        return handleResponse(response, 'get');
      })
      .catch((err) => {
        return handleCatchError(err);
      });
  } else if (type === 'post') {
    return axios
      .post(url, data, {headers: reqHeader})
      .then((response) => {
        return handleResponse(response, 'post');
      })
      .catch((err) => {
        return handleCatchError(err);
      });
  } else if (type === 'post') {
    return axios
      .patch(url, data, {headers: reqHeader})
      .then((response) => {
        if (response?.data?.error) {
          alert('Something went wrong');
          return true;
        }
        if (response?.data?.success === true) {
          return Promise.resolve(response);
        } else if (response?.data?.success === false) {
          alert(response.data.message);
          return true;
        }
      })
      .catch((err) => {
        if (__DEV__) {
          console.log('call api error - ', err);
        }

        return Promise.reject(err);
      });
  }
}