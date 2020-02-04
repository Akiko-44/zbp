export default {
  refundPage: ['/api/order/refund/page', 'post'],
  refundCancel: ['/api/order/refund/cancel', 'post'],
  refundAddr: ['/api/order/refundAddr', 'get'],
  refundInfo: ['/api/order/refund/info', 'get'],
  refundExpressInfo: ['/api/refund/express/info', 'post'],
  expressMap: ['/api/express/expressMap', 'get'],
  expressSave: ['/api/refund/express/save', 'post']
}
