import axios from 'axios';
import {BASIC_URL, AXIOS_TIME_OUT} from '@/api/paramsConfig';
import {getToken, logout} from '@/api/cache.js';
import store from '@/store/index';

let loadingInstance; // 创建Loading 的实例
// axios.defaults.timeout = AXIOS_TIME_OUT
axios.defaults.baseURL = BASIC_URL; // 配置axios请求的地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
// axios.defaults.headers.common['token'] = getToken() // 设置请求头为 Authorization

// 配置发送请求前的拦截器 可以设置token信息
axios.interceptors.request.use(config => {
  // loading开始
  config.headers.common['token'] = getToken();
  config.headers.common['coin'] = localStorage.getItem('coin') || 'HKD';
	config.headers.common['locale'] = localStorage.getItem('locale') || 'zh_TW';
  return config;
}, error => {
  // 出错，也要loading结束
  loadingInstance.close();
  return Promise.reject(error);
});

// 配置响应拦截器
axios.interceptors.response.use(
  res => {
    // loading结束
    // loadingInstance.close();
    // 这里面写所需要的代码
    if (res.data.code == '401') {
      // 全局登陆过滤，当判读token失效或者没有登录时 返回登陆页面
      logout();
     window.location.href = '/login';
      return false;
    }
    return Promise.resolve(res);
  }, error => {
    // loadingInstance.close();
    return Promise.reject(error);
  }
);

// 封装axios 的 get 方法
export function axiosGet(url, param = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${url}?timeSock=${new Date().getTime()}`,
      method: 'get',
      params: param
    }).then(
      res => {
        resolve(res.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

// 封装axios 的 post 方法
export function axiosPost(url, param = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'post',
      data: param,
      transformRequest: [function (data) {
        let ret = '';
        for (let it in data) {
          // 过滤空元素
          if (data[it] == '' || data[it] == null) {
            continue;
          }
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        }
        return ret;
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(
      res => {
        resolve(res.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

// 封装axios 的 post（不过滤） 方法
export function axiosPostAll(url, param = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'post',
      data: param,
      transformRequest: [function (data) {
        let ret = '';
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        }
        return ret;
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(
      res => {
        resolve(res.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

// // 创建axios实例
const service = axios.create({
  baseURL: BASIC_URL, // api的base_url
  timeout: 15000 // 请求超时时间2
});
service.interceptors.request.use(config => {
  // 在头信息中增加token
  var token = getToken();
  if (token) {
    config.headers['token'] = token;
  }
  config.headers['coin'] = localStorage.getItem('coin') || 'HKD';
	config.headers['locale'] = localStorage.getItem('locale') || 'zh_TW';
  return config;
}, error => {
  console.error(error); // for debug
  Promise.reject(error);
});

export const postJsonRequest = (requestUrl, params) => {
  return service({
    method: 'post',
    url: requestUrl,
    data: params
  });
};
