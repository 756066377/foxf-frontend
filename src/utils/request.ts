import axios from 'axios';
import { useUserStore } from '../stores/user';

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api', // 从环境变量获取 API 地址
  timeout: 15000, // 请求超时时间
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`;
    }
    return config;
  },
  (error) => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 406) {
      console.error('请求被拒绝:', error);
    }
    return Promise.reject(error);
  }
);

export default request; 