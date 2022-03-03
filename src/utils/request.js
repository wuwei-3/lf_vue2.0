/*
 * @Description: 统一请求分发
 * @Version: 2.0
 * @Autor: wlg
 * @Date: 2021-06-17 08:44:31
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-03 19:42:41
 */
import axios from 'axios';
import { message } from 'ant-design-vue';

axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';

let time = null;

const httpRequest = axios.create();

httpRequest.interceptors.request.use(
  (config) => {
    // config['Authorization'] = localStorage.getItem('token')
    return config;
  },
  (error) => {
    // 这里错误不做任何处理，通常404错误居多
    return Promise.reject(error);
  }
);

httpRequest.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    return errorCatch(error);
  }
);
/**
 * @description: 如果你想手动关闭默认messge提示，自定义提示，你可以在对象catch中close.destroy() ， 例子参考登录接口回调
 * @param {*} val 请求返回对象
 * @param {*} msg 提示语
 * @return {*} reject 对象
 */
function errorCatch (val, msg) {
  // 这里用了防抖，避免一次抛出多个错误提示
  if (time) {
    return;
  }
  let err;
  let _msg = ''
  time = setTimeout(() => {
    clearTimeout(time);
    time = null;
    const ermsg = JSON.stringify(val);
    if (ermsg.includes('timeout')) {
      _msg = '当前网络不稳定，请检查你的网络设置';
    }
    err = {
      ...val,
      message: msg ? message.error(msg) : message.error(_msg || '系统开小差了哦'),
      close: message, // 整个message对象
    };
  }, 1000);

  return Promise.reject(err);
}

export default httpRequest;
