import request from '@/utils/request'

// 商品信息
export function goodsStatistics(type) {
  return request({
    url: `/admin/merchantStatistics/goods/${type}`,
    method: 'get'
  })
}

// 交易提示
export function orderStatistics(type) {
  return request({
    url: `/admin/merchantStatistics/order/${type}`,
    method: 'get'
  })
}

// 销售统计
export function saleStatistics(type) {
  return request({
    url: `/admin/merchantStatistics/sale/${type}`,
    method: 'get'
  })
}

// 商品销售统计
export function goodsTopStatistics(type) {
  return request({
    url: `/admin/merchantStatistics/goodsTop/${type}`,
    method: 'get'
  })
}

// 店铺动态评分
export function storeStarStatistics(type) {
  return request({
    url: `/admin/merchantStatistics/storeStar/${type}`,
    method: 'get'
  })
}
