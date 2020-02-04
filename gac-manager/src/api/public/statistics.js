import request from '@/utils/request'

/**
 * 运营数据统计汇总
 */
export function operationDataStatisticsTotal(type, params) {
  return request({
    url: `/admin/orderStatistics/operationDataStatisticsTotal/${type}`,
    method: 'get',
    params
  })
}
/**
 * 运营数据统计列表
 */
export function operationDataStatisticsList(type, isExport, params) {
  return request({
    url: `/admin/orderStatistics/operationDataStatisticsList/${type}/${isExport}`,
    method: 'get',
    params
  })
}

/**
 * 会员查询
 */
export function memberData(isExport, params) {
  return request({
    url: `/admin/orderStatistics/memberData/${isExport}`,
    method: 'get',
    params
  })
}

/**
 * 商家查询汇总
 */
export function merchantDataTotal(type, params) {
  return request({
    url: `/admin/orderStatistics/merchantDataTotal/${type}`,
    method: 'get',
    params
  })
}

/**
 * 商家查询列表
 */
export function merchantDataList(type, isExport, params) {
  return request({
    url: `/admin/orderStatistics/merchantDataList/${type}/${isExport}`,
    method: 'get',
    params
  })
}

/**
 * 商品统计汇总
 */
export function goodsStatisticsTotal(type, params) {
  return request({
    url: `/admin/orderStatistics/goodsStatisticsTotal/${type}`,
    method: 'get',
    params
  })
}

/**
 * 商品统计列表
 */
export function goodsStatisticsList(type, isExport, params) {
  return request({
    url: `/admin/orderStatistics/goodsStatisticsList/${type}/${isExport}`,
    method: 'get',
    params
  })
}

/**
 * 商品查询汇总
 */
export function goodsDataTotal(type, params) {
  return request({
    url: `/admin/orderStatistics/goodsDataTotal/${type}`,
    method: 'get',
    params
  })
}

/**
 * 商品查询列表
 */
export function goodsDataList(type, isExport, params) {
  return request({
    url: `/admin/orderStatistics/goodsDataList/${type}/${isExport}`,
    method: 'get',
    params
  })
}

/**
 * 订单统计汇总
 */
export function orderStatisticsTotal(type, params) {
  return request({
    url: `/admin/orderStatistics/orderStatisticsTotal/${type}`,
    method: 'get',
    params
  })
}

/**
 * 订单统计列表
 */
export function orderStatisticsList(type, isExport, params) {
  return request({
    url: `/admin/orderStatistics/orderStatisticsList/${type}/${isExport}`,
    method: 'get',
    params
  })
}

/**
 * 订单查询汇总
 */
export function orderDataTotal(type, params) {
  return request({
    url: `/admin/orderStatistics/orderDataTotal/${type}`,
    method: 'get',
    params
  })
}

/**
 * 订单查询列表
 */
export function orderDataList(type, isExport, params) {
  return request({
    url: `/admin/orderStatistics/orderDataList/${type}/${isExport}`,
    method: 'get',
    params
  })
}

/**
 * 商家数据（以前）
 */
export function merchantDate(type, params) {
  return request({
    url: `/admin/orderStatistics/merchantDate/${type}`,
    method: 'get',
    params
  })
}

/**
 * 会员数据（以前）
 */
export function userDate(type, params) {
  return request({
    url: `/admin/orderStatistics/userDate/${type}`,
    method: 'get',
    params
  })
}

/**
 * 珠宝圈统计
 */
export function jewelryContentDate(params) {
  return request({
    url: '/admin/jewelryContent/statistics/page',
    method: 'get',
    params
  })
}
