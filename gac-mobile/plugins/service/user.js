export default {
  userInfo: ['/api/userCenter/info', 'get'],
  userInfoUpdate: ['/api/userCenter/info/update', 'post'],
  userAuth: ['/api/userCenter/auth/save', 'post'],
  userAuthList: ['/api/userCenter/auth/list', 'get'],
  userAuthDetail: ['/api/userCenter/auth/detail', 'get'],
  userDetail: ['/api/userCenter/auth/userDetail', 'get'],
  userRegister: ['/api/userCenter/register', 'post'],
  userResetPassword: ['/api/userCenter/reset-password-pre', 'post'],
  userChangePassword: ['/api/userCenter/password/change', 'post'],
  userAccountLogin: ['/api/userCenter/account-login', 'post'],
  userMobileLogin: ['/api/userCenter/mobile-login', 'post'],
  userLogout: ['/api/userCenter/logout', 'post'],
  userSmscode: ['/api/userCenter/smscode', 'post'],
  userMobileValidate: ['/api/userCenter/mobile-phone/validate', 'post'],
  userChangeMobile: ['/api/userCenter/mobile-phone/change', 'post'],
  userComment: ['/api/userCenter/userComment/page', 'get'],

  // 各状态订单数量
  userOrderNum: ['/api/order/state/number/list', 'get'],

  // 珠宝圈喜欢的文章
  userLikeList: ['/api/like/page', 'get'],
  userDeleteLike: ['/api/like/delete', 'get'],

  // 珠宝圈收藏的文章
  circleCollectList: ['/api/userCenter/collect/Jewelry', 'get'],
  // 收藏商品列表
  userCollectList: ['/api/userCenter/collect/goods', 'get'],
  // 批量取消收藏 /{ids}/{source} 来源1珠宝店,2互换销售订单, 5设计室, 6制造间, 7图文管,8珠宝圈
  userDeleteCollect: ['/api/userCenter/collect/delete', 'post'],
  // 收藏商品/珠宝圈内容 /{goodsId}/{source}
  userCollect: ['/api/userCenter/collect/add', 'post'],
  userCollectOrDelete: ['/api/userCenter/collect/addOrDelete', 'post'],
  userCollectCheck: ['/api/userCenter/collect/check', 'post'],

  // 珠宝圈关注的作者列表
  userLikeList: ['/api/like/page', 'get'],
  userDeleteLike: ['/api/like/delete', 'get'],

  // 关注的店铺列表
  shopConcernList: ['/api/shopConcern/getShopConcern', 'get'],
  shopDeleteConcern: ['/api/shopConcern/remove', 'get'],

  userAddress: ['/api/userCenter/addr/page', 'get'],
  userAddressDetail: ['/api/userCenter/addr/detail', 'get'],
  userAddressUpdate: ['/api/userCenter/addr/addOrUpdate', 'post'],
  userAddressDelete: ['/api/userCenter/addr/delete', 'post'],
  userSetDefault: ['/api/userCenter/addr/setDefault', 'post'],
  // 系统通知
  userMessage: ['/app/jewelry/message/page', 'get'],
  // 订单提醒
  userOrderMes: ['/api/order/message/page', 'get'],
  // 售后列表
  userOrderRefund: ['/api/order/refund/page', 'post'],
  // 售后详情
  userRefundInfo: ['/api/order/refund/info', 'get'],
  // 撤销退款退货
  userRefundCancel: ['/api/order/refund/cancel', 'post'],
  // 申请仲裁
  userApplyArbitrate: ['/api/order/arbitrationAdd', 'post'],
  // 查看退货地址
  userRefundAddr: ['/api/order/refundAddr', 'get'],
  // 获取快递方式
  userExpress: ['/api/express/', 'post'],
  // 寄回商品
  userSaveExpress: ['/api/refund/express/save', 'post'],

  // 第三方登录
  thirdLogin: ['/api/userCenter/third-login', 'post'],

  //绑定手机号
  bindPhone: ['/api/userCenter/third-unband', 'post'],

  //判断是否1县1特进入，去绑定手机号
  isCityEnter: ['/api/order/mobile/check', 'get'],

  //解除第三方绑定
  thirdUnbind: ['/api/userCenter/third-unbind', 'post']

}
