export default {
  orderAddCart: ['/api/order/cart/add', 'post'],
  orderPayAdd: ['/api/order/payOrder/add', 'post'],
  orderCartList: ['/api/order/cart/list', 'get'],
  orderCartUpdate: ['/api/order/cart/update', 'post'],
  orderCartDelete: ['/api/order/cart/delete', 'post'],
  orderPage: ['/api/order/page', 'get'],
  orderInfo: ['/api/order/info', 'get'],
  orderSwapInfo: ['/api/order/swap/info', 'get'],
  orderSwapCancel: ['/api/order/swap/cancel', 'post'],
  orderDeleteCart: ['/api/order/cart/delete', 'post'],
  orderSubmit: ['/api/order/payOrder/add', 'post'],
  orderCoupons: ['/api/order/goodsCoupons', 'post'],
  orderReceive:['/api/order/receive','post'],
  orderExpressInfo:['/api/order/expressInfo','post'],
  orderSalePage:['/api/order/swap/sale/page','post'],
  orderAuctionPage:['/api/order/swap/auction/page','post'],
  orderSwapPage:['/api/order/swap/page','get'],
	orderCancel:['/api/order/cancel','post'],
	orderCancelCancel:['/api/order/revokeRequest','post'],
	orderRefundCancel:['/api/order/refund/cancel','post'],
	orderExpress:['/api/express/','post'],
	orderSend:['/admin/merchant/order/send','post'],
	orderCaution:['/api/order/swap/pay/caution','post'],
	orderSwapSend:['/api/order/swap/send','post'],
	orderSwapReceive:['/api/order/swap/receive', 'post'],
	orderSwapExpressInfo:['/api/order/swap/expressInfo','post'],
	orderSwapAgree: ['/api/order/swap/agree','post'],
	orderPayInTime: ['/api/order/payInTime', 'get'],
  orderContract: ['/api/order/contract', 'post'],
  orderUnreadNumber:['/api/order/unread/number','post'],
  orderCancelRefund:['/api/order/revokeRequest', 'post'],
  orderDelayedReceipt:['/api/order/delayedReceipt', 'get'],
  appPay:['/api/pay/pay_bill/app_pay','get'],
  appPayInfo:['/api/pay/pay_bill/info','get'],
  wechatPay:['/api/pay/pay_bill/public_pay','get']
}
