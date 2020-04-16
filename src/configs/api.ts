import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

const rejectedResponse = (error: any) =>
  error.respose && error.response.data ? error.response.data : error.response;

instance.interceptors.response.use(
  ({ data }) => data,
  (error) => {
    console.log(error, 'error config/api');
    return Promise.reject(rejectedResponse(error));
  }
);

export default instance;
