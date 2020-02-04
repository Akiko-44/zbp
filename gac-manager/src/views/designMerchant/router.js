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
      title: '设计师商户平台',
      icon: 'dashboard',
      noCache: true
    }
  }]
}
]
export const asyncRouterMap = [

  {
    path: '/designMerchantInfo',
    name: 'info',
    authority: 'designMerchantInfo',
    component: Layout,
    meta: {
      title: '商家信息管理'
    },
    children: [{
      path: 'merchantInfo',
      name: 'merchantInfo',
      authority: 'merchantInfo',
      component: () => import('@/views/designMerchant/merchantInfo'),
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
      component: () => import('@/views/designMerchant/center'),
      meta: {
        title: '个人信息'
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
      component: () => import('@/views/designMerchant/center/updatePhone.vue'),
      meta: {
        title: '修改手机号码'
      },
      hidden: true
    },
    {
      path: 'updatePwd',
      name: 'updatePwd',
      component: () => import('@/views/designMerchant/center/updatePwd.vue'),
      meta: {
        title: '修改密码'
      }
    },
    {
      path: 'moneyMake',
      name: 'moneyMake',
      component: () => import('@/views/designMerchant/center/moneyMake.vue'),
      meta: {
        title: '自主签约'
      }
    },
    {
      path: 'certification',
      name: 'certification',
      component: () => import('@/views/designMerchant/center/certification'),
      meta: {
        title: '企业认证'
      }
    }
    ]
  },
  {
    path: '/designMerchantWorks',
    name: 'works',
    authority: 'designMerchantWorks',
    component: Layout,
    meta: {
      title: '商品管理'
    },
    redirect: '/designMerchantWorks/list',
    children: [{
      path: 'list',
      name: 'worksList',
      authority: 'list',
      component: () => import('@/views/designMerchant/worksList'),
      meta: {
        title: '商品列表'
      }
    },
    {
      path: 'draftList',
      name: 'draftList',
      authority: 'draftList',
      component: () => import('@/views/designMerchant/worksList/draft'),
      meta: {
        title: '草稿箱'
      }
    },
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
    path: '/designerManage',
    name: 'designer',
    authority: 'designerManage',
    component: Layout,
    meta: {
      title: '设计师管理'
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
    }
      // {
      //   path: 'designerDetail',
      //   name: 'designerDetail',
      //   component: () => import('@/views/designMerchant/designList/detail'),
      //   meta: {
      //     title: '设计师详情'
      //   },
      //   hidden: true
      // },
      // {
      //   path: 'editDesigner',
      //   name: 'editDesigner',
      //   component: () => import('@/views/designMerchant/designList/add'),
      //   meta: {
      //     title: '设计师添加/修改'
      //   },
      //   hidden: true
      // }
    ]
  },
  {
    path: '/designMerchantOrder',
    name: 'designMerchantOrder',
    authority: 'designMerchantOrder',
    component: Layout,
    redirect: '/designMerchantOrder/list',
    meta: {
      title: '订单管理'
    },
    children: [{
      path: 'list',
      name: 'orderList',
      authority: 'list',
      component: () => import('@/views/designMerchant/orderList'),
      meta: {
        title: '设计室订单'
      }
    },
    {
      path: 'detail',
      name: 'orderDetail',
      component: () => import('@/views/designMerchant/orderList/detail'),
      meta: {
        title: '订单详情'
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
    },
    {
      path: 'refund',
      name: 'refundList',
      authority: 'refundList',
      component: () => import('@/views/designMerchant/orderList/refund'),
      meta: {
        title: '售后管理'
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
    }
    ]
  }, {
    path: '/designMerchantCustomer',
    name: 'designMerchantCustomer',
    authority: 'designMerchantCustomer',
    component: Layout,
    redirect: '/designMerchantCustomer/recommendUsers',
    meta: {
      title: '用户管理'
    },
    children: [{
      path: 'recommendUsers',
      name: 'recommendUsers',
      authority: 'recommendUsers',
      component: () => import('@/views/designMerchant/customer/recommendUsers'),
      meta: {
        title: '推荐用户管理'
      }
    },
    {
      path: 'purchasedCustomers',
      name: 'purchasedCustomers',
      authority: 'purchasedCustomers',
      component: () => import('@/views/designMerchant/customer/purchasedCustomers'),
      meta: {
        title: '已购买客户管理'
      }
    }
    ]
  },
  {
    path: '/designMerchantFund',
    name: 'designMerchantFund',
    authority: 'designMerchantFund',
    component: Layout,
    redirect: '/designMerchantFund/kitingRecords',
    meta: {
      title: '资金管理'
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
      title: '消息提示'
    },
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
    path: '/designMid',
    name: 'designMid',
    authority: 'designMid',
    component: Layout,
    redirect: '/designMid/midIndex',
    meta: {
      title: '商编'
    },
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
      component: () => import('@/views/designMerchant/refundAddr'),
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
