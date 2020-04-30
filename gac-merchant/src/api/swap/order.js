import request from '@/utils/request'

// 拍卖/销售/回收订单
export function page(data, params) {
  return request({
    url: '/admin/order/page',
    method: 'post',
    data,
    params
  })
}

// 拍卖/销售/回收订单取消
export function orderCancel(orderNo) {
  return request({
    url: `/admin/order/cancel/${orderNo}`,
    method: 'post'
  })
}

// 拍卖/销售/回收订单详情
export function orderInfo(orderNo) {
  return request({
    url: `/admin/order/info/${orderNo}`,
    method: 'get'
  })
}

// 互换订单
export function swapOrder(data, params) {
  return request({
    url: '/admin/order/swap/page',
    method: 'post',
    data,
    params
  })
}

// 互换订单取消
export function swapOrderCancel(orderNo) {
  return request({
    url: `/admin/order/swap/cancel/${orderNo}`,
    method: 'post'
  })
}

export function swapOrderInfo(orderNo) {
  return request({
    url: '/admin/order/swap/info/' + orderNo,
    method: 'get'
  })
}
