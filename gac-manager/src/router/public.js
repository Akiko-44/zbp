/* Layout */
import Layout from '@/views/layout/Layout'
import container from '@/views/layout/container'

// 公共运营中心路由
export default [{
  path: '/merchant',
  component: Layout,
  authority: 'merchant',
  alwaysShow: true,
  children: [{
    path: 'list',
    name: 'merchantList',
    authority: 'list',
    component: () => import('@/views/public/merchant/list'),
    meta: {
      title: '商户列表'
    }
  },
  {
    path: 'detail',
    name: 'merchantDetail',
    component: () => import('@/views/public/merchant/detail.vue'),
    meta: {
      title: '商户详情'
    }
  },
  {
    path: 'merchantAuthList',
    name: 'merchantAuthList',
    authority: 'merchantAuthList',
    component: () => import('@/views/public/merchant/merchantAuth.vue'),
    meta: {
      title: '互换坊列表'
    }
  },
    // {
    //   path: 'usersList',
    //   name: 'usersList',
    //   authority: 'usersList',
    //   component: () => import('@/views/public/merchant/usersInfo.vue'),
    //   meta: {
    //     title: '会员列表'
    //   }
    // },
  {
    path: 'usersList',
    name: 'usersList',
    authority: 'usersList',
    // component: () => import('@/views/public/merchant/usersInfo.vue'),
    meta: {
      title: '会员列表'
    },
    component: container,
    redirect: '/merchant/usersList/index',
    children: [{
      path: 'index',
      name: 'usersListIndex',
      component: () => import('@/views/public/merchant/usersInfo'),
      meta: {
        title: '会员列表'
      }
    }, {
      path: 'recommendUsersList',
      name: 'recommendUsersList',
      // authority: 'recommendUsersList',
      component: () => import('@/views/public/merchant/recommendUsers'),
      meta: {
        title: '推荐用户列表'
      }
    }]
  },
  {
    path: 'publicAuditList',
    name: 'publicAuditList',
    authority: 'publicAuditList',
    component: () => import('@/views/public/auditCenter/index.vue'),
    meta: {
      title: '实名认证'
    }
  },
  {
    path: 'publicAuditDetail',
    name: 'publicAuditDetail',
    component: () => import('@/views/public/auditCenter/detail.vue'),
    meta: {
      title: '实名认证详情'
    },
    hidden: true
  },
  {
    path: 'intentionJoin',
    name: 'intentionJoin',
    component: container,
    redirect: '/merchant/intentionJoin/index',
    meta: {
      title: '入驻申请'
    },
    children: [{
      path: 'index',
      name: 'intentionJoinIndex',
      component: () => import('@/views/public/merchant/intentionJoin'),
      meta: {
        title: '入驻申请列表'
      }
    }, {
      path: 'intentionJoinLog',
      name: 'intentionJoinLog',
      // authority: 'intentionJoin',
      component: () => import('@/views/public/merchant/intentionJoinLog'),
      meta: {
        title: '跟进记录'
      },
      hidden: true
    },
    {
      path: 'addIntentionJoinLog',
      name: 'addIntentionJoinLog',
      component: () => import('@/views/public/merchant/addIntentionJoinLog'),
      meta: {
        title: '新增跟进记录'
      },
      hidden: true
    }
    ]
  }, {
    path: 'weMedia',
    name: 'weMedia',
    component: container,
    redirect: '/merchant/weMedia/index',
    meta: {
      title: '自媒体管理'
    },
    children: [{
      path: 'index',
      name: 'weMediaIndex',
      component: () => import('@/views/public/merchant/weMedia'),
      meta: {
        title: '自媒体列表'
      }
    }, {
      path: 'addWeMedia',
      name: 'addWeMedia',
      component: () => import('@/views/public/merchant/addWeMedia'),
      meta: {
        title: '创建/编辑账号'
      },
      hidden: true
    }, {
      path: 'weMediaFans',
      name: 'weMediaFans',
      component: () => import('@/views/public/merchant/weMediaFans'),
      meta: {
        title: '粉丝列表'
      },
      hidden: true
    }]
  }

  ]
},
{
  path: '/publicFund',
  name: 'publicFund',
  authority: 'publicFund',
  component: Layout,
  redirect: '/publicFund/financeStatistics',
  meta: {
    title: '财务管理'
  },
  children: [{
    path: 'financeStatistics',
    name: 'financeStatistics',
    authority: 'financeStatistics',
    component: () => import('@/views/public/fund/financeStatistics'),
    meta: {
      title: '财务统计'
    }
  },
  {
    path: 'kitingList',
    name: 'kitingList',
    authority: 'kitingList',
    component: () => import('@/views/public/fund/kitingList'),
    meta: {
      title: '提现列表'
    }
  },
  {
    path: 'jewelryFinanceStatistics',
    name: 'jewelryFinanceStatistics',
    authority: 'jewelryFinanceStatistics',
    component: () => import('@/views/public/fund/jewelryFinanceStatistics'),
    meta: {
      title: '珠宝店财务统计'
    }
  },
  {
    path: 'swapFinanceStatistics',
    name: 'swapFinanceStatistics',
    authority: 'swapFinanceStatistics',
    component: () => import('@/views/public/fund/swapFinanceStatistics'),
    meta: {
      title: '互换坊财务统计'
    }
  },
  {
    path: 'designFinanceStatistics',
    name: 'designFinanceStatistics',
    authority: 'designFinanceStatistics',
    component: () => import('@/views/public/fund/designFinanceStatistics'),
    meta: {
      title: '设计室财务统计'
    }
  },
  {
    path: 'makeFinanceStatistics',
    name: 'makeFinanceStatistics',
    authority: 'makeFinanceStatistics',
    component: () => import('@/views/public/fund/makeFinanceStatistics'),
    meta: {
      title: '制造间财务统计'
    }
  },
  {
    path: 'report',
    name: 'report',
    authority: 'report',
    component: () => import('@/views/public/fund/report'),
    meta: {
      title: '报表'
    }
  }, {
    path: 'orderCheck',
    name: 'orderCheck',
    authority: 'orderCheck',
    component: () => import('@/views/public/fund/orderCheck'),
    meta: {
      title: '订单初审'
    }
  }, {
    path: 'orderRecheck',
    name: 'orderRecheck',
    authority: 'orderRecheck',
    component: () => import('@/views/public/fund/orderRecheck'),
    meta: {
      title: '订单复审'
    }
  }, {
    path: 'orderListCheck',
    name: 'orderListCheck',
    authority: 'orderListCheck',
    component: () => import('@/views/public/fund/orderListCheck'),
    meta: {
      title: '订单列表'
    }
  }, {
    path: 'orderCheckDetail',
    name: 'orderCheckDetail',
    // authority: 'orderCheckDetail',
    component: () => import('@/views/public/fund/orderCheckDetail'),
    meta: {
      title: '订单详情'
    },
    hidden: true
  }, {
    path: 'platformKitingRecords',
    name: 'platformKitingRecords',
    component: () => import('@/views/public/fund/platformKitingRecords'),
    meta: {
      title: '平台提现'
    }
  }, {
    path: 'merchantKitingRecords',
    name: 'merchantKitingRecords',
    component: () => import('@/views/public/fund/merchantKitingRecords'),
    meta: {
      title: '商家提现'
    }
  }
  ]
},
{
  path: '/publicFeedback',
  name: 'publicFeedback',
  authority: 'publicFeedback',
  component: Layout,
  redirect: '/publicFeedback/list',
  meta: {
    title: '意见反馈'
  },
  children: [{
    path: 'list',
    name: 'list',
    authority: 'list',
    component: () => import('@/views/public/feedback/list'),
    meta: {
      title: '反馈列表'
    }
  },
  {
    path: 'detail',
    name: 'detail',
    component: () => import('@/views/public/feedback/detail'),
    meta: {
      title: '反馈详情'
    }
  }
  ]
},
{
  path: '/publicHelp',
  name: 'publicHelp',
  authority: 'publicHelp',
  component: Layout,
  redirect: '/publicHelp/index',
  meta: {
    title: '帮助中心'
  },
  children: [{
    path: 'category',
    name: 'category',
    authority: 'category',
    component: () => import('@/views/public/help/category'),
    meta: {
      title: '分类'
    }
  },
  {
    path: 'index',
    name: 'index',
    authority: 'index',
    component: () => import('@/views/public/help/index'),
    meta: {
      title: '帮助中心首页'
    }
  },
  {
    path: 'detail',
    name: 'docDetail',
    component: () => import('@/views/public/help/detail'),
    meta: {
      title: '文档详情'
    }
  },
  {
    path: 'releaseDocument',
    name: 'releaseDocument',
    component: () => import('@/views/public/help/releaseDocument'),
    meta: {
      title: '发布文档'
    }
  },
  {
    path: 'editDocument',
    name: 'editDocument',
    component: () => import('@/views/public/help/editDocument'),
    meta: {
      title: '编辑文档'
    }
  }
  ]
},
{
  path: '/publicMsg',
  name: 'publicMsg',
  authority: 'publicMsg',
  component: Layout,
  redirect: '/publicMsg/list',
  meta: {
    title: '消息提示'
  },
  children: [{
    path: 'list',
    name: 'msglist',
    authority: 'list',
    component: () => import('@/views/public/message/list'),
    meta: {
      title: '消息列表'
    }
  },
  {
    path: 'editMsg',
    name: 'editMsg',
    component: () => import('@/views/public/message/editMsg'),
    meta: {
      title: '编辑'
    }
  },
  {
    path: 'release',
    name: 'release',
    component: () => import('@/views/public/message/release'),
    meta: {
      title: '发布'
    }
  }
  ]
},
{
  path: '/publicSettings',
  name: 'publicSettings',
  authority: 'publicSettings',
  component: Layout,
  redirect: '/publicSettings/publicHomeSettings',
  meta: {
    title: '其它设置'
  },
  children: [{
    path: 'publicHomeSettings',
    name: 'publicHomeSettings',
    authority: 'publicHomeSettings',
    component: () => import('@/views/public/settings/homeSettings'),
    meta: {
      title: '主页设置'
    },
    hidden: true
  },
  {
    path: 'publicLink',
    name: 'publicLink',
    authority: 'publicLink',
    component: () => import('@/views/public/link'),
    meta: {
      title: '友情链接'
    }
  },
  {
    path: 'publicRegular',
    name: 'publicRegular',
    authority: 'publicRegular',
    component: () => import('@/views/public/settings/setRegular'),
    meta: {
      title: '敏感词设置'
    }
  }
  ]
},
{
  path: '/publicStatistics',
  name: 'publicStatistics',
  authority: 'publicStatistics',
  component: Layout,
  redirect: '/publicStatistics/operateStatistics',
  meta: {
    title: '统计查询'
  },
  children: [{
    path: 'operateStatistics',
    name: 'operateStatistics',
    authority: 'operateStatistics',
    component: () => import('@/views/public/statistics/operateStatistics.vue'),
    meta: {
      title: '运营数据'
    }
  },
  {
    path: 'memberStatistics',
    name: 'memberStatistics',
    authority: 'memberStatistics',
    component: () => import('@/views/public/statistics/memberStatistics.vue'),
    meta: {
      title: '会员查询'
    }
  },
  {
    path: 'merchantsStatistics',
    name: 'merchantsStatistics',
    authority: 'merchantsStatistics',
    component: () => import('@/views/public/statistics/merchantsStatistics.vue'),
    meta: {
      title: '商家查询'
    }
  },
  {
    path: 'goodsStatistics',
    name: 'goodsStatistics',
    authority: 'goodsStatistics',
    component: () => import('@/views/public/statistics/goodsStatistics.vue'),
    meta: {
      title: '商品统计'
    }
  },
  {
    path: 'goodsQuery',
    name: 'goodsQuery',
    authority: 'goodsQuery',
    component: () => import('@/views/public/statistics/goodsQuery.vue'),
    meta: {
      title: '商品查询'
    }
  },
  {
    path: 'orderStatistics',
    name: 'orderStatistics',
    authority: 'orderStatistics',
    component: () => import('@/views/public/statistics/orderStatistics.vue'),
    meta: {
      title: '订单统计'
    }
  },
  {
    path: 'orderQuery',
    name: 'orderQuery',
    authority: 'orderQuery',
    component: () => import('@/views/public/statistics/orderQuery.vue'),
    meta: {
      title: '订单查询'
    }
  },
  {
    path: 'userStatistics',
    name: 'userStatistics',
    authority: 'userStatistics',
    component: () => import('@/views/public/statistics/userStatistics.vue'),
    meta: {
      title: '会员统计'
    }
  },
  {
    path: 'merchantStatistics',
    name: 'merchantStatistics',
    authority: 'merchantStatistics',
    component: () => import('@/views/public/statistics/merchantStatistics.vue'),
    meta: {
      title: '商户统计'
    }
  }, {
    path: 'jewelryCircleStatistics',
    name: 'jewelryCircleStatistics',
    authority: 'jewelryCircleStatistics',
    component: () => import('@/views/public/statistics/jewelryCircleStatistics.vue'),
    meta: {
      title: '珠宝圈统计'
    }
  }, {
    path: 'messageStatistics',
    name: 'messageStatistics',
    authority: 'messageStatistics',
    component: () => import('@/views/public/statistics/messageStatistics.vue'),
    meta: {
      title: '招商短信'
    }
  }
  ]
},
{
  path: '/system',
  name: 'system',
  authority: 'system',
  component: Layout,
  redirect: '/system/honest',
  meta: {
    title: '系统管理'
  },
  children: [{
    path: 'honest',
    name: 'honest',
    // authority: 'honest',
    component: () => import('@/views/public/system/honest'),
    meta: {
      title: '诚信企业'
    }
  }, {
    path: 'honestModify',
    name: 'honestModify',
    // authority: 'honestModify',
    component: () => import('@/views/public/system/honest/modify'),
    meta: {
      title: '诚信企业编辑'
    }
  }, {
    path: 'complaint',
    name: 'complaint',
    // authority: 'complaint',
    component: () => import('@/views/public/system/complaint'),
    meta: {
      title: '投诉处理'
    }
  }, {
    path: 'complaintDetail',
    name: 'complaintDetail',
    // authority: 'complaintDetail',
    component: () => import('@/views/public/system/complaint/detail'),
    meta: {
      title: '投诉详情'
    }
  }, {
    path: 'guidance',
    name: 'guidance',
    // authority: 'guidance',
    component: () => import('@/views/public/system/guidance'),
    meta: {
      title: '今日指导价'
    }
  }, {
    path: 'guidanceModify',
    name: 'guidanceModify',
    // authority: 'guidanceModify',
    component: () => import('@/views/public/system/guidance/modify'),
    meta: {
      title: '今日指导价编辑'
    }
  }, {
    path: 'announcement',
    name: 'announcement',
    // authority: 'announcement',
    component: () => import('@/views/public/system/announcement'),
    meta: {
      title: '平台公告'
    }
  }, {
    path: 'announcementModify',
    name: 'announcementModify',
    // authority: 'announcementModify',
    component: () => import('@/views/public/system/announcement/modify'),
    meta: {
      title: '公告编辑'
    }
  }, {
    path: 'announcementDetail',
    name: 'announcementDetail',
    // authority: 'announcementModify',
    component: () => import('@/views/public/system/announcement/detail'),
    meta: {
      title: '公告详情'
    }
  }, {
    path: 'testUser',
    name: 'testUser',
    // authority: 'guidance',
    component: () => import('@/views/public/system/testUser'),
    meta: {
      title: '测试用户'
    }
  }, {
    path: 'testUserModify',
    name: 'testUserModify',
    // authority: 'guidanceModify',
    component: () => import('@/views/public/system/testUser/modify'),
    meta: {
      title: '测试用户编辑'
    }
  }, {
    path: 'testMerchant',
    name: 'testMerchant',
    // authority: 'guidance',
    component: () => import('@/views/public/system/testMerchant'),
    meta: {
      title: '测试商家'
    }
  }, {
    path: 'testMerchantModify',
    name: 'testMerchantModify',
    // authority: 'guidanceModify',
    component: () => import('@/views/public/system/testMerchant/modify'),
    meta: {
      title: '测试商家编辑'
    }
  }, {
    path: 'menuCategory',
    name: 'menuCategory',
    component: container,
    redirect: '/system/menuCategory/index',
    // authority: 'guidance',
    meta: {
      title: '菜单分类'
    },
    children: [{
      path: 'index',
      name: 'menuCategoryIndex',
      // authority: 'guidanceModify',
      component: () => import('@/views/public/system/category'),
      meta: {
        title: '分类列表'
      }
    }, {
      path: 'addFirstCategory',
      name: 'addFirstCategory',
      // authority: 'guidanceModify',
      component: () => import('@/views/public/system/category/addFirst'),
      meta: {
        title: '添加/编辑一级菜单'
      }
    }, {
      path: 'secondCategoryList',
      name: 'secondCategoryList',
      component: () => import('@/views/public/system/category/secondList'),
      // authority: 'guidanceModify',
      meta: {
        title: '二级菜单管理'
      }
    }, {
      path: 'secondCategoryAttrList',
      name: 'secondCategoryAttrList',
      // authority: 'guidanceModify',
      component: () => import('@/views/public/system/category/attrList'),
      meta: {
        title: '关联类目属性'
      }
    }, {
      path: 'thirdCategoryList',
      name: 'thirdCategoryList',
      // authority: 'guidanceModify',
      component: () => import('@/views/public/system/category/thirdList'),
      meta: {
        title: '三级菜单管理'
      }
    }, {
      path: 'addSecondCategory',
      name: 'addSecondCategory',
      // authority: 'guidanceModify',
      component: () => import('@/views/public/system/category/addSecond'),
      meta: {
        title: '添加/编辑二级菜单'
      }
    }, {
      path: 'addThirdCategory',
      name: 'addThirdCategory',
      // authority: 'guidanceModify',
      component: () => import('@/views/public/system/category/addThird'),
      meta: {
        title: '添加/编辑三级菜单'
      }
    }]
  }, {
    path: 'skuList',
    name: 'skuList',
    component: container,
    // authority: 'guidanceModify',
    redirect: '/system/skuList/index',
    meta: {
      title: 'SKU管理'
    },
    children: [{
      path: 'index',
      name: 'skuListIndex',
      // authority: 'guidanceModify',
      component: () => import('@/views/public/system/sku'),
      meta: {
        title: 'SKU列表'
      }
    }, {
      path: 'skuModify',
      name: 'skuModify',
      // authority: 'guidanceModify',
      component: () => import('@/views/public/system/sku/modify'),
      meta: {
        title: 'SKU编辑'
      }
    }, {
      path: 'attributeList',
      name: 'attributeList',
      // authority: 'guidanceModify',
      component: () => import('@/views/public/system/sku/attributeList'),
      meta: {
        title: '属性值列表'
      }
    }, {
      path: 'attributeModify',
      name: 'attributeModify',
      // authority: 'guidanceModify',
      component: () => import('@/views/public/system/sku/attributeModify'),
      meta: {
        title: '属性值编辑'
      }
    }]
  }, {
    path: 'categoryAttributes',
    name: 'categoryAttributes',
    component: container,
    redirect: '/system/categoryAttributes/index',
    meta: {
      title: '类目属性管理'
    },
    children: [{
      path: 'index',
      name: 'categoryAttributesIndex',
      component: () => import('@/views/public/system/categoryAttributes'),
      meta: {
        title: '类目属性列表'
      }
    }, {
      path: 'categoryAttrModify',
      name: 'categoryAttrModify',
      component: () => import('@/views/public/system/categoryAttributes/modify'),
      meta: {
        title: '类目属性添加/修改'
      }
    }, {
      path: 'attrValueList',
      name: 'attrValueList',
      component: () => import('@/views/public/system/categoryAttributes/attrValueList'),
      meta: {
        title: '类目属性值管理'
      }
    }, {
      path: 'attrValueModify',
      name: 'attrValueModify',
      component: () => import('@/views/public/system/categoryAttributes/attrValueModify'),
      meta: {
        title: '类目属性值添加/修改'
      }
    }]
  },
  {
    path: 'style',
    name: 'style',
    component: container,
    redirect: '/system/style/index',
    // component: () => import('@/views/public/system/style'),
    meta: {
      title: '款式管理'
    },
    children: [{
      path: 'index',
      name: 'styleIndex',
      component: () => import('@/views/public/system/style'),
      meta: {
        title: '款式列表'
      }
    }, {
      path: 'styleModify',
      name: 'styleModify',
      component: () => import('@/views/public/system/style/modify'),
      meta: {
        title: '款式管理添加/修改'
      }
    }]
  },
  {
    path: 'brand',
    name: 'brand',
    component: container,
    redirect: '/system/brand/index',
    // component: () => import('@/views/public/system/style'),
    meta: {
      title: '品牌管理'
    },
    children: [{
      path: 'index',
      name: 'brandIndex',
      // authority: 'announcement',
      component: () => import('@/views/public/system/brand'),
      meta: {
        title: '品牌列表'
      }
    }, {
      path: 'brandmanager',
      name: 'brandmanager',
      // authority: 'announcement',
      component: () => import('@/views/public/system/brand/brandmanager'),
      meta: {
        title: '新增/修改品牌管理'
      }
    }, {
      path: 'merchantList',
      name: 'brandmerchantList',
      // authority: 'announcement',
      component: () => import('@/views/public/system/brand/merchantList'),
      meta: {
        title: '绑定商家'
      }
    }, {
      path: 'merchantManager',
      name: 'merchantManager',
      // authority: 'announcement',
      component: () => import('@/views/public/system/brand/merchantManager'),
      meta: {
        title: '添加商家'
      }
    }, {
      path: 'merchantChangeList',
      name: 'merchantChangeList',
      // authority: 'announcement',
      component: () => import('@/views/public/system/brand/merchantChangeList'),
      meta: {
        title: '商家选择'
      }
    }]
  }, {
    path: 'enterprises',
    name: 'enterprises',
    // authority: 'operateVideo',
    component: () => import('@/views/public/system/enterprises'),
    meta: {
      title: '企业名录'
    }
  }, {
    path: 'enterprisesModify',
    name: 'enterprisesModify',
    // authority: 'operateVideo',
    component: () => import('@/views/public/system/enterprises/modify'),
    meta: {
      title: '企业名录编辑'
    }
  }, {
    path: 'parameterSetting',
    name: 'parameterSetting',
    // authority: 'operateVideo',
    component: () => import('@/views/public/system/parameterSetting'),
    meta: {
      title: '参数设置'
    }
  }, {
    path: 'log',
    name: 'log',
    // authority: 'operateVideo',
    component: () => import('@/views/public/system/log'),
    meta: {
      title: '操作日志'
    }
  }, {
    path: 'designCategory',
    name: 'publicDesignCategory',
    component: () => import('@/views/public/system/designCategory'),
    meta: {
      title: '设计师分类'
    }
  }
  ]
},
{
  path: '/promotion',
  name: 'promotion',
  // authority: 'promotion',
  component: Layout,
  redirect: '/promotion/banner',
  meta: {
    title: '运营推广'
  },
  children: [{
    path: 'banner',
    name: 'banner',
    // authority: 'operateVideo',
    component: () => import('@/views/public/promotion/banner'),
    meta: {
      title: 'banner设置'
    }
  }, {
    path: 'bannerModify',
    name: 'bannerModify',
    // authority: 'operateVideo',
    component: () => import('@/views/public/promotion/banner/modify'),
    meta: {
      title: '编辑banner'
    },
    hidden: true
  }, {
    path: 'theme',
    name: 'theme',
    // authority: 'operateVideo',
    // component: () => import('@/views/public/promotion/theme'),
    component: container,
    redirect: '/promotion/theme/index',
    meta: {
      title: '活动主题背景'
    },
    children: [{
      path: 'index',
      name: 'themeIndex',
      component: () => import('@/views/public/promotion/theme'),
      meta: {
        title: '活动主题列表'
      }
    }, {
      path: 'PCHome',
      name: 'PCHome',
      component: () => import('@/views/public/promotion/theme/PCHome'),
      meta: {
        title: 'PC-首页活动主题'
      }
    }, {
      path: 'PCLogin',
      name: 'PCLogin',
      component: () => import('@/views/public/promotion/theme/PCLogin'),
      meta: {
        title: 'PC-登录页活动主题'
      }
    }, {
      path: 'PCRegister',
      name: 'PCRegister',
      component: () => import('@/views/public/promotion/theme/PCRegister'),
      meta: {
        title: 'PC-注册页活动主题'
      }
    }, {
      path: 'APPHome',
      name: 'APPHome',
      component: () => import('@/views/public/promotion/theme/APPHome'),
      meta: {
        title: 'APP-首页活动主题'
      }
    }, {
      path: 'APPMine',
      name: 'APPMine',
      component: () => import('@/views/public/promotion/theme/APPMine'),
      meta: {
        title: 'APP-个人中心活动主题'
      }
    }]
  }, {
    path: 'recommend',
    name: 'recommend',
    // authority: 'operateVideo',
    component: () => import('@/views/public/promotion/recommend/index'),
    meta: {
      title: '首页推荐'
    },
    hidden: true
  }, {
    path: 'jewelryHomepage',
    name: 'jewelryHomepage',
    // authority: 'operateVideo',
    // component: () => import('@/views/public/promotion/theme'),
    component: container,
    redirect: '/promotion/jewelryHomepage/index',
    meta: {
      title: '去哪儿买首页配置'
    },
    children: [{
      path: 'index',
      name: 'jewelryHomepageIndex',
      component: () => import('@/views/public/promotion/jewelryHomepage'),
      meta: {
        title: '首页配置'
      }
    }, {
      path: 'business',
      name: 'jewelryHomepageBusiness',
      component: () => import('@/views/public/promotion/jewelryHomepage/business'),
      meta: {
        title: '品牌商家'
      }
    }, {
      path: 'businessDetail',
      name: 'jewelryHomepageBusinessDetail',
      component: () => import('@/views/public/promotion/jewelryHomepage/businessDetail'),
      meta: {
        title: '商家详情'
      }
    }, {
      path: 'goods',
      name: 'jewelryHomepageGoods',
      component: () => import('@/views/public/promotion/jewelryHomepage/goods'),
      meta: {
        title: '普通商品'
      }
    }, {
      path: 'assembleGoods',
      name: 'jewelryHomepageAssemble',
      component: () => import('@/views/public/promotion/jewelryHomepage/assembleGoods'),
      meta: {
        title: '拼团商品'
      }
    }, {
      path: 'promoteGoods',
      name: 'jewelryHomepagePromotion',
      component: () => import('@/views/public/promotion/jewelryHomepage/promoteGoods'),
      meta: {
        title: '促销商品'
      }
    }, {
      path: 'zone',
      name: 'jewelryHomepageZone',
      component: () => import('@/views/public/promotion/jewelryHomepage/zone'),
      meta: {
        title: '专区设置'
      }
    }]
  }, {
    path: 'advertisement',
    name: 'advertisement',
    // authority: 'advertisement',
    component: container,
    redirect: '/promotion/advertisement/index',
    meta: {
      title: '广告设置'
    },
    children: [{
      path: 'index',
      name: 'advertisementIndex',
      component: () => import('@/views/public/promotion/advertisement'),
      meta: {
        title: '广告设置列表'
      }
    }, {
      path: 'modify',
      name: 'advertisementModify',
      component: () => import('@/views/public/promotion/advertisement/modify'),
      meta: {
        title: '修改广告设置'
      }
    }]
  }, {
    path: 'homePage',
    name: 'homePage',
    // authority: 'operateVideo',
    // component: () => import('@/views/public/promotion/theme'),
    component: container,
    redirect: '/promotion/homePage/index',
    meta: {
      title: '首页配置'
    },
    children: [{
      path: 'index',
      name: 'homePageIndex',
      component: () => import('@/views/public/promotion/homePage'),
      meta: {
        title: '模块配置'
      }
    }, {
      path: 'business',
      name: 'homePageBusiness',
      component: () => import('@/views/public/promotion/homePage/business'),
      meta: {
        title: '品牌商家'
      }
    }, {
      path: 'businessDetail',
      name: 'homePageBusinessDetail',
      component: () => import('@/views/public/promotion/homePage/businessDetail'),
      meta: {
        title: '商家详情'
      }
    }, {
      path: 'goods',
      name: 'homePageGoods',
      component: () => import('@/views/public/promotion/homePage/goods'),
      meta: {
        title: '普通商品'
      }
    }, {
      path: 'content',
      name: 'homePageContent',
      component: () => import('@/views/public/promotion/homePage/content'),
      meta: {
        title: '珠宝圈内容'
      }
    }, {
      path: 'assembleGoods',
      name: 'homePageAssemble',
      component: () => import('@/views/public/promotion/homePage/assembleGoods'),
      meta: {
        title: '拼团商品'
      }
    }, {
      path: 'promoteGoods',
      name: 'homePagePromoteGoods',
      component: () => import('@/views/public/promotion/homePage/promoteGoods'),
      meta: {
        title: '促销商品'
      }
    }]
  }, {
    path: 'designHomepage',
    name: 'designHomepage',
    // authority: 'operateVideo',
    // component: () => import('@/views/public/promotion/theme'),
    component: container,
    redirect: '/promotion/designHomepage/index',
    meta: {
      title: '设计师首页配置'
    },
    children: [{
      path: 'index',
      name: 'designHomepageIndex',
      component: () => import('@/views/public/promotion/designHomepage'),
      meta: {
        title: '首页配置'
      }
    }, {
      path: 'designer',
      name: 'designHomepageDesigner',
      component: () => import('@/views/public/promotion/designHomepage/designer'),
      meta: {
        title: '设计师配置'
      }
    }, {
      path: 'designerDetail',
      name: 'designHomepageDesignerDetail',
      component: () => import('@/views/public/promotion/designHomepage/designerDetail'),
      meta: {
        title: '设计师作品配置'
      }
    }, {
      path: 'goods',
      name: 'designHomepageGoods',
      component: () => import('@/views/public/promotion/designHomepage/goods'),
      meta: {
        title: '作品配置'
      }
    }]
  }, {
    path: 'jewelryCircleAdv',
    name: 'jewelryCircleAdv',
    component: () => import('@/views/public/promotion/jewelryCircleAdv'),
    meta: {
      title: '珠宝圈广告位'
    }
  }, {
    path: 'jewelryCircleAdvModify',
    name: 'jewelryCircleAdvModify',
    component: () => import('@/views/public/promotion/jewelryCircleAdv/modify'),
    meta: {
      title: '编辑珠宝圈广告位'
    },
    hidden: true
  }, {
    path: 'luckDraw',
    name: 'luckDraw',
    // authority: 'operateVideo',
    component: container,
    redirect: '/promotion/luckDraw/index',
    meta: {
      title: '抽奖活动'
    },
    children: [{
      path: 'index',
      name: 'luckDrawIndex',
      component: () => import('@/views/public/promotion/luckDraw'),
      meta: {
        title: '活动列表'
      }
    }, {
      path: 'draw',
      name: 'addDraw',
      component: () => import('@/views/public/promotion/luckDraw/draw'),
      meta: {
        title: '添加活动'
      }
    }, {
      path: 'roster',
      name: 'rosterDraw',
      component: () => import('@/views/public/promotion/luckDraw/roster'),
      meta: {
        title: '中奖名单'
      }
    }]
  }, {
    path: 'appIcon',
    name: 'appIcon',
    component: () => import('@/views/public/promotion/appIcon'),
    meta: {
      title: '应用图标'
    }
  }, {
    path: 'coopenAdv',
    name: 'coopenAdv',
    component: container,
    redirect: '/promotion/coopenAdv/index',
    meta: {
      title: '开屏广告页'
    },
    children: [{
      path: 'index',
      name: 'coopenAdvIndex',
      component: () => import('@/views/public/promotion/coopenAdv'),
      meta: {
        title: '广告列表'
      }
    }, {
      path: 'modify',
      name: 'coopenAdvModify',
      component: () => import('@/views/public/promotion/coopenAdv/modify'),
      meta: {
        title: '添加/编辑开屏广告页'
      }
    }]
  }, {
    path: 'activityTheme',
    name: 'activityTheme',
    component: container,
    redirect: '/promotion/activityTheme/index',
    meta: {
      title: '活动主题'
    },
    children: [{
      path: 'index',
      name: 'activityThemeIndex',
      component: () => import('@/views/public/promotion/activityTheme'),
      meta: {
        title: '活动主题列表'
      }
    }, {
      path: 'modify',
      name: 'activityThemeModify',
      component: () => import('@/views/public/promotion/activityTheme/modify'),
      meta: {
        title: '添加/编辑活动主题'
      }
    }, {
      path: 'relationGoods',
      name: 'activityThemeRelationGoods',
      component: () => import('@/views/public/promotion/activityTheme/relationGoods'),
      meta: {
        title: '关联商品'
      }
    }]
  }]
},
{
  path: '/work',
  name: 'publicWork',
  // authority: 'operateVideo',
  component: Layout,
  redirect: '/work/jewelry',
  meta: {
    title: '商品管理'
  },
  children: [{
    path: 'jewelry',
    name: 'publicJewelryWork',
    // authority: 'publicJewelryWork',
    component: () => import('@/views/public/workList/jewelryWorkList'),
    meta: {
      title: '珠宝店商品'
    }
  }, {
    path: 'jewelryDetail',
    name: 'publicJewelryDetail',
    // authority: 'publicJewelryDetail',
    component: () => import('@/views/public/workList/jewelryDetail'),
    meta: {
      title: '商品详情'
    },
    hidden: true
  }, {
    path: 'design',
    name: 'publicDesignWork',
    // authority: 'operateVideo',
    component: () => import('@/views/public/workList/index'),
    meta: {
      title: '设计师作品'
    }
  }, {
    path: 'designDetail',
    name: 'publicDesignDetail',
    // authority: 'operateVideo',
    component: () => import('@/views/public/workList/detail'),
    meta: {
      title: '作品详情'
    },
    hidden: true
  }, {
    path: 'customMade',
    name: 'publicCustomMadeWork',
    // authority: 'operateVideo',
    component: () => import('@/views/public/workList/customMadeWorkList'),
    meta: {
      title: '定制商品'
    }
  },
  {
    path: 'publicjewelryComment',
    name: 'publicjewelryComment',
    component: () => import('@/views/public/workList/jewelryComment'),
    meta: {
      title: '珠宝店评论'
    }
  },
  {
    path: 'publicjewelryCommentDetail',
    name: 'publicjewelryCommentDetail',
    component: () => import('@/views/public/workList/jewelryCommentDetail'),
    meta: {
      title: '珠宝店评论'
    }
  }
  ]
},
{
  path: '/order',
  name: 'publicOrder',
  // authority: 'operateVideo',
  component: Layout,
  redirect: '/order/jewelry',
  meta: {
    title: '订单管理'
  },
  children: [{
    path: 'jewelry',
    name: 'publicJewelryOrder',
    // authority: 'publicJewelryWork',
    component: () => import('@/views/public/orderList/jewelry'),
    meta: {
      title: '珠宝店订单'
    }
  }, {
    path: 'jewelryDetail',
    name: 'publicOrderDetail',
    // authority: 'publicJewelryDetail',
    component: () => import('@/views/public/orderList/detail'),
    meta: {
      title: '订单详情'
    },
    hidden: true
  }, {
    path: 'customMade',
    name: 'publicCustomMadeOrder',
    // authority: 'operateVideo',
    component: () => import('@/views/public/orderList/designer'),
    meta: {
      title: '定制订单'
    }
  }]
},
{
  path: '/refundOrder',
  name: 'publicRefundOrder',
  // authority: 'operateVideo',
  component: Layout,
  redirect: '/refundOrder/jewelry',
  meta: {
    title: '退款管理'
  },
  children: [{
    path: 'jewelry',
    name: 'publicJewelryRefundOrder',
    // authority: 'publicJewelryWork',
    component: () => import('@/views/public/orderList/refund'),
    meta: {
      title: '珠宝店退款'
    }
  }, {
    path: 'aftermarketDetail',
    name: 'publicAftermarketDetail',
    component: () => import('@/views/public/orderList/refundDetail'),
    meta: {
      title: '退款单详情'
    }
  }]
},
{
  path: '/arbitrate',
  name: 'publicArbitrate',
  // authority: 'operateVideo',
  component: Layout,
  redirect: '/arbitrate/jewelry',
  meta: {
    title: '仲裁管理'
  },
  children: [{
    path: 'jewelry',
    name: 'publicJewelryArbitrate',
    // authority: 'publicJewelryWork',
    component: () => import('@/views/public/orderList/jewelryArbitrate'),
    meta: {
      title: '珠宝店仲裁'
    }
  }, {
    path: 'design',
    name: 'publicDesignArbitrate',
    component: () => import('@/views/public/orderList/arbitrate'),
    meta: {
      title: '设计师仲裁'
    }
  }, {
    path: 'arbitrateDetail',
    name: 'publicArbitrateDetail',
    component: () => import('@/views/public/orderList/arbitrateDetail'),
    meta: {
      title: '仲裁详情'
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
    title: '操作视频'
  },
  children: [{
    path: 'videoList',
    name: 'videoList',
    // authority: 'operateVideo',
    component: () => import('@/views/public/operateVideo'),
    meta: {
      title: '视频列表'
    }
  }, {
    path: 'videoDetail',
    name: 'videoDetail',
    // authority: 'operateVideo',
    component: () => import('@/views/public/operateVideo/detail'),
    meta: {
      title: '视频详情'
    },
    hidden: true
  }]
},
{
  path: '/blockChainCallback',
  name: 'blockChainCallback',
  // authority: 'operateVideo',
  component: Layout,
  redirect: '/blockChainCallback/callBackList',
  meta: {
    title: '回调管理'
  },
  children: [{
    path: 'callBackList',
    name: 'callBackList',
    // authority: 'callBackList',
    component: () => import('@/views/public/blockChainCallback'),
    meta: {
      title: '回调管理列表'
    }
  }]
}, {
  path: '/jewelryRing',
  name: 'jewelryRing',
  // authority: 'operateVideo',
  component: Layout,
  redirect: '/jewelryRing/contentManage',
  meta: {
    title: '珠宝圈'
  },
  children: [{
    path: 'programaManage',
    name: 'programaManage',
    // authority: 'callBackList',
    component: () => import('@/views/public/jewelryRing/programaManage'),
    meta: {
      title: '栏目管理'
    }
  }, {
    path: 'labelManage',
    name: 'labelManager',
    component: container,
    redirect: '/jewelryRing/labelManage/index',
    // component: () => import('@/views/public/jewelryRing/labelManage'),
    meta: {
      title: '标签管理'
    },
    children: [{
      path: 'index',
      name: 'labelManage',
      component: () => import('@/views/public/jewelryRing/labelManage'),
      meta: {
        title: '标签列表'
      }
    },
    {
      path: 'labelManageModify',
      name: 'labelManageModify',
      // authority: 'callBackList',
      component: () => import('@/views/public/jewelryRing/labelManage/modify'),
      meta: {
        title: '标签添加/修改'
      }
    }
    ]
  },
  {
    path: 'contentManage',
    name: 'contentManager',
    component: container,
    redirect: '/jewelryRing/contentManage/index',
    // component: () => import('@/views/public/jewelryRing/contentManage'),
    meta: {
      title: '内容管理'
    },
    children: [{
      path: 'index',
      name: 'contentManage',
      component: () => import('@/views/public/jewelryRing/contentManage'),
      meta: {
        title: '内容列表'
      }
    },
    {
      path: 'contentManageDetail',
      name: 'contentManageDetail',
      // authority: 'callBackList',
      component: () => import('@/views/public/jewelryRing/contentManage/detail'),
      meta: {
        title: '内容详情'
      }
    },
    {
      path: 'contentManageModify',
      name: 'contentManageModify',
      // authority: 'callBackList',
      component: () => import('@/views/public/jewelryRing/contentManage/modify'),
      meta: {
        title: '内容添加/修改'
      }
    },
    {
      path: 'associatedGoods',
      name: 'associatedGoods',
      // authority: 'announcement',
      component: () => import('@/views/public/jewelryRing/contentManage/associatedGoods'),
      meta: {
        title: '绑定商品'
      }
    },
    {
      path: 'commentsGoods',
      name: 'commentsGoods',
      // authority: 'announcement',
      component: () => import('@/views/public/jewelryRing/contentManage/comments'),
      meta: {
        title: '全部评论'
      }
    }
    ]
  }, {
    path: 'contentDraftManage',
    name: 'contentDraftManage',
    component: () => import('@/views/public/jewelryRing/draftManage'),
    meta: {
      title: '草稿箱列表'
    }
  }, {
    path: 'auditManage',
    name: 'auditManage',
    component: () => import('@/views/public/jewelryRing/auditManage'),
    meta: {
      title: '审核管理'
    }
  }, {
    path: 'topicManage',
    name: 'topicManage',
    component: () => import('@/views/public/jewelryRing/topicManage'),
    meta: {
      title: '话题管理'
    }
  }, {
    path: 'topicManageModify',
    name: 'topicManageModify',
    component: () => import('@/views/public/jewelryRing/topicManage/modify'),
    meta: {
      title: '话题添加/修改'
    }
  }, {
    path: 'topicJoin',
    name: 'topicJoin',
    component: () => import('@/views/public/jewelryRing/topicManage/topicJoin'),
    meta: {
      title: '参与人数'
    }
  }, {
    path: 'reportComplaints',
    name: 'reportComplaints',
    component: () => import('@/views/public/jewelryRing/reportComplaints'),
    meta: {
      title: '举报管理'
    }
  }, {
    path: 'reportDetail',
    name: 'reportDetail',
    component: () => import('@/views/public/jewelryRing/reportComplaints/reportDetail'),
    meta: {
      title: '举报详情'
    }
  }, {
    path: 'reportType',
    name: 'reportType',
    component: () => import('@/views/public/jewelryRing/reportType'),
    meta: {
      title: '举报类型'
    }
  }
  ]
}
]
