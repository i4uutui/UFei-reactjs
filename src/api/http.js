import axios from 'axios';

import { message } from '../components/Popups';
import { getItem } from '../assets/js/storage.js';
var baseUrl = import.meta.env.VITE_APP_API_URL;
// let baseUrl = 'https://api2.ufei.center'
const http = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'source': 'web'
  },
  responseType: ''
})
// 请求拦截器
http.interceptors.request.use(config => {
  const token = getItem('token'); //查询本地是否有token
  if(token){
    config.headers.Authorization = token;
  }
  return config;
}, err => {
  return err;
})

// 响应拦截器
http.interceptors.response.use(res => {
  if(res.status == 200){
    const data = res.data;
    if(!data.succeed){
      message.error(data.error.description);
      if(data.error.code == 401){
        localStorage.clear();
        setTimeout(() => {
          window.location.hash="/login"
        }, 500);
        return
      }else{
        return data;
      }
    }
    
    return data;
  }else{
    message.error('错误码：' + res.status);
  }
}, err => {
  if(err.response){
    message.error('接口报' + err.response.status);
  }else{
    console.log('请求被中断');
  }
  
})
export { http, baseUrl }