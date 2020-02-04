/* Layout */
import Layout from '@/views/layout/Layout'

// 设计室与制造间路由
export default [{
  path: '/base',
  name: 'base',
  authority: 'base',
  component: Layout,
  meta: {
    title: '基础数据管理'
  },
  children: [{
    path: 'designCategory',
    name: 'designCategory',
    authority: 'designCategory',
    component: () => import('@/views/dm/base/designCategory'),
    meta: {
      title: '设计师分类'
    }
  },
  {
    path: 'aftermarketCategory',
    name: 'aftermarketCategory',
    authority: 'aftermarketCategory',
    component: () => import('@/views/dm/base/aftermarketCategory'),
    meta: {
      title: '制造商分类'
    }
  },
  {
    path: 'designGoodsCategory',
    name: 'designGoodsCategory',
    authority: 'designGoodsCategory',
    component: () => import('@/views/dm/base/designGoodsCategory'),
    meta: {
      title: '设计室商品分类'
    }
  },
  {
    path: 'merchantGoodsCategory',
    name: 'merchantGoodsCategory',
    authority: 'merchantGoodsCategory',
    component: () => import('@/views/dm/base/merchantGoodsCategory'),
    meta: {
      title: '制造间商品分类'
    }
  },
  {
    path: 'jewelryGoodsCategory',
    name: 'jewelryGoodsCategory',
    //      authority: 'merchantGoodsCategory',
    component: () => import('@/views/dm/base/jewelryGoodsCategory'),
    meta: {
      title: '珠宝店商品分类'
    }
  },
  {
    path: 'designScreenCategory',
    name: 'designScreenCategory',
    authority: 'designScreenCategory',
    component: () => import('@/views/dm/base/designScreenCategory'),
    meta: {
      title: '设计室筛选分类'
    }
  },
  {
    path: 'makeMerchantScreenCategory',
    name: 'makeMerchantScreenCategory',
    authority: 'makeMerchantScreenCategory',
    component: () => import('@/views/dm/base/makeMerchantScreenCategory'),
    meta: {
      title: '制造间筛选分类'
    }
  },
  {
    path: 'craftCategory',
    name: 'craftCategory',
    authority: 'craftCategory',
    component: () => import('@/views/dm/base/craftCategory'),
    meta: {
      title: '工艺分类'
    }
  },
  {
    path: 'designTags',
    name: 'designTags',
    authority: 'designTags',
    component: () => import('@/views/dm/base/designTags'),
    meta: {
      title: '设计师标签'
    }
  },
  {
    path: 'designList',
    name: 'designList',
    authority: 'designList',
    component: () => import('@/views/dm/base/designList'),
    meta: {
      title: '设计师列表'
    }
  },
  {
    path: 'designerDetail',
    name: 'designerDetail',
    component: () => import('@/views/dm/base/designList/detail'),
    meta: {
      title: '设计师详情'
    }
  },
  {
    path: 'editDesigner',
    name: 'editDesigner',
    component: () => import('@/views/dm/base/designList/add'),
    meta: {
      title: '设计师添加/修改'
    }
  },
  {
    path: 'aftermarketTags',
    name: 'aftermarketTags',
    authority: 'aftermarketTags',
    component: () => import('@/views/dm/base/aftermarketTags'),
    meta: {
      title: '制造商标签'
    }
  },
  {
    path: 'craftList',
    name: 'craftList',
    authority: 'craftList',
    component: () => import('@/views/dm/base/craftList'),
    meta: {
      title: '工艺列表'
    }
  },
  {
    path: 'craftDetail',
    name: 'craftDetail',
    component: () => import('@/views/dm/base/craftList/detail'),
    meta: {
      title: '工艺详情'
    }
  },
  {
    path: 'brandList',
    name: 'brandList',
    //      authority: 'brandList',
    component: () => import('@/views/dm/base/jewelryBrand'),
    meta: {
      title: '品牌列表'
    }
  }
  ]
},
{
  path: '/dmWork',
  name: 'work',
  authority: 'dmWork',
  component: Layout,
  meta: {
    title: '商品管理'
  },
  // redirect: '/dmWork/list',
  children: [{
    path: 'list',
    name: 'workList',
    component: () => import('@/views/dm/workList'),
    meta: {
      title: '设计室商品'
    }
  },
  {
    path: 'makeWorkList',
    name: 'makeWorkList',
    component: () => import('@/views/dm/workList/makeWorkList'),
    meta: {
      title: '制造间商品'
    }
  },
  {
    path: 'jewelryWorkList',
    name: 'jewelryWorkList',
    component: () => import('@/views/dm/workList/jewelryWorkList'),
    meta: {
      title: '珠宝店商品'
    }
  },
  {
    path: 'detail',
    name: 'workDetail',
    component: () => import('@/views/dm/workList/detail'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: 'jewelryDetail',
    name: 'jewelryWorkDetail',
    component: () => import('@/views/dm/workList/jewelryDetail'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: 'jewelryComment',
    name: 'jewelryComment',
    component: () => import('@/views/dm/workList/jewelryComment'),
    meta: {
      title: '珠宝店评论'
    }
  },
  {
    path: 'jewelryCommentDetail',
    name: 'jewelryCommentDetail',
    component: () => import('@/views/dm/workList/jewelryCommentDetail'),
    meta: {
      title: '珠宝店评论'
    }
  }
  ]
},
{
  path: '/dmOrder',
  name: 'order',
  authority: 'dmOrder',
  component: Layout,
  meta: {
    title: '订单管理'
  },
  redirect: '/dmOrder/maker',
  children: [{
    path: 'designer',
    name: 'designerOrderList',
    authority: 'designer',
    component: () => import('@/views/dm/orderList/designer'),
    meta: {
      title: '设计室订单'
    }
  },
  {
    path: 'maker',
    name: 'makerOrderList',
    authority: 'maker',
    component: () => import('@/views/dm/orderList/maker'),
    meta: {
      title: '制造间订单'
    }
  },
  {
    path: 'jewelry',
    name: 'jewelryOrderList',
    //      authority: 'jewelry',
    component: () => import('@/views/dm/orderList/jewelry'),
    meta: {
      title: '珠宝店订单'
    }
  },
  {
    path: 'arbitrate',
    name: 'arbitrate',
    //      authority: 'arbitrate',
    component: () => import('@/views/dm/orderList/arbitrate'),
    meta: {
      title: '仲裁管理'
    }
  },
  {
    path: 'makerArbitrate',
    name: 'makerArbitrate',
    //      authority: 'arbitrate',
    component: () => import('@/views/dm/orderList/makerArbitrate'),
    meta: {
      title: '仲裁管理'
    }
  },
  {
    path: 'jewelryArbitrate',
    name: 'jewelryArbitrate',
    //      authority: 'arbitrate',
    component: () => import('@/views/dm/orderList/jewelryArbitrate'),
    meta: {
      title: '仲裁管理'
    }
  },
  {
    path: 'aftermarket',
    name: 'aftermarket',
    //      authority: 'aftermarket',
    component: () => import('@/views/dm/orderList/refund'),
    meta: {
      title: '售后管理'
    }
  },
  {
    path: 'aftermarketDetail',
    name: 'aftermarketDetail',
    component: () => import('@/views/dm/orderList/refundDetail'),
    meta: {
      title: '退款单详情'
    }
  },
  {
    path: 'arbitrateDetail',
    name: 'arbitrateDetail',
    component: () => import('@/views/dm/orderList/arbitrateDetail'),
    meta: {
      title: '仲裁详情'
    }
  },
  {
    path: 'detail',
    name: 'orderDetail',
    component: () => import('@/views/dm/orderList/detail'),
    meta: {
      title: '订单详情'
    }
  }
  ]
},
{
  path: '/homeSettings',
  name: 'homeSettings',
  authority: 'homeSettings',
  component: Layout,
  meta: {
    title: '主页配置'
  },
  children: [{
    path: 'design',
    name: 'designHomeSettings',
    authority: 'design',
    component: () => import('@/views/dm/homeSettings/design'),
    meta: {
      title: '设计室主页'
    }
  },
  {
    path: 'manufacturing',
    name: 'manufacturingHomeSettings',
    authority: 'manufacturing',
    component: () => import('@/views/dm/homeSettings/manufacturing'),
    meta: {
      title: '制造间主页'
    }
  },
  {
    path: 'jewelry',
    name: 'jewelryHomeSettings',
    //      authority: 'manufacturing',
    component: () => import('@/views/dm/homeSettings/jewelry'),
    meta: {
      title: '珠宝店主页'
    }
  }
  ]
},
{
  path: '/comment',
  name: 'comment',
  authority: 'comment',
  component: Layout,
  meta: {
    title: '评论管理'
  },
  children: [{
    path: 'designComment',
    name: 'designComment',
    authority: 'designComment',
    component: () => import('@/views/dm/comment/design'),
    meta: {
      title: '设计室评论'
    }
  },
  {
    path: 'maker',
    name: 'makerComment',
    authority: 'maker',
    component: () => import('@/views/dm/comment/maker'),
    meta: {
      title: '制造间评论'
    }
  },
  {
    path: 'jewelry',
    name: 'jewelryComments',
    //      authority: 'jewelryComment',
    component: () => import('@/views/dm/comment/jewelry'),
    meta: {
      title: '珠宝店评论'
    }
  },
  {
    path: 'commentDetail',
    name: 'commentDetail',
    component: () => import('@/views/dm/comment/detail'),
    meta: {
      title: '评论详情'
    }
  }
  ]
},
{
  path: '/statistics',
  name: 'statistics',
  authority: 'statistics',
  component: Layout,
  meta: {
    title: '数据统计'
  },
  children: [{
    path: 'designOrder',
    name: 'designOrder',
    authority: 'designOrder',
    component: () => import('@/views/dm/statistics/designOrder'),
    meta: {
      title: '设计室订单数据'
    }
  },
  {
    path: 'swapOrder',
    name: 'swapOrder',
    authority: 'swapOrder',
    component: () => import('@/views/dm/statistics/swapOrder'),
    meta: {
      title: '互换坊订单数据'
    }
  },
  {
    path: 'manufactureOrder',
    name: 'manufactureOrder',
    authority: 'manufactureOrder',
    component: () => import('@/views/dm/statistics/manufactureOrder'),
    meta: {
      title: '制造间订单数据'
    }
  },
  {
    path: 'jewelryOrder',
    name: 'jewelryOrder',
    //      authority: 'jewelryOrder',
    component: () => import('@/views/dm/statistics/jewelryOrder'),
    meta: {
      title: '珠宝店订单数据'
    }
  },
  {
    path: 'designSale',
    name: 'designSale',
    authority: 'designSale',
    component: () => import('@/views/dm/statistics/designSale'),
    meta: {
      title: '设计室销售数据'
    }
  },
  {
    path: 'swapSale',
    name: 'swapSale',
    authority: 'swapSale',
    component: () => import('@/views/dm/statistics/swapSale'),
    meta: {
      title: '互换坊销售数据'
    }
  },
  {
    path: 'manufactureSale',
    name: 'manufactureSale',
    authority: 'manufactureSale',
    component: () => import('@/views/dm/statistics/manufactureSale'),
    meta: {
      title: '制造间销售数据'
    }
  },
  {
    path: 'jewelrySale',
    name: 'jewelrySale',
    //      authority: 'jewelrySale',
    component: () => import('@/views/dm/statistics/jewelrySale'),
    meta: {
      title: '珠宝店销售数据'
    }
  },
  {
    path: 'designGoods',
    name: 'designGoods',
    authority: 'designGoods',
    component: () => import('@/views/dm/statistics/designGoods'),
    meta: {
      title: '设计室商品数据'
    }
  },
  {
    path: 'swapGoods',
    name: 'swapGoods',
    authority: 'swapGoods',
    component: () => import('@/views/dm/statistics/swapGoods'),
    meta: {
      title: '互换坊商品数据'
    }
  },
  {
    path: 'manufactureGoods',
    name: 'manufactureGoods',
    authority: 'manufactureGoods',
    component: () => import('@/views/dm/statistics/manufactureGoods'),
    meta: {
      title: '制造间商品数据'
    }
  },
  {
    path: 'jewelryGoods',
    name: 'jewelryGoods',
    //      authority: 'jewelryGoods',
    component: () => import('@/views/dm/statistics/jewelryGoods'),
    meta: {
      title: '珠宝店商品数据'
    }
  },
  {
    path: 'designMerchant',
    name: 'designMerchant',
    authority: 'designMerchant',
    component: () => import('@/views/dm/statistics/designMerchant'),
    meta: {
      title: '设计室商家数据'
    }
  },
  {
    path: 'swapMerchant',
    name: 'swapMerchant',
    authority: 'swapMerchant',
    component: () => import('@/views/dm/statistics/swapMerchant'),
    meta: {
      title: '互换坊商家数据'
    }
  },
  {
    path: 'manufactureMerchant',
    name: 'manufactureMerchant',
    authority: 'manufactureMerchant',
    component: () => import('@/views/dm/statistics/manufactureMerchant'),
    meta: {
      title: '制造间商家数据'
    }
  },
  {
    path: 'jewelryMerchant',
    name: 'jewelryMerchant',
    //      authority: 'jewelryMerchant',
    component: () => import('@/views/dm/statistics/jewelryMerchant'),
    meta: {
      title: '珠宝店商家数据'
    }
  }
  ]
},
{
  path: '/activities',
  name: 'activitie',
  authority: 'activities',
  component: Layout,
  meta: {
    title: '活动列表'
  },
  children: [{
    path: 'designActiveList',
    name: 'designActiveList',
    authority: 'designActiveList',
    component: () => import('@/views/dm/activities/design.vue'),
    meta: {
      title: '设计室活动'
    }
  },
  {
    path: 'makerActiveList',
    name: 'makerActiveList',
    authority: 'makerActiveList',
    component: () => import('@/views/dm/activities/maker.vue'),
    meta: {
      title: '制造间活动'
    }
  },
  {
    path: 'jewelryActiveList',
    name: 'jewelryActiveList',
    //      authority: 'jewelryActiveList',
    component: () => import('@/views/dm/activities/jewelry.vue'),
    meta: {
      title: '珠宝店活动'
    }
  },
  {
    path: 'designAddActive',
    name: 'designAddActive',
    component: () => import('@/views/dm/activities/designAdd.vue'),
    meta: {
      title: '添加/编辑活动'
    }
  },
  {
    path: 'makerAddActive',
    name: 'makerAddActive',
    component: () => import('@/views/dm/activities/makerAdd.vue'),
    meta: {
      title: '添加/编辑活动'
    }
  },
  {
    path: 'jewelryAddActive',
    name: 'jewelryAddActive',
    component: () => import('@/views/dm/activities/jewelryAdd.vue'),
    meta: {
      title: '添加/编辑活动'
    }
  },
  {
    path: 'preview',
    name: 'preview',
    component: () => import('@/views/dm/activities/preview.vue'),
    meta: {
      title: '活动预览'
    }
  }
  ]
},
{
  path: '/made',
  name: 'made',
  authority: 'made',
  component: Layout,
  meta: {
    title: '定制'
  },
  children: [{
    path: 'list',
    name: 'madeList',
    authority: 'list',
    component: () => import('@/views/dm/made'),
    meta: {
      title: '列表'
    }
  },
  {
    path: 'madeDetail',
    name: 'madeDetail',
    component: () => import('@/views/dm/made/detail'),
    meta: {
      title: '详情'
    }
  }
  ]
}
]
