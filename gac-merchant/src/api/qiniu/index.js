import { guid } from '@/utils'
import request from '@/utils/request'

// 获取token的时间间隔，没有超过此时间则取缓存数据
const time = 60 * 1000 * 0.5

// 开始时间
let date

// 响应数据缓存
let token

export function getToken() {
  return new Promise(resolve => {
    // 超过时间则请求接口
    if (!date || Date.now() - date > time) {
      request({
        url: '/api/qiniu/token',
        method: 'get'
      }).then(result => {
        token = result.data
        // 更新时间
        date = Date.now()
        resolve(token)
      })
    } else {
      resolve(token)
    }
  })
}

export function getKey(prefix, width, height, type) {
  // {prefix}_{id}_{width}_{height}.{imageType}
  return `${prefix}_${guid()}_${width}_${height}.${type}`
}

//export const domain = 'http://pa95ui71l.bkt.clouddn.com'
export const domain = 'http://image.gacjc.com'
export const uploadUrl = 'http://up-z2.qiniup.com/'
