import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/views/normalLayout/Layout'
// import container from '@/views/layout/container'

const createLoginView = (title, loginType) => () => import('@/views/login/createLogin').then(m => m.default(title, loginType))

// 公共路由
export const constantRouterMap = [{
  path: '/login',
  component: createLoginView('珠宝店商户登录平台', 3),
  hidden: true
}, {
  path: '/findPwd',
  component: () => import('@/views/findPwd'),
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
    component: () => import('@/views/dashboard'),
    name: 'dashboard',
    meta: {
      title: '珠宝店商户平台',
      icon: 'dashboard',
      noCache: true
    }
  }]
}
]
export const asyncRouterMap = [{
  path: '/jewelryMerchantWorks',
  name: 'works',
  authority: 'jewelryMerchantWorks',
  component: Layout,
  meta: {
    title: '商品管理',
    icon: 'goods'
  },
  redirect: '/jewelryMerchantWorks/list',
  children: [{
    path: 'add',
    name: 'addWork',
    component: () => import('@/views/jewelryMerchant/worksList/add'),
    meta: {
      title: '发布商品'
    }
  }, {
    path: 'list',
    name: 'worksList',
    authority: 'list',
    component: () => import('@/views/jewelryMerchant/worksList'),
    meta: {
      title: '商品列表'
    }
  }, {
    path: 'draftList',
    name: 'draftList',
    authority: 'draftList',
    component: () => import('@/views/jewelryMerchant/worksList/draft'),
    meta: {
      title: '草稿箱'
    }
  }, {
    path: 'freight',
    name: 'freightList',
    authority: 'list',
    component: () => import('@/views/jewelryMerchant/worksList/freight'),
    meta: {
      title: '运费模板'
    },
    hidden: true
  },
  {
    path: 'workDetail',
    name: 'workDetail',
    // component: () => import('@/components/app/work/detail'),
    component: () => import('@/views/jewelryMerchant/worksList/add'),
    meta: {
      title: '商品详情'
    },
    hidden: true
  },
  {
    path: 'addlist',
    name: 'addlist',
    component: () => import('@/views/jewelryMerchant/worksList/freight/list'),
    meta: {
      title: '添加运费模板'
    },
    hidden: true
  },
  {
    path: 'editlist',
    name: 'editlist',
    component: () => import('@/views/makeMerchant/worksList/freight/edit'),
    meta: {
      title: '编辑信息'
    },
    hidden: true
  },
  {
    path: 'freightmodel',
    name: 'freightmodel',
    component: () => import('@/views/jewelryMerchant/worksList/freight/model'),
    meta: {
      title: '运费说明'
    },
    hidden: true
  },
  {
    path: 'appointlist',
    name: 'appointlist',
    component: () => import('@/views/jewelryMerchant/worksList/freight/appoint/appointList'),
    meta: {
      title: '指定地区列表'
    },
    hidden: true
  }
  ]
},
{
  path: '/jewelryMerchantOrder',
  name: 'jewelryMerchantOrder',
  authority: 'jewelryMerchantOrder',
  component: Layout,
  redirect: '/jewelryMerchantOrder/list',
  meta: {
    title: '订单管理',
    icon: 'order'
  },
  children: [{
    path: 'list',
    name: 'orderList',
    authority: 'list',
    component: () => import('@/views/jewelryMerchant/orderList'),
    meta: {
      title: '订单列表'
    }
  },
  {
    path: 'detail',
    name: 'orderDetail',
    component: () => import('@/views/jewelryMerchant/orderList/detail'),
    meta: {
      title: '订单详情'
    },
    hidden: true
  },
  {
    path: 'cancel',
    name: 'cancelList',
    authority: 'cancelList',
    component: () => import('@/views/jewelryMerchant/orderList/cancel'),
    meta: {
      title: '取消订单管理'
    }
  }
  ]
}, {
  path: '/dmRefundAddr',
  name: 'dmRefundAddr',
  authority: 'dmRefundAddr',
  component: Layout,
  redirect: '/dmRefundAddr/dmRefundAddrIndex',
  meta: {
    title: '退款管理',
    icon: 'refund'
  },
  children: [{
    path: 'refund',
    name: 'refundList',
    authority: 'refundList',
    component: () => import('@/views/jewelryMerchant/orderList/refund'),
    meta: {
      title: '退款订单'
    }
  },
  {
    path: 'refundDetail',
    name: 'refundDetail',
    component: () => import('@/views/jewelryMerchant/orderList/refundDetail'),
    meta: {
      title: '退款单详情'
    },
    hidden: true
  }, {
    path: 'dmRefundAddrIndex',
    name: 'dmRefundAddrIndex',
    authority: 'dmRefundAddrIndex',
    component: () => import('@/views/jewelryMerchant/refundAddr'),
    meta: {
      title: '退货地址'
    }
  }
  ]
}, {
  path: '/promotedOperation',
  name: 'promotedOperation',
  authority: 'promotedOperation',
  component: Layout,
  redirect: '/promotedOperation/noticeList',
  meta: {
    title: '运营推广',
    icon: 'promotion'
  },
  children: [{
    path: 'group',
    name: 'groupList',
    authority: 'groupList',
    component: () => import('@/views/jewelryMerchant/worksList/group'),
    meta: {
      title: '拼团活动'
    }
  }, {
    path: 'promotion',
    name: 'promotionList',
    authority: 'promotionList',
    component: () => import('@/views/jewelryMerchant/worksList/promotion'),
    meta: {
      title: '限时促销'
    }
  }, {
    path: 'addGroup',
    name: 'addGroup',
    authority: 'addGroup',
    component: () => import('@/views/jewelryMerchant/worksList/addGroup'),
    meta: {
      title: '添加/修改拼团商品'
    },
    hidden: true
  },
  {
    path: 'addPromotion',
    name: 'addPromotion',
    authority: 'addPromotion',
    component: () => import('@/views/jewelryMerchant/worksList/addPromotion'),
    meta: {
      title: '添加/修改促销商品'
    },
    hidden: true
  }, {
    path: 'recommendUsers',
    name: 'recommendUsers',
    authority: 'recommendUsers',
    component: () => import('@/views/jewelryMerchant/customer/recommendUsers'),
    meta: {
      title: '我的粉丝'
    }
  },
  {
    path: 'purchasedCustomers',
    name: 'purchasedCustomers',
    authority: 'purchasedCustomers',
    component: () => import('@/views/jewelryMerchant/customer/purchasedCustomers'),
    meta: {
      title: '我的顾客'
    }
  }, {
    path: 'noticeList',
    name: 'noticeList',
    authority: 'noticeList',
    component: () => import('@/views/jewelryMerchant/promotedOperation/noticeList'),
    meta: {
      title: '店铺公告'
    }
  }, {
    path: 'saveOrUpdateNotice',
    name: 'saveOrUpdateNotice',
    authority: 'saveOrUpdateNotice',
    component: () => import('@/views/jewelryMerchant/promotedOperation/saveOrUpdateNotice'),
    meta: {
      title: '发布/编辑店铺公告'
    },
    hidden: true
  }, {
    path: 'noticeDetail',
    name: 'noticeDetail',
    authority: 'noticeDetail',
    component: () => import('@/views/jewelryMerchant/promotedOperation/noticeDetail'),
    meta: {
      title: '公告详情'
    },
    hidden: true
  }
  ]
}, {
  path: '/jewelryMerchantFund',
  name: 'jewelryMerchantFund',
  authority: 'jewelryMerchantFund',
  component: Layout,
  redirect: '/jewelryMerchantFund/kitingRecords',
  meta: {
    title: '财务管理',
    icon: 'account'
  },
  children: [{
    path: 'report',
    name: 'report',
    authority: 'report',
    component: () => import('@/views/jewelryMerchant/fund/report'),
    meta: {
      title: '财务统计'
    }
  },
  {
    path: 'kitingRecords',
    name: 'kitingRecords',
    authority: 'kitingRecords',
    component: () => import('@/views/jewelryMerchant/fund/kitingRecords'),
    meta: {
      title: '提现管理'
    }
  },
  {
    path: 'cardList',
    name: 'cardList',
    authority: 'cardList',
    component: () => import('@/views/jewelryMerchant/fund/cardList'),
    meta: {
      title: '我的银行卡'
    },
    hidden: true
  }
  ]
}, {
  path: '/merchantStatistics',
  name: 'merchantStatistics',
  authority: 'merchantStatistics',
  component: Layout,
  redirect: '/merchantStatistics/orderStatistics',
  meta: {
    title: '统计查询',
    icon: 'account'
  },
  children: [{
    path: 'orderStatistics',
    name: 'orderStatistics',
    authority: 'orderStatistics',
    component: () => import('@/views/jewelryMerchant/statistics/orderStatistics'),
    meta: {
      title: '订单统计'
    }
  },
  {
    path: 'goodsStatistics',
    name: 'goodsStatistics',
    authority: 'goodsStatistics',
    component: () => import('@/views/jewelryMerchant/statistics/goodsStatistics'),
    meta: {
      title: '商品统计'
    }
  },
  {
    path: 'operateStatistics',
    name: 'operateStatistics',
    authority: 'operateStatistics',
    component: () => import('@/views/jewelryMerchant/statistics/operateStatistics'),
    meta: {
      title: '运营数据统计'
    }
  }
  ]
}, {
  path: '/jewelryMerchantInfo',
  name: 'info',
  authority: 'jewelryMerchantInfo',
  component: Layout,
  redirect: 'merchantInfo',
  meta: {
    title: '店铺管理',
    icon: 'shop'
  },
  children: [{
    path: 'merchantInfo',
    name: 'merchantInfo',
    authority: 'merchantInfo',
    component: () => import('@/views/jewelryMerchant/merchantInfo'),
    meta: {
      title: '商户信息'
    }
  },
  {
    path: 'merchantExplain',
    name: 'merchantExplain',
    authority: 'merchantExplain',
    component: () => import('@/views/jewelryMerchant/center/merchantExplain'),
    meta: {
      title: '商户信息修改'
    },
    hidden: true
  },
  {
    path: 'merchantCenter',
    name: 'merchantCenter',
    authority: 'merchantCenter',
    component: () => import('@/views/jewelryMerchant/center'),
    meta: {
      title: '个人信息'
    }
  },
  {
    path: 'updateInfo',
    name: 'updateInfo',
    component: () => import('@/views/jewelryMerchant/center/updateInfo.vue'),
    meta: {
      title: '修改个人信息'
    },
    hidden: true
  },
  {
    path: 'updatePhone',
    name: 'updatePhone',
    component: () => import('@/views/jewelryMerchant/center/updatePhone'),
    meta: {
      title: '修改手机号码'
    },
    hidden: true
  },
  {
    path: 'updatePwd',
    name: 'updatePwd',
    component: () => import('@/views/jewelryMerchant/center/updatePwd'),
    meta: {
      title: '修改密码'
    },
    hidden: true
  },
  {
    path: 'moneyMake',
    name: 'moneyMake',
    component: () => import('@/views/jewelryMerchant/center/moneyMake'),
    meta: {
      title: '自主签约'
    }
  },
  {
    path: 'certification',
    name: 'certification',
    component: () => import('@/views/jewelryMerchant/center/certification'),
    meta: {
      title: '认证设置'
    }
  },
  {
    path: 'security',
    name: 'security',
    component: () => import('@/views/jewelryMerchant/center/security'),
    meta: {
      title: '安全设置'
    }
  },
  {
    path: 'storyList',
    name: 'storyList',
    component: () => import('@/views/jewelryMerchant/center/storyList'),
    meta: {
      title: '品牌故事'
    }

  },
  {
    path: 'updateStory',
    name: 'updateStory',
    component: () => import('@/views/jewelryMerchant/center/updateStory'),
    meta: {
      title: '添加/编辑品牌故事'
    },
    hidden: true
  }, {
    path: 'storyDetail',
    name: 'storyDetail',
    component: () => import('@/views/jewelryMerchant/center/storyDetail'),
    meta: {
      title: '品牌故事详情'
    },
    hidden: true
  }, {
    path: 'kefu',
    name: 'kefu',
    authority: 'kefu',
    component: () => import('@/views/jewelryMerchant/kefu'),
    meta: {
      title: '在线客服'
    }
  }
  ]
}, {
  path: '/operateVideo',
  name: 'operateVideo',
  authority: 'operateVideo',
  component: Layout,
  redirect: '/operateVideo/videoList',
  meta: {
    title: '帮助中心',
    icon: 'help'
  },
  children: [{
    path: 'videoList',
    name: 'videoList',
    // authority: 'operateVideo',
    component: () => import('@/views/jewelryMerchant/operateVideo'),
    meta: {
      title: '帮助视频'
    }
  }, {
    path: 'docList',
    name: 'docList',
    // authority: 'operateVideo',
    component: () => import('@/views/jewelryMerchant/operateVideo/docList'),
    meta: {
      title: '帮助手册'
    }
  }, {
    path: 'videoDetail',
    name: 'videoDetail',
    // authority: 'operateVideo',
    component: () => import('@/views/jewelryMerchant/operateVideo/detail'),
    meta: {
      title: '视频详情'
    },
    hidden: true
  }]
}, {
  path: '/designMid',
  name: 'designMid',
  authority: 'designMid',
  component: Layout,
  redirect: '/designMid/midIndex',
  meta: {
    title: '商编'
  },
  hidden: true,
  children: [{
    path: 'midIndex',
    name: 'midIndex',
    authority: 'midIndex',
    component: () => import('@/views/jewelryMerchant/mid'),
    meta: {
      title: '商编'
    }
  }]
}, {
  path: '/comment',
  name: 'comment',
  authority: 'comment',
  component: Layout,
  redirect: '/comment/list',
  meta: {
    title: '评论管理'
  },
  hidden: true,
  children: [{
    path: 'list',
    name: 'commentList',
    authority: 'list',
    component: () => import('@/views/jewelryMerchant/comment'),
    meta: {
      title: '评论列表'
    }
  },
  {
    path: 'detail',
    name: 'commentDetail',
    authority: 'detail',
    component: () => import('@/views/jewelryMerchant/comment/detail'),
    meta: {
      title: '评论详情'
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
  hidden: true,
  children: [{
    path: 'list',
    name: 'msgList',
    authority: 'list',
    component: () => import('@/views/jewelryMerchant/message/list'),
    meta: {
      title: '系统通知'
    }
  },
  {
    path: 'omsglist',
    name: 'omsgList',
    authority: 'omsgList',
    component: () => import('@/views/jewelryMerchant/message/omsgList'),
    meta: {
      title: '订单消息列表'
    }
  },
  {
    path: 'othermsgList',
    name: 'othermsgList',
    authority: 'othermsgList',
    component: () => import('@/views/jewelryMerchant/message/othermsgList'),
    meta: {
      title: '其他通知'
    }
  }
  ]
}, {
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
