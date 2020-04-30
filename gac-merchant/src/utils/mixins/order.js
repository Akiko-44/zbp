// 公共订单状态
export const orderState = {
  1: '待付款',
  2: '待确认',
  3: '待确认', // 设计师生成订单待商家确认
  4: '待发货',
  5: '待收货',
  6: '待评价',
  7: '已完成',
  8: '已取消',
  9: '已关闭',
  10: '退款待审核',
  11: '退款成功',
  12: '退款失败',
  13: '退货待审核',
  14: '退货成功',
  15: '已删除',
  16: '待评价',
  17: '用户取消订单',
  18: '退货失败',
  19: '买家待发货',
  20: '买家已发货',
  21: '退款仲裁中',
  22: '退货仲裁中',
  23: '拼团中',
  24: '拼团成功',
  // 17: '用户取消订单',
  // 互换订单状态：
  41: '待换出人确认',
  42: '待付款',
  43: '换入人已支付',
  44: '换出人已支付',
  45: '待发货',
  46: '换入人已发货',
  47: '换出人已发货',
  48: '待收货',
  49: '待换入已收货',
  50: '换出人已收货',
  100: '待付款'
}

// 审核状态
export const auditState = {
  0: '审核中',
  1: '待买家退货',
  2: '买家已退货',
  3: '退款成功',
  4: '退款失败',
  5: '用户取消',
  6: '审核拒绝',
  7: '仲裁中',
  8: '仲裁通过',
  9: '仲裁拒绝',
  10: '仲裁退回',
  11: '商家拒绝收货',
  12: '商家拒绝收货仲裁中',
  13: '商家拒绝退款、货',
  14: '商家拒绝收货'
}

// 互换订单状态：
export const exchangeOrderState = {
  ...orderState,
  41: '待换出人确认',
  42: '待付款',
  43: '换入人已支付',
  44: '换出人已支付',
  45: '待发货',
  46: '换入人已发货',
  47: '换出人已发货',
  48: '待收货',
  49: '待换入已收货',
  50: '换出人已收货'
}

export const goodsSource = {
  1: '珠宝店',
  2: '互换销售',
  3: '拍卖',
  5: '设计室',
  6: '制造间',
  7: '图文馆'
}

// 支付方式
export const payType = {
  '10': '支付宝',
  '11': '微信',
  // "12": "全民村",
  '3': '银联'
  // 1: '支付宝', 2: '微信', 3: '银联', 4: '通联支付'
}

// 是否可以取消订单
// export const allowCancelOrder = state => [1, 2, 100].indexOf(state) !== -1
export const allowCancelOrder = state => [1, 100].indexOf(state) !== -1
// 是否可以取消定制订单
export const allowCancelCustomOrder = state => [1, 3, 100].indexOf(state) !== -1
// 是否可以取消互换订单
export const allowCancelswapOrder = state => [41, 42, 43, 44, 45].indexOf(state) !== -1
// 开始设计
export const allowStartDesign = state => [2].indexOf(state) !== -1
// 完成设计
export const allowCompleteDesign = state => [3].indexOf(state) !== -1
// 发货
export const allowDelivery = state => [4].indexOf(state) !== -1
export const allowDeliveryNow = state => [2].indexOf(state) !== -1
// 完成订单
export const allowCompleteOrder = state => [6].indexOf(state) !== -1
