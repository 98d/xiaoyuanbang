import axios from 'axios'
import {Notice, Message} from 'view-design';
import router from '../../router/index'

// 创建axios实例
const service = axios.create({
  timeout: 150000, // 请求超时时间
  baseURL: '/zuul'
});

export function successMessage(msg) {
  Message.success(msg);
}

export function errorMessage(msg) {
  Notice.error({
    title: '错误提示',
    desc: msg,
    duration: 6
  });
}

// Request 拦截器
service.interceptors.request.use((config) => {
  let token = sessionStorage.getItem('token')
  let userDeptCode = window.sessionStorage.getItem('userDeptCode')
  config.url = config.url + '/' + token + '/' + userDeptCode
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  return Promise.reject(error);
});

// Response 拦截器
service.interceptors.response.use(
  (response) => {
    const ret = response.data;
    if (ret.resultCode === '-9999') {
      router.replace('/login')
    }
    // 业务级异常
    if (response.status !== 200) {
      // errorMessage(ret.message);
      // return Promise.reject(ret); // 破坏promise链, reject之后的promise不在执行then(),而是直接调用catch()
    }
    return Promise.resolve(response);
  },
  (error) => {
    const ret = error.response;
    // 系统级异常
    if (ret.status === 400) {
      // errorMessage(ret.data.error_description || error.message); // 登陆失败、参数错误等
      errorMessage('参数错误')
    } else if (ret.status === 403 || ret.status === 401) {
      // errorMessage(ret.data.message); // 无访问权限
      errorMessage('无权限访问')
    } else {
      // errorMessage('异常：[' + error.message + ']');
      // errorMessage('服务器遇到错误，无法完成请求')
    }
    // return Promise.reject(error);
  }
);
export default service
