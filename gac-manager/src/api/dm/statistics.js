import request from '@/utils/request'

/**
 * 订单数据
 */
export function order(type) {
  return request({
    url: `/admin/orderStatistics/order/${type}`,
    method: 'get'
  })
}

export function dayOrder(type, params) {
  return request({
    url: `/admin/orderStatistics/dayOrder/${type}`,
    method: 'get',
    params
  })
}


export function topOrder(type) {
  return request({
    url: `/admin/orderStatistics/topOrder/${type}`,
    method: 'get'
  })
}

/**
 * 销售数据
 */
export function saleDate(type) {
  return request({
    url: `/admin/orderStatistics/saleDate/${type}`,
    method: 'get'
  })
}

export function daySale(type, params) {
  return request({
    url: `/admin/orderStatistics/daySale/${type}`,
    method: 'get',
    params
  })
}


export function topSale(type) {
  return request({
    url: `/admin/orderStatistics/topSale/${type}`,
    method: 'get'
  })
}

/**
 * 商品数据
 */
export function goodsDate(type, params) {
  return request({
    url: `/admin/orderStatistics/goodsDate/${type}`,
    method: 'get',
    params
  })
}

/**
 * 商家数据
 */
export function merchantDate(type, params) {
  return request({
    url: `/admin/orderStatistics/merchantDate/${type}`,
    method: 'get',
    params
  })
}
