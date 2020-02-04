import axios from 'axios'
import shortid from 'js-shortid'
import { getToken as getUserToken } from '~/utils/auth'
import { isBase64Image, isSupportWebp } from './shared'
import { apiDomain } from './config'

const service = axios.create({
  baseURL: apiDomain,
  // withCredentials: true,
  timeout: 10000
})

// 获取token的时间间隔，没有超过此时间则取缓存数据
const time = 60 * 1000 * 0.5

// 开始时间
let date

// 响应数据缓存
let token

const fail = () => alert('上传出错，请重试')

service.interceptors.request.use(
  config => {
    config.headers['Authorization'] = getUserToken()
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

export function getToken () {
  return new Promise((resolve, reject) => {
    // 超过时间则请求
    if (!date || Date.now() - date > time) {
      service({
        url: '/api/qiniu/token',
        method: 'get'
      })
        .then(response => {
          const result = response.data
          if (result.success) {
            token = result.data
            // 更新时间
            date = Date.now()
            resolve(token)
          } else {
            reject(new Error(result.msg))
          }
        })
        .catch(fail)
    } else {
      resolve(token)
    }
  })
}

/*export async function upload (key, file, cb) {
  const token = await getToken()
  const data = new FormData()
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: progressEvent => {
      const complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0
      cb(complete)
    }
  }
  data.append('file', file)
  data.append('token', token)
  data.append('key', key)
  return axios.post(uploadDomain, data, config)
}*/
export async function upload (file, cb) {
  const data = new FormData()
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: progressEvent => {
      const complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0
      cb(complete)
    }
  }
  data.append('file', file, '.jpg')
  return axios.post(uploadDomain, data, config)
}

export async function customUpload (file) {
  const data = new FormData()
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  }
  data.append('file', file, '.jpg')
  return axios.post(uploadDomain, data, config)
}

export function getKey (prefix, img, type) {
  return `${prefix}_${shortid.uuid()}_${img.width}_${img.height}.${type}`
}

// 是否为七牛域名上的图片
export function isQiniuImage (src) {
  if (!src) return false
  return !(
    src.indexOf('blob:') !== -1 ||
    src.indexOf('http') !== -1 ||
    src.indexOf('/_nuxt') !== -1 ||
    isBase64Image(src)
  )
}

// 获取图片信息
export function imageInfo (key) {
  if (!isQiniuImage(key)) return {}
  const info = key.split('.')[0].split('_')
  return {
    name: info[0],
    uid: info[1],
    width: +info[2],
    height: +info[3]
  }
}

const format = isSupportWebp ? 'webp' : 'jpg'

// 七牛图片属性设置
export function setImg (key, options) {
  if (!isQiniuImage(key)) return key

  let query = '?imageView2/2'

  options = Object.assign({ format }, options)

  for (const prop in options) {
    query += `/${prop}/${options[prop]}`
  }

  return domain + '/' + key + query
}

/**
 * 七牛图片瘦身
 * https://developer.qiniu.com/dora/api/image-thin-body-imageslim
 */
export function imageslim (src) {
  if (!isQiniuImage(src)) return src
  return domain + '/' + src + '?imageslim'
}

// 图片域名http:
//export const domain = 'http://pa95ui71l.bkt.clouddn.com'
export const domain = 'http://image.gacjc.com'

// 上传接口地址
/*export const uploadDomain = 'http://up-z2.qiniup.com/'*/
export const uploadDomain = '/api/pic/upload'