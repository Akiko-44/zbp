import {
  addListener,
  removeListener,
  browser,
  getParents
} from './shared'

// 全局导航栏高度，为0则不显示导航栏，在微信等内嵌浏览器不显示导航栏
export const navHeight = browser && browser.weixin ? 0 : 46

export function getScrollTop() {
  return (
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop
  )
}

// 禁止双击放大页面
export function disabledScale() {
  let lastTouchEnd = 0
  document.addEventListener(
    'touchend',
    e => {
      let now = Date.now()
      if (now - lastTouchEnd <= 300) {
        e.preventDefault()
      }
      lastTouchEnd = now
    },
    false
  )
}

export function scrollToEnd() {
  window.scrollTo(0, document.body.scrollHeight)
}

/**
 * 阻止窗体滚动
 * http://www.zhangxinxu.com/study/201612/mobile-scroll-prevent-window-scroll.html
 * @param {Element} container 绑定容器
 * @param {String} selectorScrollable 滚动容器选择器，不支持ID选择器
 */
export class DisabledScroll {
  constructor(container, selectorScrollable) {
    this.data = {
      posY: 0,
      maxscroll: 0
    }
    this.container = container
    this.selectorScrollable = selectorScrollable
    this.elScroll = null
    this.touchstart = this.touchstart.bind(this)
    this.touchmove = this.touchmove.bind(this)
    this.touchend = this.touchend.bind(this)
  }
  touchstart(event) {
    const events = event.touches[0] || event

    // 先求得是不是滚动元素或者滚动元素的子元素
    const elTarget = event.target

    let elScroll

    // 获取标记的滚动元素，自身或子元素皆可
    if (elTarget.className.split(' ').indexOf(this.selectorScrollable) !== -1) {
      elScroll = elTarget
    } else if (!(elScroll = getParents(elTarget, this.selectorScrollable)[0])) {
      elScroll = null
    }

    if (!elScroll) {
      return
    }

    // 当前滚动元素标记
    this.elScroll = elScroll

    // 垂直位置标记
    this.data.posY = events.pageY
    this.data.scrollY = elScroll.scrollTop
    // 是否可以滚动
    this.data.maxscroll = elScroll.scrollHeight - elScroll.clientHeight
  }
  touchmove(event) {
    // 如果不足于滚动，则禁止触发整个窗体元素的滚动
    if (this.data.maxscroll <= 0) {
      // 禁止滚动
      event.preventDefault()
    }
    // 滚动元素
    const elScroll = this.elScroll
    if (!elScroll) {
      return
    }
    // 当前的滚动高度
    const scrollTop = elScroll.scrollTop

    // 现在移动的垂直位置，用来判断是往上移动还是往下
    const events = event.touches[0] || event
    // 移动距离
    const distanceY = events.pageY - this.data.posY

    // 上下边缘检测
    if (distanceY > 0 && scrollTop === 0) {
      // 往上滑，并且到头
      // 禁止滚动的默认行为
      event.preventDefault()
      return
    }

    // 下边缘检测
    if (distanceY < 0 && scrollTop + 1 >= this.data.maxscroll) {
      // 往下滑，并且到头
      // 禁止滚动的默认行为
      event.preventDefault()
      return false
    }
  }
  touchend() {
    this.data.maxscroll = 0
    // 不能去除CHROME的警告，不管用，待解决
    return true
  }
  /**
   * 绑定/卸载事件
   * @param {String} type bind / unbind
   */
  events(type) {
    const action = type === 'bind' ? addListener : removeListener
    action(this.container, 'touchstart', this.touchstart)
    action(this.container, 'touchmove', this.touchmove, {
      passive: false
    })
    action(this.container, 'touchend', this.touchend)

    if (type === 'bind') {
      // 防止多次重复绑定
      this.container.setAttribute('isBindScroll', true)
    } else {
      this.container.removeAttribute('isBindScroll')
      // 解除引用
      this.elScroll = null
      this.container = null
    }
  }
}

// 瀑布流布局
export function waterfall(parent, pin) {
  var oParent = document.querySelector(parent);
  if (!oParent) return;
  var aPin = getClassObj(oParent, pin); // 获取存储块框pin的数组aPin
  if (!aPin.length) {
    oParent.style.height = "0";
    return;
  }
  var iPinW = aPin[0].offsetWidth; // 一个块框pin的宽
  var num = Math.floor(document.documentElement.clientWidth / iPinW); //每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
  // oParent.style.cssText = 'width:' + iPinW * num + 'px;margin:0 auto;';//设置父级居中样式：定宽+自动水平外边距

  var pinHArr = []; //用于存储 每列中的所有块框相加的高度。a
  for (var i = 0; i < aPin.length; i++) {
    //遍历数组aPin的每个块框元素
    var pinH = aPin[i].offsetHeight;
    if (i < num) {
      pinHArr[i] = pinH; //第一行中的num个块框pin 先添加进数组pinHArr
    } else {
      var minH = Math.min.apply(null, pinHArr); //数组pinHArr中的最小值minH
      var minHIndex = getminHIndex(pinHArr, minH);
      aPin[i].style.position = "absolute"; //设置绝对位移
      aPin[i].style.top = minH + "px";
      aPin[i].style.left = aPin[minHIndex].offsetLeft + "px";
      //数组 最小高元素的高 + 添加上的aPin[i]块框高
      pinHArr[minHIndex] += aPin[i].offsetHeight; //更新添加了块框后的列高
    }
  }
  oParent.style.height = Math.max.apply(null, pinHArr) + "px";
}
/*
 *通过父级和子元素的class类 获取该同类子元素的数组
 */
function getClassObj(parent, className) {
  var obj = parent.getElementsByTagName("*"); //获取 父级的所有子集
  var pinS = []; //创建一个数组 用于收集子元素
  for (var i = 0; i < obj.length; i++) {
    //遍历子元素、判断类别、压入数组
    if (obj[i].className == className) {
      pinS.push(obj[i]);
    }
  }
  return pinS;
}
/****
 *获取 pin高度 最小值的索引index
 */
function getminHIndex(arr, minH) {
  for (var i in arr) {
    if (arr[i] == minH) {
      return i;
    }
  }
}
