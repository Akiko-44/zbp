import request from '@/utils/request'

// 消息列表
export function page(params) {
  return request({
    url: '/admin/portal/message/page?position=3',
    method: 'get',
    params
  })
}

// 订单消息列表
export function orderPage(params) {
  return request({
    url: '/api/order/orderMes/5/2',
    method: 'get',
    params
  })
}

// 其他通知
export function otherPage(params) {
  return request({
    url: '/admin/portal/message/goodsStock/3',
    method: 'get',
    params
  })
}
