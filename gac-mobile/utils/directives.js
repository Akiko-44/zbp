import { addListener, removeListener } from './shared'
import { DisabledScroll, scrollToEnd } from './page'
import { imageInfo, isQiniuImage } from './qiniu'

let timer = null

function scrollIntoView () {
  let count = 0
  clearInterval(timer)
  timer = setInterval(function () {
    scrollToEnd()
    count++
    if (count === 2) {
      clearInterval(timer)
    }
  }, 500)
}

// 解决虚拟键盘挡住 input 问题
export const scrollTo = {
  bind: function (el) {
    addListener(el, 'focus', scrollIntoView)
  },
  unbind: function (el) {
    removeListener(el, 'focus', scrollIntoView)
  }
}

// 阻止窗体滚动
export const disabledScroll = {
  bind: function (el, binding) {
    el.disabledScroll = new DisabledScroll(el, binding.value)
    el.disabledScroll.events('bind')
  },
  unbind: function (el) {
    el.disabledScroll.events('unbind')
    delete el.disabledScroll
  }
}

// 缓存
const width = {}

// 设置七牛IMG节点尺寸
export const size = {
  inserted: function (el, binding) {
    const { img, name } = binding.value
    if (!isQiniuImage(img)) return
    const info = imageInfo(img)
    const ratio = info.width / info.height

    if (info.uid) {
      el.width = width[name] || (width[name] = el.parentNode.offsetWidth)
      el.height = Math.floor(width[name] / ratio)
    }
  }
}
