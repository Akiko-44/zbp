import request from '@/utils/request'

// 查询所有类型的订单详情
export function orderInfo(orderNo) {
  return request({
    url: `/admin/order/info/${orderNo}`,
    method: 'get'
  })
}

export function modifyPrice(data) {
  return request({
    url: `/admin/order/modifyOrder`,
    method: 'post',
    data
  })
}

// 设计室制造间运营平台/商户平台订单列表查询
// orderFlag 订单类别：1、平台；2、商户
export function page(orderFlag, data, params) {
  return request({
    url: `/admin/order/designcase/page/${orderFlag}`,
    method: 'post',
    data,
    params
  })
}

// 珠宝店订单列表
export function getJewelryOrder(data) {
  return request({
    url: '/admin/order/jewelry/page',
    method: 'post',
    data
  })
}

// 商家取消订单列表
export function merchantPage(data, params) {
  return request({
    url: `/admin/merchant/order/page`,
    method: 'post',
    data,
    params
  })
}

// 平台退款单列表
export function refundPage(data, params) {
  return request({
    url: '/admin/order/refund/platform/page',
    method: 'post',
    data,
    params
  })
}

// 平台仲裁列表
export function arbitrationPage(data, params) {
  return request({
    url: '/admin/order/arbitrationPage',
    method: 'post',
    data,
    params
  })
}

// 平台退款单详情
export function refundInfo(id) {
  return request({
    url: `/admin/order/refund/platform/info/${id}`,
    method: 'get'
  })
}

// 平台审核退款单
export function auditRefund(data) {
  return request({
    url: `/admin/order/refund/platform/audit`,
    method: 'post',
    data
  })
}

// 平台审核仲裁
export function auditArbitrate(data) {
  return request({
    url: `/admin/order/arbitrationAudit`,
    method: 'post',
    data
  })
}

// 商户退款单列表
export function merchantRefundPage(data, params) {
  return request({
    url: '/admin/order/refund/merchant/page',
    method: 'post',
    data,
    params
  })
}

// 商户退款单详情
export function merchantRefundInfo(id) {
  return request({
    url: `/admin/order/refund/merchant/info/${id}`,
    method: 'get'
  })
}

// 商户审核退款单
export function merchantAuditRefund(data) {
  return request({
    url: `/admin/order/refund/audit`,
    method: 'post',
    data
  })
}

// 商户确认订单
export function confirmOrder(orderNo) {
  return request({
    url: `/admin/merchant/order/confirm/${orderNo}`,
    method: 'post'
  })
}

// 商户取消订单
export function cancelOrder(orderNo, reasons) {
  return request({
    //  url: `/admin/merchant/order/cancel/${orderNo}/${reasons}`,
    url: '/admin/merchant/order/cancel/' + orderNo + '/' + reasons,
    method: 'post'
  })
}

// 商户同意取消订单
export function agreeCancel(orderNo) {
  return request({
    url: '/admin/merchant/order/agreeCancel/' + orderNo,
    method: 'post'
  })
}

// // 商户审核同意退款
// export function agreeRefund(orderNo) {
// return request({
//  url: `/admin/merchant/order/agreeCancel/${orderNo}`,
//  method: 'post'
// })
// }

// 商户申请仲裁
export function applyArbitrate(data) {
  return request({
    url: `/api/order/arbitrationAdd`,
    method: 'post',
    data
  })
}

// 商户延迟收货
export function refundDelayedReceipt(id) {
  return request({
    url: '/api/order/refundDelayedReceipt/' + id,
    method: 'get'
  })
}

/** ****** 以下为商家订单相关操作 *******/

// 开始设计
export function startDesign(orderNo, data) {
  return request({
    url: `/admin/merchant/order/confirm/${orderNo}`,
    method: 'post',
    data
  })
}

// 完成设计
export function completeDesign(orderNo, data) {
  return request({
    url: `/admin/merchant/order/designFinish/${orderNo}`,
    method: 'post',
    data
  })
}

// 发货
export function delivery(orderNo, data) {
  return request({
    url: `/admin/merchant/order/send/${orderNo}`,
    method: 'post',
    data
  })
}

// 完成订单
export function completeOrder(orderNo, data) {
  return request({
    url: `/admin/merchant/order/finish/${orderNo}`,
    method: 'post',
    data
  })
}

// 物流公司
export function express() {
  return request({
    url: `/admin/merchant/order/express`,
    method: 'post'
  })
}

// 物流详情
export function getExpressCompanyInfo(com, num) {
  return request({
    url: '/api/express/getExpressCompanyInfo/' + com + '/' + num,
    method: 'post'
  })
}

export function updateExpressNum(data) {
  return request({
    url: '/admin/merchant/order/updateExpressNum',
    method: 'post',
    data
  })
}

// 确认收货
export function refunAmount(refundId) {
  return request({
    url: '/admin/order/refund/refundAmount/' + refundId,
    method: 'get'
  })
}

// 查看物流
export function lookExpress(orderId) {
  return request({
    url: '/api/order/expressInfo/' + orderId,
    method: 'post'
  })
}

export function lookRefundExpress(orderId) {
  return request({
    url: '/api/refund/express/info/' + orderId,
    method: 'post'
  })
}

export function expressMap() {
  return request({
    url: '/admin/merchant/order/expressMap',
    method: 'get'
  })
}
