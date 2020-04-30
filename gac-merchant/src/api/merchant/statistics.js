import request from '@/utils/request'

// 店铺评分
export function storeStar(type) {
  return request({
    url: `/admin/merchantStatistics/storeStar/${type}`,
    method: 'get'
  })
}

// 订单数量统计
export function orderView(type) {
  return request({
    url: `/admin/merchantStatistics/orderView/${type}`,
    method: 'get'
  })
}

// 销售额统计
export function saleStatistics(type) {
  return request({
    url: `/admin/merchantStatistics/saleView/${type}`,
    method: 'get'
  })
}

// 品牌统计
export function brandView(type) {
  return request({
    url: `/admin/merchantStatistics/brandView/${type}`,
    method: 'get'
  })
}

// 订单区域分布
export function areaView(type) {
  return request({
    url: `/admin/merchantStatistics/areaView/${type}`,
    method: 'get'
  })
}

// 支付方式
export function payView(type) {
  return request({
    url: `/admin/merchantStatistics/payView/${type}`,
    method: 'get'
  })
}