/* Layout */
import Layout from '@/views/layout/Layout'

// 互换坊路由
export default [
  {
    path: '/info',
    name: 'info',
    authority: 'info',
    component: Layout,
    meta: {
      title: '信息管理'
    },
    children: [
      {
        path: 'sales',
        name: 'salesInfo',
        authority: 'sales',
        component: () => import('@/views/swap/salesInfo'),
        meta: {
          title: '销售信息管理'
        }
      },
      {
        path: 'sales/detail',
        name: 'salesDetail',
        component: () => import('@/views/swap/salesInfo/detail'),
        meta: {
          title: '销售信息详情'
        }
      },
      {
        path: 'edit',
        name: 'infoEdit',
        component: () => import('@/views/swap/common/edit'),
        meta: {
          title: '信息编辑'
        }
      },
      {
        path: 'exchange',
        name: 'exchangeInfo',
        authority: 'exchange',
        component: () => import('@/views/swap/exchangeInfo'),
        meta: {
          title: '互换信息管理'
        }
      },
      {
        path: 'exchange/detail',
        name: 'exchangeDetail',
        component: () => import('@/views/swap/exchangeInfo/detail'),
        meta: {
          title: '互换信息详情'
        }
      },
      {
        path: 'auction',
        name: 'auctionInfo',
        authority: 'auction',
        component: () => import('@/views/swap/auctionInfo'),
        meta: {
          title: '拍卖信息管理'
        }
      },
      {
        path: 'auction/detail',
        name: 'auctionDetail',
        component: () => import('@/views/swap/auctionInfo/detail'),
        meta: {
          title: '拍卖信息详情'
        }
      },
      {
        path: 'auction/edit',
        name: 'auctionEdit',
        component: () => import('@/views/swap/auctionInfo/edit'),
        meta: {
          title: '拍卖信息编辑'
        }
      },
      {
        path: 'auction/users',
        name: 'auctionUsers',
        component: () => import('@/views/swap/auctionInfo/users'),
        meta: {
          title: '拍卖报名名单'
        }
      },
      {
        path: 'auction/price',
        name: 'auctionPrice',
        component: () => import('@/views/swap/auctionInfo/price'),
        meta: {
          title: '拍卖出价记录'
        }
      },
      {
        path: 'recycling',
        name: 'recyclingInfo',
        authority: 'recycling',
        component: () => import('@/views/swap/recyclingInfo'),
        meta: {
          title: '回收信息管理'
        }
      },
      {
        path: 'recycling/detail',
        name: 'recyclingDetail',
        component: () => import('@/views/swap/recyclingInfo/detail'),
        meta: {
          title: '回收信息详情'
        }
      },
      {
        path: 'recycling/edit',
        name: 'recyclingEdit',
        component: () => import('@/views/swap/recyclingInfo/edit'),
        meta: {
          title: '回收信息编辑'
        }
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    authority: 'order',
    component: Layout,
    meta: {
      title: '订单管理'
    },
    children: [
      {
        path: 'sales',
        name: 'salesOrder',
        authority: 'sales',
        component: () => import('@/views/swap/salesOrder'),
        meta: {
          title: '销售订单管理'
        }
      },
      {
        path: 'sales/detail',
        name: 'salesOrderDetail',
        component: () => import('@/views/swap/salesOrder/detail'),
        meta: {
          title: '销售订单详情'
        }
      },
      {
        path: 'exchange',
        name: 'exchangeOrder',
        authority: 'exchange',
        component: () => import('@/views/swap/exchangeOrder'),
        meta: {
          title: '互换订单管理'
        }
      },
      {
        path: 'exchange/detail',
        name: 'exchangeOrderDetail',
        authority: 'exchange',
        component: () => import('@/views/swap/exchangeOrder/detail'),
        meta: {
          title: '互换订单详情'
        }
      },
      {
        path: 'auction',
        name: 'auctionOrder',
        authority: 'auction',
        component: () => import('@/views/swap/auctionOrder'),
        meta: {
          title: '拍卖订单管理'
        }
      },
      {
        path: 'auction/detail',
        name: 'auctionOrderDetail',
        authority: 'auction',
        component: () => import('@/views/swap/auctionOrder/detail'),
        meta: {
          title: '拍卖订单详情'
        }
      },
      {
        path: 'recyling',
        name: 'recylingOrder',
        authority: 'recyling',
        component: () => import('@/views/gallery/category'),
        meta: {
          title: '回收订单管理'
        }
      },
      {
        path: 'arbitrate',
        name: 'arbitrate',
//      authority: 'arbitrate',
        component: () => import('@/views/swap/salesOrder/arbitrate'),
        meta: {
          title: '仲裁管理'
        }
      },
      {
        path: 'arbitrateDetail',
        name: 'arbitrateDetail',
//      authority: 'arbitrate',
        component: () => import('@/views/swap/salesOrder/arbitrateDetail'),
        meta: {
          title: '仲裁详情'
        }
      }
    ]
  },
  {
    path: '/recommended',
    name: 'recommended',
    authority: 'recommended',
    component: Layout,
    meta: {
      title: '推荐管理'
    },
    children: [
      {
        path: 'choicest',
        name: 'choicestRecommended',
        authority: 'choicest',
        component: () => import('@/views/swap/recommended/choicest.vue'),
        meta: {
          title: '精品推荐'
        }
      },
      {
        path: 'auction',
        name: 'auctionRecommended',
        authority: 'auction',
        component: () => import('@/views/swap/recommended/auction.vue'),
        meta: {
          title: '拍卖商品推荐'
        }
      },
      {
        path: 'recycle',
        name: 'recycleRecommended',
        authority: 'recycle',
        component: () => import('@/views/swap/recommended/recycle.vue'),
        meta: {
          title: '回收信息推荐'
        }
      },
      {
        path: 'exchange',
        name: 'exchangeRecommended',
        authority: 'swap',
        component: () => import('@/views/swap/recommended/exchange.vue'),
        meta: {
          title: '宝贝互换推荐'
        }
      },
      {
        path: 'sales',
        name: 'salesRecommended',
        authority: 'sales',
        component: () => import('@/views/swap/recommended/sales.vue'),
        meta: {
          title: '销售商品推荐'
        }
      }
    ]
  },
  {
    path: '/swapSettings',
    name: 'swapSettings',
    authority: 'swapSettings',
    component: Layout,
    meta: {
      title: '其他设置'
    },
    children: [
      {
        path: 'swapHome',
        name: 'swapHome',
        authority: 'swapHome',
        component: () => import('@/views/swap/homeSettings'),
        meta: {
          title: '主页设置'
        }
      },
      {
        path: 'swapGoodsCategory',
        name: 'swapGoodsCategory',
        authority: 'swapGoodsCategory',
        component: () => import('@/views/dm/base/swapGoodsCategory'),
        meta: {
          title: '商品分类'
        }
      },
      {
        path: 'setBrand',
        name: 'setBrand',
        authority: 'setBrand',
        component: () => import('@/views/swap/homeSettings/setBrand'),
        meta: {
          title: '设置品牌'
        }
      }
    ]
  },
  {
    path: '/discounts',
    name: 'discounts',
    authority: 'discounts',
    component: Layout,
    meta: {
      title: '营销活动'
    },
    children: [
      {
        path: 'index',
        name: 'discountsList',
        authority: 'index',
        component: () => import('@/views/swap/discounts'),
        meta: {
          title: '优惠券'
        }
      },
      {
        path: 'discountsAdd',
        name: 'discountsAdd',
        component: () => import('@/views/swap/discounts/add.vue'),
        meta: {
          title: '添加/编辑优惠券'
        }
      }
    ]
  },
  {
    path: '/jewelryTalent',
    name: 'jewelryTalent',
    authority: 'jewelryTalent',
    component: Layout,
    meta: {
      title: '珠宝达人'
    },
    children: [
      {
        path: 'index',
        name: 'jewelryTalentList',
        component: () => import('@/views/swap/jewelryTalent/index.vue'),
        meta: {
          title: '列表'
        }
      },
      {
        path: 'detail',
        name: 'jewelryTalentDetail',
        component: () => import('@/views/swap/jewelryTalent/detail.vue'),
        meta: {
          title: '详情'
        },
        hidden: true 
      }
    ]
  },
  {
    path: '/activities',
    name: 'activities',
    authority: 'activities',
    component: Layout,
    meta: {
      title: '活动列表'
    },
    children: [
      {
        path: 'swapActiveList',
        name: 'swapActiveList',
        authority: 'swapActiveList',
        component: () => import('@/views/dm/activities/swap.vue'),
        meta: {
          title: '互换坊活动'
        }
      },
      {
        path: 'swapAddActive',
        name: 'swapAddActive',
        component: () => import('@/views/dm/activities/swapAdd.vue'),
        meta: {
          title: '添加/编辑活动'
        }
      }
    ]
  },
  {
    path: '/swapScreenCategory',
    name: 'swapScreenCategory',
    authority: 'swapScreenCategory',
    component: Layout,
    meta: {
      title: '互换筛选分类'
    },
    children: [
      {
        path: 'swapScreen',
        name: 'swapScreen',
        authority: 'swapScreen',
        component: () => import('@/views/swap/swapScreenCategory/index.vue'),
        meta: {
          title: '筛选列表'
        }
      }
    ]
  }
]

