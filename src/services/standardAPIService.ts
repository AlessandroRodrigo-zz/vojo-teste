import axios from 'axios';

const standardAPIService = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  params: { apikey: process.env.REACT_APP_API_KEY },
});

export default standardAPIService;
