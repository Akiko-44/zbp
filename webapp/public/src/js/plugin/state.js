window.g_const = {
  // 订单状态
  orderState: {
    1: '待付款',
    2: '已支付',
    3: '设计中&制造中',
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
    100: '待付款'
  },
  //售后状态
  refundState: {
    0: '审核中',
    1: '同意退货',
    2: '商家待收货',
    3: '退货款成功',
    4: '退货款失败',
    5: '已撤销',
    6: '审核拒绝',
    7: '仲裁中',
    8: '仲裁通过',
    9: '仲裁拒绝',
    10: '仲裁退回',
    11: '商家拒绝收货',
    12: '退款成功',
    13: '退款失败',
    14: '退货成功',
    15: '退货失败',
    16: '退款申请中',
    17: '退货申请中',
    18: '退款仲裁中',
    19: '退货仲裁中',
  },

  refundStateBtn: {
    "0": '<a class="btn btn-warning toCancelRefund">取消申请</a><p><a class="blue toRefundDetail">售后详情</a></p>',
    "1": '<a class="btn btn-warning toCancelRefund">取消申请</a><p><a class="blue toRefundDetail">售后详情</a></p>',
    "2": '<p><a class="blue toRefundDetail">售后详情</a></p>',
    "3": '<p><a class="blue toRefundDetail">售后详情</a></p>',
    "4": '<p><a class="blue toRefundDetail">售后详情</a></p>',
    "5": '<p><a class="blue toRefundDetail">售后详情</a></p>',
    "6": '<p><a class="blue toRefundDetail">售后详情</a></p>',
    "7": '<p><a class="blue toRefundDetail">售后详情</a></p>',
    "8": '<p><a class="blue toRefundDetail">售后详情</a></p>',
    "9": '<p><a class="blue toRefundDetail">售后详情</a></p>',
    "10": '<p><a class="blue toRefundDetail">售后详情</a></p>',
    "11": '<p><a class="blue toRefundDetail">售后详情</a></p>',
    "12": '<p><a class="blue toRefundDetail">售后详情</a></p>',
    "13": '<p><a class="blue toRefundDetail">售后详情</a></p>',
    "14": '<p><a class="blue toRefundDetail">售后详情</a></p>',
    "15": '<p><a class="blue toRefundDetail">售后详情</a></p>',
    "16": '<p><a class="blue toRefundDetail">售后详情</a></p>',
    "17": '<p><a class="blue toRefundDetail">售后详情</a></p>'
  },

  //支付方式
  payType: {
    "10": "支付宝",
    "11": "微信",
    //"12": "全民村",
    "3": "银联"
  },
  verifyNum: 0, //输入5次显示图形验证码
  domain: 'http://image.gacjc.com/'
}