import {
  apiDomain
} from './config'
import {
  jump
} from '~/utils/shared'
import {
  setToken,
  getToken,
  AppToken,
  isAppToken,
  wechatToken,
  isWechatToken,
  removeToken
} from '~/utils/auth'
import {
  Toast
} from 'vant'
import axios from 'axios'
import {
  native
} from '~/plugins/native'

const showWarning = message => !process.server && Toast(message)

const service = axios.create({
  baseURL: apiDomain,
  // withCredentials: true,
  timeout: 15000
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
      f('您的操作过于频繁，稍后重试!')
    } else {
      pending.splice(pending.indexOf(flagUrl), 1)
    }
  } else {
    if (f) {
      pending.push(flagUrl)
    }
  }
}

service.interceptors.request.use(
  config => {
    if (isAppToken('Authorization')) {
      config.headers['Authorization'] = AppToken('Authorization')
      setToken(AppToken('Authorization'))
    } else if (isWechatToken('Authorization')) {
      config.headers['Authorization'] = wechatToken('Authorization')
      setToken(wechatToken('Authorization'))
      $nuxt.$store.commit('user/setToken', wechatToken('Authorization'))
    } else {
      config.headers['Authorization'] = getToken()
    }
    // if (config.url === '/api/goldRecycle/token') {
    config.headers['reqSrc'] = 'h'
    // }
    if (config.method === 'post') {
      config.cancelToken = new cancelToken((c) => {
        removePending(config, c)
      })
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(new Error(error))
  }
)

service.interceptors.response.use(
  response => {
    if (response.config.method === 'post') {
      removePending(response.config)
    }
    const data = response.data

    if (data.code === 9 || data.code === 10 || data.code === 11) {
      if (native.isApp()) {
        native.goToLogin()
      } else {
        // jump('/user/login', {
        //   from: location.href
        // })
        removeToken()
        jump('/user/login')
        localStorage.setItem('fromUrl', location.href)
      }
      return Promise.reject(new Error('登录超时'))
    }

    if (location.href.indexOf('src=luckDrawWeb') > -1) {
      return data
    }

    if (response.status !== 200 || !data.success) {
      const msg = data.msg || '服务出错'
      showWarning(msg)
      return Promise.reject(new Error(msg))
    }

    return data
  },
  error => {
    const {
      config,
      code,
      message
    } = error
    if (code === 'ECONNABORTED') {
      removePending(config)
      // showWarning(message)
      return Promise.reject(message)
    } else {
      showWarning(message)
      return Promise.reject(message)
    }
  }
)

export default function requestWrapper(api) {
  return function request(name, options, config) {
    if (!api[name]) console.log(`不存在的接口：'${name}'`)

    let [url, method] = api[name]
    let {
      data,
      resources,
      params,
      postData
    } = Object.assign({
        data: {},
        params: {},
        resources: [],
        postData: {}
      },
      options
    )

    if (method === 'get') {
      data = {
        params: Object.assign(data, params)
      }
    }
    if (method === 'post' && Object.keys(params).length) {
      data.params = params
    }

    if (resources.length) {
      url += '/' + resources.join('/')
    }

    if (method === 'post' && Object.keys(postData).length) {

      url += '?offset=' + postData.offset + '&limit=' + postData.limit
    }

    return service[method](url, data, config)
  }
}
