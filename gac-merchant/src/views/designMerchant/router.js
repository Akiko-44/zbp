import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/views/normalLayout/Layout'

const createLoginView = (title, loginType) => () => import('@/views/login/createLogin').then(m => m.default(title, loginType))

// 公共路由
export const constantRouterMap = [{
  path: '/login',
  component: createLoginView('设计师商户登录平台', 5),
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
    component: () => import('@/views/dashboard/index'),
    name: 'dashboard',
    meta: {
      title: '设计师商户平台',
      icon: 'dashboard',
      noCache: true
    }
  }]
}
]
export const asyncRouterMap = [{
  path: '/designMerchantWorks',
  name: 'works',
  authority: 'designMerchantWorks',
  component: Layout,
  meta: {
    title: '商品管理',
    icon: 'goods'
  },
  redirect: '/designMerchantWorks/list',
  children: [
    //   {
    //   path: 'list',
    //   name: 'worksList',
    //   authority: 'list',
    //   component: () => import('@/views/designMerchant/worksList'),
    //   meta: {
    //     title: '商品列表'
    //   }
    // },
    {
      path: 'addOpus',
      name: 'addOpus',
      component: () => import('@/views/designMerchant/worksList/addOpus'),
      meta: {
        title: '发布作品'
      }
    },
    {
      path: 'opusList',
      name: 'opusList',
      authority: 'opusList',
      component: () => import('@/views/designMerchant/worksList/opus'),
      meta: {
        title: '作品列表'
      }
    }, {
      path: 'customized',
      name: 'customized',
      authority: 'customized',
      component: () => import('@/views/designMerchant/worksList/customized'),
      meta: {
        title: '定制商品'
      }
      // hidden: true // 暂时hidden
    }, {
      path: 'addCustomized',
      name: 'addCustomized',
      component: () => import('@/views/designMerchant/worksList/addCustomized'),
      meta: {
        title: '发布定制商品'
      },
      hidden: true
    }, {
      path: 'opusDraft',
      name: 'opusDraft',
      authority: 'opusDraft',
      component: () => import('@/views/designMerchant/worksList/opusDraft'),
      meta: {
        title: '草稿箱'
      }
    },
    // {
    //   path: 'draftList',
    //   name: 'draftList',
    //   authority: 'draftList',
    //   component: () => import('@/views/designMerchant/worksList/draft'),
    //   meta: {
    //     title: '草稿箱'
    //   }
    // },
    {
      path: 'freight',
      name: 'freightList',
      authority: 'list',
      component: () => import('@/views/designMerchant/worksList/freight/index'),
      meta: {
        title: '运费模板'
      },
      hidden: true
    },
    {
      path: 'add',
      name: 'addWork',
      component: () => import('@/views/designMerchant/worksList/add'),
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
    },
    {
      path: 'addlist',
      name: 'addlist',
      component: () => import('@/views/designMerchant/worksList/freight/list'),
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
      component: () => import('@/views/designMerchant/worksList/freight/model'),
      meta: {
        title: '运费说明'
      },
      hidden: true
    },
    {
      path: 'appointlist',
      name: 'appointlist',
      component: () => import('@/views/designMerchant/worksList/freight/appoint/appointList'),
      meta: {
        title: '指定地区列表'
      },
      hidden: true
    }
  ]
},
{
  path: '/designMerchantOrder',
  name: 'designMerchantOrder',
  authority: 'designMerchantOrder',
  component: Layout,
  redirect: '/designMerchantOrder/list',
  meta: {
    title: '订单管理',
    icon: 'order'
  },
  children: [{
    path: 'list',
    name: 'orderList',
    authority: 'list',
    component: () => import('@/views/designMerchant/orderList'),
    meta: {
      title: '设计师订单'
    },
    hidden: true
  },
  {
    path: 'detail',
    name: 'orderDetail',
    component: () => import('@/views/designMerchant/orderList/detail'),
    meta: {
      title: '订单详情'
    },
    hidden: true
  }, {
    path: 'customOrderList',
    name: 'customOrderList',
    authority: 'list',
    component: () => import('@/views/designMerchant/orderList/custom'),
    meta: {
      title: '订单列表'
    }
    // hidden: true // 暂时hidden
  }, {
    path: 'customDetail',
    name: 'customOrderDetail',
    component: () => import('@/views/designMerchant/orderList/customDetail'),
    meta: {
      title: '定制订单详情'
    },
    hidden: true
  },
  {
    path: 'cancel',
    name: 'cancelList',
    authority: 'cancelList',
    component: () => import('@/views/designMerchant/orderList/cancel'),
    meta: {
      title: '取消订单管理'
    }
  }
  ]
},
{
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
    component: () => import('@/views/designMerchant/orderList/refund'),
    meta: {
      title: '仲裁管理'
    }
  },
  {
    path: 'refundDetail',
    name: 'refundDetail',
    component: () => import('@/views/designMerchant/orderList/refundDetail'),
    meta: {
      title: '退款单详情'
    },
    hidden: true
  },
  {
    path: 'dmRefundAddrIndex',
    name: 'dmRefundAddrIndex',
    authority: 'dmRefundAddrIndex',
    component: () => import('@/views/designMerchant/refundAddr'),
    meta: {
      title: '退货地址'
    }
  }
  ]
},
{
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
  }, {
    path: 'recommendUsers',
    name: 'recommendUsers',
    authority: 'recommendUsers',
    component: () => import('@/views/jewelryMerchant/customer/recommendUsers'),
    meta: {
      title: '我的粉丝'
    }
  }, {
    path: 'purchasedCustomers',
    name: 'purchasedCustomers',
    authority: 'purchasedCustomers',
    component: () => import('@/views/jewelryMerchant/customer/purchasedCustomers'),
    meta: {
      title: '我的顾客'
    }
  }]
},
{
  path: '/designMerchantFund',
  name: 'designMerchantFund',
  authority: 'designMerchantFund',
  component: Layout,
  redirect: '/designMerchantFund/kitingRecords',
  meta: {
    title: '财务管理',
    icon: 'account'
  },
  children: [{
    path: 'kitingRecords',
    name: 'kitingRecords',
    authority: 'kitingRecords',
    component: () => import('@/views/designMerchant/fund/kitingRecords'),
    meta: {
      title: '提现记录'
    }
  },
  {
    path: 'report',
    name: 'report',
    authority: 'report',
    component: () => import('@/views/designMerchant/fund/report'),
    meta: {
      title: '报表'
    }
  },
  {
    path: 'cardList',
    name: 'cardList',
    authority: 'cardList',
    component: () => import('@/views/designMerchant/fund/cardList'),
    meta: {
      title: '我的银行卡'
    },
    hidden: true
  }
  ]
},
{
  path: '/designMerchantInfo',
  name: 'info',
  authority: 'designMerchantInfo',
  component: Layout,
  meta: {
    title: '店铺管理',
    icon: 'shop'
  },
  children: [{
    path: 'merchantInfo',
    name: 'merchantInfo',
    authority: 'merchantInfo',
    component: () => import('@/views/designMerchant/merchantInfo'),
    meta: {
      title: '查看店铺'
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
    component: () => import('@/views/designMerchant/center'),
    meta: {
      title: '商户信息'
    }
  },
  {
    path: 'updateInfo',
    name: 'updateInfo',
    component: () => import('@/views/designMerchant/center/updateInfo.vue'),
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
    component: () => import('@/views/jewelryMerchant/center/moneyMake.vue'),
    meta: {
      title: '自主签约'
    }
  },
  {
    path: 'certification',
    name: 'certification',
    component: () => import('@/views/designMerchant/center/certification'),
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
  }, {
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
  },
  {
    path: 'storyDetail',
    name: 'storyDetail',
    component: () => import('@/views/jewelryMerchant/center/storyDetail'),
    meta: {
      title: '品牌故事详情'
    },
    hidden: true
  },
  {
    path: 'designAwards',
    name: 'designAwards',
    authority: 'index',
    component: () => import('@/views/designMerchant/designAwards'),
    meta: {
      title: '设计奖项'
    }
  }, {
    path: 'addDesignAwards',
    name: 'addDesignAwards',
    authority: 'addDesignAwards',
    component: () => import('@/views/designMerchant/designAwards/add'),
    meta: {
      title: '添加/修改设计奖项'
    },
    hidden: true
  }, {
    path: 'designAwardsDetail',
    name: 'designAwardsDetail',
    authority: 'designAwardsDetail',
    component: () => import('@/views/designMerchant/designAwards/detail'),
    meta: {
      title: '详情'
    },
    hidden: true
  },
  {
    path: 'kefu',
    name: 'kefu',
    authority: 'kefu',
    component: () => import('@/views/jewelryMerchant/kefu'),
    meta: {
      title: '在线客服'
    }
  }
  ]
},
{
  path: '/operateVideo',
  name: 'operateVideo',
  // authority: 'operateVideo',
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
    component: () => import('@/views/designMerchant/operateVideo'),
    meta: {
      title: '操作视频'
    }
  }, {
    path: 'docList',
    name: 'docList',
    // authority: 'operateVideo',
    component: () => import('@/views/designMerchant/operateVideo/docList'),
    meta: {
      title: '操作手册'
    }
  }, {
    path: 'videoDetail',
    name: 'videoDetail',
    // authority: 'operateVideo',
    component: () => import('@/views/designMerchant/operateVideo/detail'),
    meta: {
      title: '视频详情'
    },
    hidden: true
  }]
},
{
  path: '/designerManage',
  name: 'designer',
  authority: 'designerManage',
  component: Layout,
  hidden: true,
  meta: {
    title: '设计师管理',
    icon: 'example'
  },
  redirect: '/designerManage/list',
  children: [{
    path: 'list',
    name: 'designerList',
    authority: 'list',
    component: () => import('@/views/designMerchant/designList'),
    meta: {
      title: '设计师资料'
    }
  }]
},
{
  path: '/comment',
  name: 'comment',
  authority: 'comment',
  component: Layout,
  redirect: '/comment/list',
  meta: {
    title: '评论管理',
    icon: 'example'
  },
  hidden: true,
  children: [{
    path: 'list',
    name: 'commentList',
    authority: 'list',
    component: () => import('@/views/designMerchant/comment'),
    meta: {
      title: '评论列表'
    }
  },
  {
    path: 'detail',
    name: 'commentDetail',
    authority: 'detail',
    component: () => import('@/views/designMerchant/comment/detail'),
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
    title: '消息提示',
    icon: 'example'
  },
  hidden: true,
  children: [{
    path: 'list',
    name: 'msgList',
    authority: 'list',
    component: () => import('@/views/designMerchant/message/list'),
    meta: {
      title: '系统通知'
    }
  },
  {
    path: 'omsglist',
    name: 'omsgList',
    authority: 'omsgList',
    component: () => import('@/views/designMerchant/message/omsgList'),
    meta: {
      title: '订单消息列表'
    }
  },
  {
    path: 'othermsgList',
    name: 'othermsgList',
    authority: 'othermsgList',
    component: () => import('@/views/designMerchant/message/othermsgList'),
    meta: {
      title: '其他通知'
    }
  }
  ]
},
{
  path: '/designMid',
  name: 'designMid',
  authority: 'designMid',
  component: Layout,
  redirect: '/designMid/midIndex',
  meta: {
    title: '商编',
    icon: 'example'
  },
  hidden: true,
  children: [{
    path: 'midIndex',
    name: 'midIndex',
    authority: 'midIndex',
    component: () => import('@/views/designMerchant/mid'),
    meta: {
      title: '商编'
    }
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
