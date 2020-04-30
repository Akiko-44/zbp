import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 900000 // request timeout
})

// 预防多次点击
const pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken = axios.CancelToken // 初始化取消请求的构造函数
let arr = [] // 区分是请求还是响应的头部
const removePending = (config, f) => {
  // arr = config.url
  arr = config.url.split('/blockChain')
  arr = arr[arr.length - 1]
  const flagUrl = arr + '&' + config.method
  if (pending.indexOf(flagUrl) !== -1) {
    if (f) {
      f()
    } else {
      pending.splice(pending.indexOf(flagUrl), 1)
    }
  } else {
    if (f) {
      pending.push(flagUrl)
    }
  }
}

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    // 预防多次点击
    if (config.method === 'post') {
      config.cancelToken = new CancelToken((c) => {
        removePending(config, c)
      })
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (response.config.method === 'post') {
      removePending(response.config)
    }
    const res = response.data

    // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    if (res.code === 55003) {
      // to re-login
      MessageBox.confirm('您已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
      return Promise.reject('error')
    } else if (response.status !== 200 || !res.success) {
      // if the custom code is not 20000, it is judged as an error.
      Message({
        message: res.msg || '出错了，请联系管理员',
        type: 'error',
        showClose: true
      })
      return Promise.reject(res.msg)
    } else {
      return res
    }
  },
  error => {
    const {
      config,
      code,
      message
    } = error
    console.log('err' + error) // for debug
    if (code === 'ECONNABORTED') {
      removePending(config)
      return Promise.reject(message)
    } else {
      if (message) {
        Message({
          message: message,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(message)
    }
  }
)

export default service
