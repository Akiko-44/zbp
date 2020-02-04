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
  // withCredentials: true,
  // timeout: 10000, // request timeout
  baseURL: '' // api的base_url
})

// 预防多次点击
const pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const cancelToken = axios.CancelToken // 初始化取消请求的构造函数
let arr = [] // 区分是请求还是响应的头部
const removePending = (config, f) => {
  arr = config.url
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
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['Authorization'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  // 预防多次点击
  if (config.url !== '/api/qiniu/token' && config.url !== '/api/userCenter/merchantInfo/info' && config.url !== '/api/userCenter/info') {
    config.cancelToken = new cancelToken((c) => {
      removePending(config, c)
    })
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    // 预防多次点击
    // if (response.config.method === 'post') {
    removePending(response.config)
    // }
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data
    if (response.status === 401 || res.code === 9) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
      return Promise.reject('error')
    }
    if (res.status === 40301) {
      Message({
        message: '当前用户无相关操作权限！',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    }
    if (response.status !== 200 || !res.success) {
      if (response.config.url.indexOf('user/front/info') !== -1) {

      } else {
        Message({
          message: res.msg || '出错了，请联系管理员',
          type: 'error',
          // duration: 0,
          showClose: true
        })
      }

      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    if (error.message) {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  })

export default service
