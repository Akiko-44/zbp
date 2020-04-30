export const finenessState = {
  3: '三成以下',
  4: '四成新',
  5: '五成新',
  6: '六成新',
  7: '七成新',
  8: '八成新',
  9: '九成新',
  10: '全新'
}

export const goodsState = {
  0: '待上架',
  1: '审核中',
  2: '上架中',
  3: '审核不通过',
  4: '已删除',
  10: '拍卖中',
  11: '竞拍成功',
  12: '拍卖已流拍，未达到保留价'
}

export const goodsSource = {
  1: '珠宝店',
  2: '互换销售',
  3: '拍卖',
  5: '设计师',
  6: '制造间',
  7: '图文馆'
}

// 订单状态
export const orderState = {
  // 公共状态：
  1: '待付款',
  2: '待发货', //已支付，待商家确认
  3: '待付款', // 设计师生成订单待商家确认
  4: '待发货',
  5: '待收货',
  6: '待评价',
  7: '已完成',
  8: '已取消',
  9: '已关闭',
  10: '退款申请中',
  11: '退款成功',
  12: '退款失败',
  13: '退货申请中',
  14: '退货成功',
  16: '待评价',
  17: '取消中',
  18: '退货失败',
  19: '同意退货',
  20: '商家待收货',
  21: '退款仲裁中',
  22: '退货仲裁中',
  23: '拼团中',
  24: '拼团成功',
  100: '待付款',
}

//售后状态
export const refundState = {
  0: '退款申请中', // 审核中
  1: '同意退货', //退款中，服务中
  2: '商家待收货', //退款中，商家同意退款，买家退货
  3: '退款成功',
  4: '退款失败',
  5: '已撤销',
  6: '退款失败', // 审核拒绝
  7: '退款仲裁中', // 仲裁中
  8: '退款成功', // 仲裁通过
  9: '退款失败', // 仲裁拒绝
  10: '仲裁退回',
  11: '退货失败'
}

// 是否允许取消订单
/*export const allowCancelOrder = state => [1, 42,44,43, 100,2, 41, 4].indexOf(+state) !== -1*/
// 是否允许取消订单
export const allowCancelOrder = (state, revoke) => {
  if (revoke == 0) {
    return [1, 100, 2, 3, 4, 23, 24].indexOf(+state) !== -1
  }
}
// 互换坊拍卖、互换是否允许取消订单
export const allowSwapCancelOrder = state => [1, 42, 44, 43, 100, 2, 41, 4].indexOf(+state) !== -1
// 是否允许付款
export const allowPayOrder = state => [1, 42, 100].indexOf(+state) !== -1
// 是否允许查看物流
export const allowLogistics = state => {
  const status = [100, 8, 7, 17, 11, 14, 23, 24] // 不在status范围里

  return +state >= 5 && status.indexOf(+state) === -1
}
// 是否允许发货
export const allowFollOrder = state => {
  const stauts = [2]
  return +state >= 43 && stauts.indexOf(+state) != -1
}
// 是否同意交换
export const allowOpen = state => {
  const status = [41]
  return status.indexOf(state) != -1
}
// 是否申请售后
export const allowAfterSales = (state, type) => {
  // if (type == 5 || type == 6 || type == 2 || type == 1) {
  return [5, 6, 16].indexOf(+state) !== -1
  // } else {
  //   return false
  // }
}
// 是否申请退款
export const allowRefund = (state, type, revoke) => {
  // if (type == 5 || type == 6 || type == 2 || type == 1) {
  if (revoke == 0 || revoke == 1 || revoke == 2 || revoke == 5 || revoke == 6 || revoke == 7) {
    return [5].indexOf(+state) !== -1
  }
  // } else {
  //   return false
  // }
}

// 是否允许撤销申请退款
/*export const allowCancelRefund = state => [10,13].indexOf(+state) !== -1*/
export const allowCancelRefund = (state, revoke) => {
  if (revoke == 0 || revoke == 1 || revoke == 2 || revoke == 5 || revoke == 6 || revoke == 7) {
    return [10].indexOf(+state) !== -1
  } else {
    return false
  }
}
// 是否申请退货
export const allowReturnGoods = (state, type, revoke) => {
  // if (type == 5 || type == 6 || type == 2 || type == 1) {
  if (revoke == 0 || revoke == 1 || revoke == 2 || revoke == 3 || revoke == 4) {
    return [6, 47, 48, 16, 18].indexOf(+state) !== -1
  }
  // } else {
  //   return false
  // }
}
// 是否允许撤销申请退货
/*export const allowCancelRefund = state => [10,13].indexOf(+state) !== -1*/
export const allowCancelReturnGoods = (state, revoke) => {
  if (revoke == 0 || revoke == 1 || revoke == 2 || revoke == 3 || revoke == 4) {
    return [13, 18].indexOf(+state) !== -1
  } else {
    return false
  }
}
// 取消申请
export const allowNoApplication = (state, type) => {
  // if (type == 5 || type == 6 || type == 2 || type == 1) {
  return [10].indexOf(+state) !== -1
  // } else {
  //   return false
  // }
}
// 查看详情
export const allowNoDetails = (state, type) => {
  // if (type == 5 || type == 6) {
  return [10].indexOf(+state) !== -1
  // } else {
  //   return false
  // }
}
// 是否允许确认收货
export const allowConfirmGoods = state => [5, 46, 47, 48].indexOf(+state) !== -1
// 是否允许评价
export const allowComment = state => [6, 47, 48, 16].indexOf(+state) !== -1
// 是否允许删除订单
export const allowDeleteOrder = state => [7, 9].indexOf(+state) !== -1

// 是否允许撤销取消订单
export const allowCancelCancel = state => [17].indexOf(+state) !== -1
// 是否允许延迟收货
export const allowdelayedReceipt = delayedReceipt => [0].indexOf(+delayedReceipt) !== -1
