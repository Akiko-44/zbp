import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/views/merchantLayout/Layout'

const createLoginView = (title, loginType) => () => import('@/views/login/createLogin').then(m => m.default(title, loginType))

// 公共路由
export const constantRouterMap = [
  //  6制造间 5设计室
  { path: '/login', component: createLoginView('商户登录平台', 6), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '商户平台', icon: 'dashboard', noCache: true }
    }]
  }
]
export const asyncRouterMap = [
  {
    path: '/merchantInfos',
    name: 'merchantInfos',
    authority: 'merchantInfos',
    component: Layout,
    meta: {
      title: '商家信息管理'
    },
    // redirect: '/makeMerchantInfo/info',
    children: [
      {
        path: 'merchantInfo',
        name: 'merchantInfo',
        authority: 'merchantInfo',
        component: () => import('@/views/merchant/merchantInfo'),
        meta: {
          title: '商家信息'
        }
      },
      {
        path: 'merchantExplain',
        name: 'merchantExplain',
        authority: 'merchantExplain',
        component: () => import('@/views/merchant/center/merchantExplain'),
        meta: {
          title: '商家简介'
        },
        hidden: true
      },
      {
        path: 'merchantCenter',
        name: 'merchantCenter',
        authority: 'merchantCenter',
        component: () => import('@/views/merchant/center'),
        meta: {
          title: '个人信息'
        }
      },
      {
        path: 'updateInfo',
        name: 'updateInfo',
        component: () => import('@/views/merchant/center/updateInfo'),
        meta: {
          title: '修改个人信息'
        },
        hidden: true
      },
      {
        path: 'updatePwd',
        name: 'updatePwd',
        component: () => import('@/views/merchant/center/updatePwd'),
        meta: {
          title: '修改密码'
        }
      },
      {
        path: 'moneyMake',
        name: 'moneyMake',
        component: () => import('@/views/merchant/center/moneyMake'),
        meta: {
          title: '对公打款认证'
        }
      }
    ]
  },
  {
    path: '/merchantWorks',
    name: 'merchantWorks',
    authority: 'merchantWorks',
    component: Layout,
    meta: {
      title: '商品管理'
    },
    // redirect: '/makeMerchantWorks/list',
    children: [
      {
        path: 'makeWorkList',
        name: 'makeWorkList',
        authority: 'makeWorkList',
        component: () => import('@/views/merchant/worksList/makeWorkList'),
        meta: {
          title: '商品列表'
        }
      },
      {
        path: 'designWorkList',
        name: 'designWorkList',
        authority: 'designWorkList',
        component: () => import('@/views/merchant/worksList/designWorkList'),
        meta: {
          title: '商品列表'
        }
      },
      {
        path: 'designAddWork',
        name: 'designAddWork',
        component: () => import('@/views/merchant/worksList/designAdd'),
        meta: {
          title: '添加/修改商品'
        },
        hidden: true
      },
      {
        path: 'makeAddWork',
        name: 'makeAddWork',
        component: () => import('@/views/merchant/worksList/makeAdd'),
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
        component: () => import('@/views/merchant/worksList/freight/list'),
        meta: {
          title: '添加运费模板'
        },
        hidden: true
      },
      {
        path: 'editlist',
        name: 'editlist',
        component: () => import('@/views/merchant/worksList/freight/edit'),
        meta: {
          title: '编辑信息'
        },
        hidden: true
      },
      {
        path: 'freightmodel',
        name: 'freightmodel',
        component: () => import('@/views/merchant/worksList/freight/model'),
        meta: {
          title: '运费说明'
        },
        hidden: true
      },
      {
        path: 'appointlist',
        name: 'appointlist',
        component: () => import('@/views/merchant/worksList/freight/appoint/appointList'),
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
    children: [
      {
        path: 'list',
        name: 'designerList',
        authority: 'list',
        component: () => import('@/views/merchant/designList'),
        meta: {
          title: '设计师列表'
        }
      },
      {
        path: 'designerDetail',
        name: 'designerDetail',
        component: () => import('@/views/merchant/designList/detail'),
        meta: {
          title: '设计师详情'
        },
        hidden: true
      },
      {
        path: 'editDesigner',
        name: 'editDesigner',
        component: () => import('@/views/merchant/designList/add'),
        meta: {
          title: '设计师添加/修改'
        },
        hidden: true
      }
    ]
  },
  {
    path: '/merchantStatistics',
    name: 'merchantStatistics',
    authority: 'merchantStatistics',
    component: Layout,
    // redirect: '/makeMerchantCraft/statistics',
    meta: {
      title: '统计管理'
    },
    children: [
      {
        path: 'orderStatistics',
        name: 'orderStatistics',
        authority: 'orderStatistics',
        component: () => import('@/views/merchant/statistics/orderStatistics'),
        meta: {
          title: '订单统计'
        }
      }
    ]
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
    children: [
      {
        path: 'list',
        name: 'craftList',
        authority: 'list',
        component: () => import('@/views/merchant/craftList'),
        meta: {
          title: '工艺列表'
        }
      },
      {
        path: 'add',
        name: 'addCraft',
        component: () => import('@/views/merchant/craftList/add'),
        meta: {
          title: '添加/修改工艺'
        },
        hidden: true
      }
    ]
  },
  {
    path: '/merchantOrder',
    name: 'merchantOrder',
    authority: 'merchantOrder',
    component: Layout,
    // redirect: '/merchantOrder/list',
    meta: {
      title: '订单管理'
    },
    children: [
      {
        path: 'makeOrderList',
        name: 'makeOrderList',
        authority: 'makeOrderList',
        component: () => import('@/views/merchant/orderList/makeOrder'),
        meta: {
          title: '制造间订单'
        }
      },
      {
        path: 'designOrderList',
        name: 'designOrderList',
        authority: 'designOrderList',
        component: () => import('@/views/merchant/orderList/designOrder'),
        meta: {
          title: '设计室订单'
        }
      },
      {
        path: 'makeOrderDetail',
        name: 'makeOrderDetail',
        component: () => import('@/views/merchant/orderList/makeDetail'),
        meta: {
          title: '制造间订单详情'
        },
        hidden: true
      },
      {
        path: 'designOrderDetail',
        name: 'designOrderDetail',
        component: () => import('@/views/merchant/orderList/designDetail'),
        meta: {
          title: '设计室订单详情'
        },
        hidden: true
      },
      {
        path: 'makeCancelList',
        name: 'makeCancelList',
        authority: 'makeCancelList',
        component: () => import('@/views/merchant/orderList/makeCancel'),
        meta: {
          title: '取消订单管理'
        }
      },
      {
        path: 'designCancelList',
        name: 'designCancelList',
        authority: 'designCancelList',
        component: () => import('@/views/merchant/orderList/designCancel'),
        meta: {
          title: '取消订单管理'
        }
      },
      {
        path: 'refund',
        name: 'refundList',
        authority: 'refundList',
        component: () => import('@/views/merchant/orderList/refund'),
        meta: {
          title: '售后管理'
        }
      },
      {
        path: 'refundDetail',
        name: 'refundDetail',
        component: () => import('@/views/merchant/orderList/refundDetail'),
        meta: {
          title: '退款单详情'
        },
        hidden: true
      }
    ]
  },
  {
    path: '/merchantFund',
    name: 'merchantFund',
    authority: 'merchantFund',
    component: Layout,
    // redirect: '/makeMerchantFund/kitingRecords',
    meta: {
      title: '资金管理'
    },
    children: [
      {
        path: 'kitingRecords',
        name: 'kitingRecords',
        authority: 'kitingRecords',
        component: () => import('@/views/merchant/fund/kitingRecords'),
        meta: {
          title: '提现记录'
        }
      },
      {
        path: 'report',
        name: 'report',
        authority: 'report',
        component: () => import('@/views/merchant/fund/report'),
        meta: {
          title: '报表'
        }
      },
      {
        path: 'cardList',
        name: 'cardList',
        authority: 'cardList',
        component: () => import('@/views/merchant/fund/cardList'),
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
    children: [
      {
        path: 'list',
        name: 'commentList',
        authority: 'list',
        component: () => import('@/views/merchant/comment'),
        meta: {
          title: '评论列表'
        }
      },
      {
        path: 'detail',
        name: 'commentDetail',
        authority: 'detail',
        component: () => import('@/views/merchant/comment/detail'),
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
    children: [
      {
        path: 'index',
        name: 'discountsList',
        authority: 'index',
        component: () => import('@/views/merchant/discounts/index'),
        meta: {
          title: '优惠券列表'
        }
      },
      {
        path: 'detail',
        name: 'discountsDetail',
        authority: 'detail',
        component: () => import('@/views/merchant/discounts/detail'),
        meta: {
          title: '优惠券详情'
        },
        hidden: true
      },
      {
        path: 'add',
        name: 'discountsAdd',
        authority: 'add',
        component: () => import('@/views/merchant/discounts/add'),
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
    children: [
      {
        path: 'designMsglist',
        name: 'designMsglist',
        authority: 'designMsglist',
        component: () => import('@/views/merchant/message/designList'),
        meta: {
          title: '系统通知'
        }
      },
      {
        path: 'makeMsglist',
        name: 'makeMsglist',
        authority: 'makeMsglist',
        component: () => import('@/views/merchant/message/makeList'),
        meta: {
          title: '系统通知'
        }
      },
      {
        path: 'designOmsglist',
        name: 'designOmsglist',
        authority: 'designOmsglist',
        component: () => import('@/views/merchant/message/designOmsgList'),
        meta: {
          title: '订单消息列表'
        }
      },
      {
        path: 'makeOmsglist',
        name: 'makeOmsglist',
        authority: 'makeOmsglist',
        component: () => import('@/views/merchant/message/makeOmsglist'),
        meta: {
          title: '订单消息列表'
        }
      },
      {
        path: 'designOthermsgList',
        name: 'designOthermsgList',
        authority: 'designOthermsgList',
        component: () => import('@/views/merchant/message/designOthermsgList'),
        meta: {
          title: '其他通知'
        }
      },
      {
        path: 'makeOthermsgList',
        name: 'makeOthermsgList',
        authority: 'makeOthermsgList',
        component: () => import('@/views/merchant/message/makeOthermsgList'),
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
    children: [
      {
        path: 'list',
        name: 'decorationList',
        authority: 'list',
        component: () => import('@/views/merchant/decorationShop'),
        meta: {
          title: '店铺装修'
        }
      },
      {
        path: 'page',
        name: 'shopPage',
        authority: 'page',
        component: () => import('@/views/merchant/decorationShop/page'),
        meta: {
          title: '页面'
        },
        hidden: true
      },
      {
        path: 'shopDetail',
        name: 'shopDetail',
        authority: 'shopDetail',
        component: () => import('@/views/merchant/decorationShop/detail'),
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
    children: [
      {
        path: 'list',
        name: 'madeList',
        authority: 'list',
        component: () => import('@/views/merchant/made'),
        meta: {
          title: '定制列表'
        }
      },
      {
        path: 'madeDetail',
        name: 'madeDetail',
        authority: 'madeDetail',
        component: () => import('@/views/merchant/made/detail'),
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
    children: [
      {
        path: 'kefuIndex',
        name: 'kefuIndex',
        authority: 'kefuIndex',
        component: () => import('@/views/merchant/kefu'),
        meta: {
          title: '客服'
        }
      }
    ]
  },
  {
    path: '/mid',
    name: 'mid',
    authority: 'mid',
    component: Layout,
    // redirect: '/makeMid/midIndex',
    meta: {
      title: '商编'
    },
    children: [
      {
        path: 'midIndex',
        name: 'midIndex',
        authority: 'midIndex',
        component: () => import('@/views/merchant/mid'),
        meta: {
          title: '商编'
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
      title: '退货地址'
    },
    children: [
      {
        path: 'dmRefundAddrIndex',
        name: 'dmRefundAddrIndex',
        authority: 'dmRefundAddrIndex',
        component: () => import('@/views/merchant/refundAddr'),
        meta: {
          title: '退货地址'
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
