// 是否支持 webp 格式
export const isSupportWebp = (function isSupportWebp () {
  if (!process.server) {
    let elem = document.createElement('canvas')
    const isSupport =
      elem.getContext && elem.getContext('2d')
        ? elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
        : false
    elem = null

    return isSupport
  }
})()

export const isBase64Image = src => src.indexOf(';base64,') > 0

export function browserInfo (u) {
  return {
    // Chrome
    chrome: u.indexOf('Chrome') > -1 && u.indexOf('Edge') === -1,
    // IE
    trident: u.indexOf('Trident') > -1,
    // webkit 内核(Chrome , Safari)
    webkit: u.indexOf('AppleWebKit') > -1,
    // 火狐
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
    // 是否为移动终端
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
    // 是否为mac
    mac: u.indexOf('Mac') > -1,
    // ios终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    // android终端或者uc浏览器
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    // 是否为iPhone
    iPhone: u.indexOf('iPhone') > -1,
    iPad: u.indexOf('iPad') > -1,
    weixin: u.indexOf('MicroMessenger') > -1
  }
}

export const browser = (function browser () {
  if (!process.server) {
    const u = navigator.userAgent
    return browserInfo(u)
  }
})()

export function serialize (data) {
  return Object.keys(data)
    .map(keyName => {
      return keyName + '=' + data[keyName]
    })
    .join('&')
}

export function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export function noop () {}

// 是否支持 passive 属性
let supportsPassive = function () {
  let supports = false

  try {
    const options = Object.defineProperty({}, 'passive', {
      get: function () {
        supports = true
      }
    })
    window.addEventListener('testPassive', null, options)
    window.removeEventListener('testPassive', null, options)
  } catch (e) {}
  // 重写方法
  supportsPassive = function () {
    return supports
  }
  return supports
}

export function addListener (element, type, fn, options) {
  element.addEventListener(
    type,
    fn,
    supportsPassive()
      ? {
        capture: false,
        passive: true,
        once: false,
        ...options
      }
      : !!options
  )
}

export function removeListener (element, type, fn, options) {
  element.removeEventListener(type, fn, options)
}

export function toFixed (value, digits = 2) {
  return +value.toFixed(digits)
}

export function toRound (num) {
  var result = parseFloat(num);
 result = Math.round(num * 100) / 100;
 var s_x = result.toString();
 var pos_decimal = s_x.indexOf('.');
 if (pos_decimal < 0) {
 pos_decimal = s_x.length;
 s_x += '.';
 }
 while (s_x.length <= pos_decimal + 2) {
 s_x += '0';
 }
 return s_x;
}

/**
 * 是否为数字
 * @param {*} value 值
 */
export function isNumber (value) {
  return typeof value === 'number' && value !== Infinity && !isNaN(value)
}

/**
 * 获取目标节点的父级节点
 * @param {Element} el 目标节点
 * @param {String} parentSelector 父级节点选择器，仅支持类名
 */
export function getParents (el, parentSelector) {
  const parents = []

  if (!parentSelector) {
    return parents
  }

  let p = el.parentNode

  while (p !== null) {
    if (p.className && p.className.split(' ').indexOf(parentSelector) !== -1) {
      parents.push(p)
    }
    p = p.parentNode
  }
  return parents
}

export function jump (path, query) {
  location.href = location.origin + path + (query ? '?' + serialize(query) : '')
}
