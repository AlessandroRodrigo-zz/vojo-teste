import axios, { AxiosRequestConfig } from 'axios';
import RequestProcessor from '../middlewares/api/request/RequestProcessor';

const standardAPIService = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  params: { apikey: process.env.REACT_APP_API_KEY },
});

standardAPIService.interceptors.request.use((request: AxiosRequestConfig) => {
  RequestProcessor.run(request);

  return request;
});

export default standardAPIService;
