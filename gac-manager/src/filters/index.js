// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils'
import { domain } from '@/api/qiniu'
import { isBase64Image, isSupportWebp } from '@/utils'

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function formatDate(timestamp, fmt) {
  const date = new Date(timestamp)
  var o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      if (k === 'y+') {
        fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length))
      } else if (k === 'S+') {
        var lens = RegExp.$1.length
        lens = lens === 1 ? 3 : lens
        fmt = fmt.replace(RegExp.$1, ('00' + o[k]).substr(('' + o[k]).length - 1, lens))
      } else {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
  }
  return fmt
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function round(num){ 
    return parseFloat(num).toFixed(2)
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

const format = isSupportWebp ? 'webp' : 'jpg'

// 七牛图片属性设置
export function setImg(key, options) {
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
export function imageslim(src) {
  if (!isQiniuImage(src)) return src
  return domain + '/' + src + '?imageslim'
}

// 是否为七牛域名上的图片
function isQiniuImage(src) {
  return !(
    src.indexOf('blob:') !== -1 ||
    src.indexOf('http') !== -1 ||
    isBase64Image(src)
  )
}
