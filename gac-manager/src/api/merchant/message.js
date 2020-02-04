import request from '@/utils/request'

// 消息列表 3设计室 4制造间
export function page(params, flag) {
  return request({
    url: `/admin/portal/message/page?position=${flag}`,
    method: 'get',
    params
  })
}

// 订单消息列表 5设计室 6制造间
export function orderPage(params, flag) {
  return request({
    url: `/api/order/orderMes/${flag}/2`,
    method: 'get',
    params
  })
}

// 其他通知 3设计室 2制造间
export function otherPage(params, flag) {
  return request({
    url: `/admin/portal/message/goodsStock/${flag}`,
    method: 'get',
    params
  })
}
