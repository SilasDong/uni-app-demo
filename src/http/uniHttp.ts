import Vue from 'vue'
import store from '@/store'
import { getObjType, timeout } from '@/utils'
import { showLoading, hideToast, hideLoading, showToast } from '@/utils/ui'
import Http from '.'

const http = new Http()
// 设置默认请求头
http.config.headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'x-Agent': 'xinchidao'
}
// 请求超时的时间限制
// fly.config.timeout = 15000
const idDev = process.env.NODE_ENV === 'development'
const isH5 = process.env.VUE_APP_PLATFORM === 'h5'
if (idDev) {
  http.config.baseURL = 'https://demo.xxxx.com'
} else {
  http.config.baseURL = isH5 ? '/' : 'https://demo.xxxx.com'
}

// 设置错误请求文字
const errorMessage = '网络请求错误，请检查网络连接在重试'

// 开始设置请求 发起的拦截处理
// config 代表发起请求的参数的实体
http.interceptors.request((config: any) => {
  if (store.getters.token) {
    config.headers['x-token'] = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  if (store.getters.sessionId) {
    config.headers.Cookie = store.getters.sessionId // 设置sessionId
  }
  if (config.method === 'post') {
    // 清除数据中的前后空格
    if (getObjType(config.data) !== 'string') {
      for (const item in config.data) {
        if (config.data[item] && typeof config.data[item] === 'string' && config.data.hasOwnProperty(item)) {
          config.data[item] = config.data[item].trim()
        }
      }
    }
  } else {
    // 清除数据中的前后空格
    if (getObjType(config.data) !== 'string') {
      for (const item in config.params) {
        if (config.params[item] && typeof getObjType(config.data) !== 'string'
          && config.params.hasOwnProperty(item)) {
          config.params[item] = config.params[item].trim()
        }
      }
    }
  }

  const time = timeout(() => {
    showLoading({ title: '数据加载中'})
  }, 1000)
  config.toast = time
  return config
})

// 请求到结果的拦截处理
http.interceptors.response((res: any, config: any, err: any) => {
  // if (res.config.url.includes('m-mysql-backUp-download')) {
  //     console.log('object', res)
  // }
  clearTimeout(config.toast)
  timeout(() => { hideLoading() }, 1100)
  if (!res) {
    Promise.reject(err)
    return
  }
  const code = res.data.code
  if (code !== undefined && code !== 9999) {
    let message = res && res.data.message
    if (code === 11003 || code === 11004 || code === 11006 || code === 11001) {
      message = '登录信息过期，请重新登录'
      store.dispatch('FedLogOut')
    }
    if (code === 500 && process.env.NODE_ENV !== 'development') {
      res.message = ''
    }
    if (res.optionMsg && process.env.NODE_ENV === 'development') {
      message += `【optionMsg】${res.optionMsg}`
    }
    message = message || errorMessage
    setTimeout(() => {
      showToast({ title: message })
    }, 100)
    return Promise.reject(new Error(message))
  }
  return Promise.resolve(res.data)
})
export default http
