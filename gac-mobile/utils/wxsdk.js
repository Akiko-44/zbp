/**
 * 微信jssdk封装
 */
import axios from 'axios'
import { apiDomain, isDev } from './config'
import { browser } from './shared'

const service = axios.create({
  baseURL: apiDomain,
  // withCredentials: true,
  timeout: 10000
})

const jsApiList = [
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'onMenuShareQQ',
  'onMenuShareWeibo',
  'onMenuShareQZone',
  'chooseImage',
  'uploadImage'
]

// 获取微信配置的时间间隔
const time = 60 * 1000 * 2

// 开始时间
let date

export default {
  /**
   * 验证微信SDK配置
   * @param {String} url 授权链接
   */
  auth (url = encodeURIComponent(window.location.href.split('#')[0])) {
    return new Promise(resolve => {
      // 超过时间间隔则请求
      if (!date || Date.now() - date > time) {
        service({
          url: 'https://api.webfed.cn/mock/17/wx/config',
          method: 'get',
          params: {
            url
          }
        })
          .then(response => response.data)
          .then(result => {
            const data = result.data
            const config = {
              jsApiList,
              debug: isDev,
              appId: data.appId,
              timestamp: data.timestamp,
              nonceStr: data.nonceStr,
              signature: data.signature
            }
            window.wx.config(config)
            window.wx.ready(() => {
              resolve()
            })
            window.wx.error(res => {
              // window.alert(JSON.stringify(res))
            })
            // 更新时间
            date = Date.now()
          })
      } else {
        resolve()
      }
    })
  },
  /**
   * 分享到
   * @param {Object} options 分享信息
   */
  share (options) {
    if (!browser.weixin) return
    this.auth().then(() => {
      window.wx.onMenuShareTimeline(options)
      window.wx.onMenuShareAppMessage(options)
      window.wx.onMenuShareQQ(options)
      window.wx.onMenuShareWeibo(options)
      window.wx.onMenuShareQZone(options)
    })
  }
}
