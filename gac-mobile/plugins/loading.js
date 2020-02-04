import Vue from 'vue'
import { Toast } from 'vant'

/**
 * 请求时显示 loading toast
 * @param {Function} service 接口函数
 */
function loading (service, message = '加载中') {
  Toast.loading({
    message,
    duration: 0
  })
  return service.then(response => {
    Toast.clear()
    return response
  })
}

Vue.prototype.$loading = loading
