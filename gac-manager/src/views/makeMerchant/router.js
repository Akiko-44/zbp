import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/views/normalLayout/Layout'

const createLoginView = (title, loginType) => () => import('@/views/login/createLogin').then(m => m.default(title, loginType))

// 公共路由
export const constantRouterMap = [{
  path: '/login',
  component: createLoginView('制造间商户登录平台', 6),
  hidden: true
}, {
  path: '/findPwd',
  component: () => import('@/views/findPwd'),
  hidden: true
}, {
  path: '/findPwdNext',
  component: () => import('@/views/findPwd/next'),
  hidden: true
}, {
  path: '/authredirect',
  component: () => import('@/views/login/authredirect'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/errorPage/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/errorPage/401'),
  hidden: true
},
{
  path: '',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'dashboard',
    meta: {
      title: '制造间商户平台',
      icon: 'dashboard',
      noCache: true
    }
  }]
}
]
export const asyncRouterMap = [{
  path: '/makeMerchantInfo',
  name: 'info',
  authority: 'makeMerchantInfo',
  component: Layout,
  meta: {
    title: '商家信息管理'
  },
  //  redirect: '/makeMerchantInfo/info',
  children: [{
    path: 'merchantInfo',
    name: 'merchantInfo',
    authority: 'merchantInfo',
    component: () => import('@/views/makeMerchant/merchantInfo'),
    meta: {
      title: '商家信息'
    }
  },
  {
    path: 'merchantExplain',
    name: 'merchantExplain',
    authority: 'merchantExplain',
    component: () => import('@/views/designMerchant/center/merchantExplain'),
    meta: {
      title: '商家简介'
    },
    hidden: true
  },
  {
    path: 'merchantCenter',
    name: 'merchantCenter',
    authority: 'merchantCenter',
    component: () => import('@/views/makeMerchant/center'),
    meta: {
      title: '个人信息'
    }
  },
  {
    path: 'updateInfo',
    name: 'updateInfo',
    component: () => import('@/views/makeMerchant/center/updateInfo.vue'),
    meta: {
      title: '修改个人信息'
    },
    hidden: true
  },
  {
    path: 'updatePhone',
    name: 'updatePhone',
    component: () => import('@/views/makeMerchant/center/updatePhone.vue'),
    meta: {
      title: '修改手机号码'
    },
    hidden: true
  },
  {
    path: 'updatePwd',
    name: 'updatePwd',
    component: () => import('@/views/makeMerchant/center/updatePwd.vue'),
    meta: {
      title: '修改密码'
    }
  },
  {
    path: 'moneyMake',
    name: 'moneyMake',
    component: () => import('@/views/makeMerchant/center/moneyMake.vue'),
    meta: {
      title: '对公打款认证'
    }
  },
  {
    path: 'certification',
    name: 'certification',
    component: () => import('@/views/makeMerchant/center/certification'),
    meta: {
      title: '企业认证'
    }
  }
  ]
},
{
  path: '/makeMerchantWorks',
  name: 'works',
  authority: 'makeMerchantWorks',
  component: Layout,
  meta: {
    title: '商品管理'
  },
  redirect: '/makeMerchantWorks/list',
  children: [{
    path: 'list',
    name: 'worksList',
    authority: 'list',
    component: () => import('@/views/makeMerchant/worksList'),
    meta: {
      title: '商品列表'
    }
  },
  {
    path: 'draftList',
    name: 'draftList',
    authority: 'draftList',
    component: () => import('@/views/makeMerchant/worksList/draft'),
    meta: {
      title: '草稿箱'
    }
  },
  {
    path: 'add',
    name: 'addWork',
    component: () => import('@/views/makeMerchant/worksList/add'),
    meta: {
      title: '添加/修改商品'
    },
    hidden: true
  },
  {
    path: 'workDetail',
    name: 'workDetail',
    component: () => import('@/components/app/work/detail'),
    meta: {
      title: '商品详情'
    },
    hidden: true
  }
  ]
},
{
  path: '/makeMerchantCraft',
  name: 'statistics',
  authority: 'makeMerchantCraft',
  component: Layout,
  redirect: '/makeMerchantCraft/statistics',
  meta: {
    title: '统计管理'
  },
  children: [{
    path: 'orderStatistics',
    name: 'orderStatistics',
    authority: 'orderStatistics',
    component: () => import('@/views/makeMerchant/statistics/orderStatistics'),
    meta: {
      title: '订单统计'
    }
  }]
},
{
  path: '/makeMerchantCraft',
  name: 'craft',
  authority: 'makeMerchantCraft',
  component: Layout,
  redirect: '/makeMerchantCraft/list',
  meta: {
    title: '工艺管理'
  },
  children: [{
    path: 'list',
    name: 'craftList',
    authority: 'list',
    component: () => import('@/views/makeMerchant/craftList'),
    meta: {
      title: '工艺列表'
    }
  },
  {
    path: 'add',
    name: 'addCraft',
    component: () => import('@/views/makeMerchant/craftList/add'),
    meta: {
      title: '添加/修改工艺'
    },
    hidden: true
  }
  ]
},
{
  path: '/makeMerchantOrder',
  name: 'makeMerchantOrder',
  authority: 'makeMerchantOrder',
  component: Layout,
  redirect: '/makeMerchantOrder/list',
  meta: {
    title: '订单管理'
  },
  children: [{
    path: 'list',
    name: 'orderList',
    authority: 'list',
    component: () => import('@/views/makeMerchant/orderList'),
    meta: {
      title: '制造间订单列表'
    }
  },
  {
    path: 'detail',
    name: 'orderDetail',
    component: () => import('@/views/makeMerchant/orderList/detail'),
    meta: {
      title: '制造间订单详情'
    },
    hidden: true
  },
  {
    path: 'cancelList',
    name: 'cancelList',
    authority: 'cancelList',
    component: () => import('@/views/makeMerchant/orderList/cancel'),
    meta: {
      title: '取消订单管理'
    }
  },
  {
    path: 'refund',
    name: 'refundList',
    authority: 'refundList',
    component: () => import('@/views/makeMerchant/orderList/refund'),
    meta: {
      title: '售后管理'
    }
  },
  {
    path: 'refundDetail',
    name: 'refundDetail',
    component: () => import('@/views/makeMerchant/orderList/refundDetail'),
    meta: {
      title: '退款单详情'
    },
    hidden: true
  }
  ]
}, {
  path: '/makeMerchantCustomer',
  name: 'makeMerchantCustomer',
  authority: 'makeMerchantCustomer',
  component: Layout,
  redirect: '/makeMerchantCustomer/recommendUsers',
  meta: {
    title: '用户管理'
  },
  children: [{
    path: 'recommendUsers',
    name: 'recommendUsers',
    authority: 'recommendUsers',
    component: () => import('@/views/makeMerchant/customer/recommendUsers'),
    meta: {
      title: '推荐用户管理'
    }
  },
  {
    path: 'purchasedCustomers',
    name: 'purchasedCustomers',
    authority: 'purchasedCustomers',
    component: () => import('@/views/makeMerchant/customer/purchasedCustomers'),
    meta: {
      title: '已购买客户管理'
    }
  }
  ]
}, {
  path: '/makeMerchantFund',
  name: 'makeMerchantFund',
  authority: 'makeMerchantFund',
  component: Layout,
  redirect: '/makeMerchantFund/kitingRecords',
  meta: {
    title: '资金管理'
  },
  children: [{
    path: 'kitingRecords',
    name: 'kitingRecords',
    authority: 'kitingRecords',
    component: () => import('@/views/makeMerchant/fund/kitingRecords'),
    meta: {
      title: '提现记录'
    }
  },
  {
    path: 'report',
    name: 'report',
    authority: 'report',
    component: () => import('@/views/makeMerchant/fund/report'),
    meta: {
      title: '报表'
    }
  },
  {
    path: 'cardList',
    name: 'cardList',
    authority: 'cardList',
    component: () => import('@/views/makeMerchant/fund/cardList'),
    meta: {
      title: '我的银行卡'
    },
    hidden: true
  }
  ]
},
{
  path: '/comment',
  name: 'comment',
  authority: 'comment',
  component: Layout,
  redirect: '/comment/list',
  meta: {
    title: '评论管理'
  },
  children: [{
    path: 'list',
    name: 'commentList',
    authority: 'list',
    component: () => import('@/views/makeMerchant/comment'),
    meta: {
      title: '评论列表'
    }
  },
  {
    path: 'detail',
    name: 'commentDetail',
    authority: 'detail',
    component: () => import('@/views/makeMerchant/comment/detail'),
    meta: {
      title: '评论详情'
    },
    hidden: true
  }
  ]
},
{
  path: '/discounts',
  name: 'discounts',
  authority: 'discounts',
  component: Layout,
  redirect: '/discounts/index',
  meta: {
    title: '优惠券管理'
  },
  children: [{
    path: 'index',
    name: 'discountsList',
    authority: 'index',
    component: () => import('@/views/makeMerchant/discounts/index'),
    meta: {
      title: '优惠券列表'
    }
  },
  {
    path: 'detail',
    name: 'discountsDetail',
    authority: 'detail',
    component: () => import('@/views/makeMerchant/discounts/detail'),
    meta: {
      title: '优惠券详情'
    },
    hidden: true
  },
  {
    path: 'add',
    name: 'discountsAdd',
    authority: 'add',
    component: () => import('@/views/makeMerchant/discounts/add'),
    meta: {
      title: '添加/修改优惠券'
    },
    hidden: true
  }
  ]
},
{
  path: '/message',
  name: 'message',
  authority: 'message',
  component: Layout,
  redirect: '/message/list',
  meta: {
    title: '消息提示'
  },
  children: [{
    path: 'list',
    name: 'msgList',
    authority: 'list',
    component: () => import('@/views/makeMerchant/message/list'),
    meta: {
      title: '系统通知'
    }
  },
  {
    path: 'omsglist',
    name: 'omsgList',
    authority: 'omsgList',
    component: () => import('@/views/makeMerchant/message/omsgList'),
    meta: {
      title: '订单消息列表'
    }
  },
  {
    path: 'othermsgList',
    name: 'othermsgList',
    authority: 'othermsgList',
    component: () => import('@/views/makeMerchant/message/othermsgList'),
    meta: {
      title: '其他通知'
    }
  }
  ]
},
{
  path: '/decorationShop',
  name: 'decorationShop',
  authority: 'decorationShop',
  component: Layout,
  redirect: '/decorationShop/list',
  meta: {
    title: '店铺装修'
  },
  hidden: true,
  children: [{
    path: 'list',
    name: 'decorationList',
    authority: 'list',
    component: () => import('@/views/makeMerchant/decorationShop'),
    meta: {
      title: '店铺装修'
    }
  },
  {
    path: 'page',
    name: 'shopPage',
    authority: 'page',
    component: () => import('@/views/makeMerchant/decorationShop/page'),
    meta: {
      title: '页面'
    },
    hidden: true
  },
  {
    path: 'shopDetail',
    name: 'shopDetail',
    authority: 'shopDetail',
    component: () => import('@/views/makeMerchant/decorationShop/detail'),
    meta: {
      title: '详情'
    },
    hidden: true
  }
  ]
},
{
  path: '/made',
  name: 'made',
  authority: 'made',
  component: Layout,
  redirect: '/made/list',
  meta: {
    title: '定制'
  },
  hidden: true,
  children: [{
    path: 'list',
    name: 'madeList',
    authority: 'list',
    component: () => import('@/views/makeMerchant/made'),
    meta: {
      title: '定制列表'
    }
  },
  {
    path: 'madeDetail',
    name: 'madeDetail',
    authority: 'madeDetail',
    component: () => import('@/views/makeMerchant/made/detail'),
    meta: {
      title: '详情'
    },
    hidden: true
  }
  ]
},
{
  path: '/kefu',
  name: 'kefu',
  authority: 'kefu',
  component: Layout,
  redirect: '/kefu/index',
  meta: {
    title: '客服'
  },
  children: [{
    path: 'kefuIndex',
    name: 'kefuIndex',
    authority: 'kefuIndex',
    component: () => import('@/views/designMerchant/kefu'),
    meta: {
      title: '客服'
    }
  }]
},
{
  path: '/makeMid',
  name: 'makeMid',
  authority: 'makeMid',
  component: Layout,
  redirect: '/makeMid/midIndex',
  meta: {
    title: '商编'
  },
  children: [{
    path: 'midIndex',
    name: 'midIndex',
    authority: 'midIndex',
    component: () => import('@/views/makeMerchant/mid'),
    meta: {
      title: '商编'
    }
  }]
},
{
  path: '/dmRefundAddr',
  name: 'dmRefundAddr',
  authority: 'dmRefundAddr',
  component: Layout,
  redirect: '/dmRefundAddr/dmRefundAddrIndex',
  meta: {
    title: '退货地址'
  },
  children: [{
    path: 'dmRefundAddrIndex',
    name: 'dmRefundAddrIndex',
    authority: 'dmRefundAddrIndex',
    component: () => import('@/views/makeMerchant/refundAddr'),
    meta: {
      title: '退货地址'
    }
  }]
},
{
  path: '/operateVideo',
  name: 'operateVideo',
  // authority: 'operateVideo',
  component: Layout,
  redirect: '/operateVideo/videoList',
  meta: {
    title: '帮助中心'
  },
  children: [{
    path: 'videoList',
    name: 'videoList',
    // authority: 'operateVideo',
    component: () => import('@/views/makeMerchant/operateVideo'),
    meta: {
      title: '操作视频'
    }
  }, {
    path: 'docList',
    name: 'docList',
    // authority: 'operateVideo',
    component: () => import('@/views/makeMerchant/operateVideo/docList'),
    meta: {
      title: '操作手册'
    }
  }, {
    path: 'videoDetail',
    name: 'videoDetail',
    // authority: 'operateVideo',
    component: () => import('@/views/makeMerchant/operateVideo/detail'),
    meta: {
      title: '视频详情'
    },
    hidden: true
  }]
},
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
