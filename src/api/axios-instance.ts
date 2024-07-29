import { BACKEND_BASE_URL } from '../constants/api.constants';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
