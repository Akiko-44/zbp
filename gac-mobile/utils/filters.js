import {
  orderState as orderStateMap
} from './status'
export {
  setImg,
  imageslim
}
from './qiniu'

export {
  ago,
  formatDate,
  timeDifference
}
from './time'
export {
  toFixed,
  toRound
}
from './shared'

export const lazyImgHtml = html =>
  html.replace(/<img.*?src=/gi, '<img data-src=')

// 业务filter
export const orderState = state => orderStateMap[state]

// 数组根据某个键去重
export function uniqueByKey(arr, key) {
  let hash = {};
  let result = arr.reduce((total, currentValue) => {
    if (!hash[currentValue[key]]) { //如果当前元素的key值没有在hash对象里，则可放入最终结果数组
      hash[currentValue[key]] = true; //把当前元素key值添加到hash对象
      total.push(currentValue); //把当前元素放入结果数组
    }
    return total; //返回结果数组
  }, []);
  return result;
}
