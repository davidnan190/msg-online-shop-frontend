import { BACKEND_BASE_URL } from '../constants/api.constants';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const {accessToken} = useAuthContext();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;