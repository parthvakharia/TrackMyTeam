import axios from 'axios';
// import { API_URL } from '@env';
const API_URL = 'http://192.168.0.110:4040';

const Axios = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  //   headers: { 'X-Custom-Header': '' },
});

Axios.interceptors.request.use((req) => {
  req.headers.authorization = 'Barrier my secret token';
  return req;
});

Axios.interceptors.response.use((res) => {
  const { status, message } = res.data;

  if (status === "success") {
    return message;
  }

  throw new Error("Error in API ", message);
});

export default Axios;
