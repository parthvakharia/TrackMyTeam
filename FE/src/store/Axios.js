import axios from 'axios';
import { API_URL } from '@env';
console.log(API_URL);
const Axios = axios.create({
  baseURL: API_URL,
  //   timeout: 1000,
  //   headers: { 'X-Custom-Header': '' },
});
Axios.interceptors.request.use((req) => {
  console.log(`${req.method} ${req.url}`);
  req.headers.authorization = 'Barrier my secret token';
  // Important: request interceptors **must** return the request.
  return req;
});
Axios.interceptors.response.use((res) => {
  // Important: request interceptors **must** return the request.
  return res.data;
});

export default Axios;
