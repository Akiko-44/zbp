/* Layout */
import Layout from '@/views/layout/Layout'

// 上下游/展会/直播管理 后台路由
export default [
  {
    path: '/up',
    name: 'up',
    authority: 'up',
    component: Layout,
    meta: {
      title: '上下游'
    },
    children: [
      {
        path: 'list',
        name: 'upServiceList',
        authority: 'list',
        component: () => import('@/views/aggregate/up/service/list'),
        meta: {
          title: '服务商申请列表'
        }
      },
      {
        path: 'categoryDetail',
        name: 'upCategoryDetail',
        component: () => import('@/views/aggregate/up/category/detail'),
        meta: {
          title: '服务详情'
        }
      },
      {
        path: 'service',
        name: 'upCategoryList',
        authority: 'service',
        component: () => import('@/views/aggregate/up/category/list'),
        meta: {
          title: '服务管理'
        }
      }
    ]
  },
  {
    path: '/live',
    name: 'live',
    authority: 'live',
    component: Layout,
    meta: {
      title: '直播管理'
    },
    children: [
      {
        path: 'settings',
        name: 'settings',
        authority: 'settings',
        component: () => import('@/views/aggregate/live/category'),
        meta: {
          title: '直播频道设置'
        }
      },
      {
        path: 'list',
        name: 'liveList',
        authority: 'list',
        component: () => import('@/views/aggregate/live/list'),
        meta: {
          title: '申请列表'
        }
      }
    ]
  },
  {
    path: '/exhibition',
    name: 'exhibition',
    authority: 'exhibition',
    component: Layout,
    meta: {
      title: '展会管理'
    },
    redirect: '/exhibition/list',
    children: [
      {
        path: 'list',
        name: 'exhibitionList',
        authority: 'list',
        component: () => import('@/views/aggregate/exhibition/list'),
        meta: {
          title: '展会列表'
        }
      },
      {
        path: 'detail',
        name: 'exhibitionDetail',
        component: () => import('@/views/aggregate/exhibition/detail'),
        meta: {
          title: '展会详情'
        }
      },
      {
        path: 'add',
        name: 'addExhibition',
        component: () => import('@/views/aggregate/exhibition/add'),
        meta: {
          title: '添加/修改展会'
        }
      },
      {
        path: 'newAdd',
        name: 'addExhibitionS',
        component: () => import('@/views/aggregate/exhibition/newAdd'),
        meta: {
          title: '添加/修改展会'
        }
      },
      {
        path: 'banner',
        name: 'banner',
        authority: 'banner',
        component: () => import('@/views/aggregate/exhibition/banner'),
        meta: {
          title: '广告轮播图设置'
        }
      },
      {
      	path: 'hone',
      	name: 'hone',
      	authority: 'hone',
      	component: () => import('@/views/aggregate/exhibition/home'),
      	meta: {
      		title: '首页设置'
      	}
      },
      {
      	path: 'listActivites',
      	name: 'listActivites',
      	authority: 'listActivites',
      	component: ()=>import('@/views/aggregate/exhibition/listActivites'),
      	meta: {
      		title: '活动管理'
      	}
      },
      {
      	path: 'listActivites_add',
      	name: 'listActivites_add',
      	component: ()=>import('@/views/aggregate/exhibition/listActivites_add'),
      	meta: {
      		title: '新增活动管理'
      	}
      },
      {
      	path: 'listActivites_newAdd',
      	name: 'listActivites_newAdd',
      	component: ()=>import('@/views/aggregate/exhibition/listActivites_newAdd'),
      	meta: {
      		title: '编辑活动管理'
      	}
      },
      {
      	path: 'classify',
      	name: 'classify',
      	authority: 'classify',
      	component: ()=>import('@/views/aggregate/exhibition/classify'),
      	meta: {
      		title: '分类管理'
      	}
      },
      {
      	path: 'vrlook',
      	name: 'vrlook',
      	authority: 'vrlook',
      	component: ()=>import('@/views/aggregate/exhibition/vrlook'),
      	meta: {
      		title: 'VR管理'
      	}
      },
      {
      	path: 'vrtranscript',
      	name: 'vrtranscript',
      	component: ()=>import('@/views/aggregate/exhibition/vrtranscript'),
      	meta: {
      		title: '添加/编辑'
      	}
      },
      {
      	path: 'vrnewtranscript',
      	name: 'vrnewtranscript',
      	component: ()=>import('@/views/aggregate/exhibition/vrnewtranscript'),
      	meta: {
      		title: '添加/编辑'
      	}
      },
      {
      	path: 'brand',
      	name: 'brand',
      	authority: 'brand',
      	component: ()=>import('@/views/aggregate/exhibition/brand'),
      	meta: {
      		title: '品牌管理'
      	}
      },
      {
      	path: 'brandAdd',
      	name: 'brandAdd',
      	authority: 'brand',
      	component: ()=>import('@/views/aggregate/exhibition/brandAdd'),
      	meta: {
      		title: '品牌管理添加/修改'
      	}
      },
      // 以下为合作伙伴相关页面
      {
        path: 'exhibitionPartnerList',
        name: 'exhibitionPartnerList',
        authority: 'exhibitionPartnerList',
        component: () => import('@/views/aggregate/exhibitionPartner/list'),
        meta: {
          title: '展会列表'
        }
      },
      {
        path: 'exhibitionPartnerDetail',
        name: 'exhibitionPartnerDetail',
        component: () => import('@/views/aggregate/exhibitionPartner/detail'),
        meta: {
          title: '展会详情'
        }
      },
      {
        path: 'addExhibitionPartner',
        name: 'addExhibitionPartner',
        component: () => import('@/views/aggregate/exhibitionPartner/add'),
        meta: {
          title: '添加/修改展会'
        }
      },
      {
        path: 'newaddExhibitionPartner',
        name: 'newaddExhibitionPartner',
        component: () => import('@/views/aggregate/exhibitionPartner/newAdd'),
        meta: {
          title: '添加/修改展会'
        }
      },
       {
      	path: 'listActivitesPartnerList',
      	name: 'listActivitesPartnerList',
      	authority: 'listActivitesPartnerList',
      	component: ()=>import('@/views/aggregate/exhibitionPartner/listActivites'),
      	meta: {
      		title: '活动管理'
      	}
      },
      {
      	path: 'listActivites_addPartnerList',
      	name: 'listActivites_addPartnerList',
      	component: ()=>import('@/views/aggregate/exhibitionPartner/listActivites_add'),
      	meta: {
      		title: '新增活动管理'
      	}
      },
      {
      	path: 'listActivites_newAddPartnerList',
      	name: 'listActivites_newAddPartnerList',
      	component: ()=>import('@/views/aggregate/exhibitionPartner/listActivites_newAdd'),
      	meta: {
      		title: '编辑活动管理'
      	}
      },
      {
      	path: 'vrlookPartnerList',
      	name: 'vrlookPartnerList',
      	authority: 'vrlookPartnerList',
      	component: ()=>import('@/views/aggregate/exhibitionPartner/vrlook'),
      	meta: {
      		title: 'VR管理'
      	}
      },
      {
      	path: 'vrtranscriptPartnerList',
      	name: 'vrtranscriptPartnerList',
      	component: ()=>import('@/views/aggregate/exhibitionPartner/vrtranscript'),
      	meta: {
      		title: '添加/编辑'
      	}
      },
      {
      	path: 'vrnewtranscriptPartnerList',
      	name: 'vrnewtranscriptPartnerList',
      	component: ()=>import('@/views/aggregate/exhibitionPartner/vrnewtranscript'),
      	meta: {
      		title: '添加/编辑'
      	}
      },
//    {
//      path: 'addExhibitionPartnerS',
//      name: 'addExhibitionPartnerS',
//      component: () => import('@/views/aggregate/exhibitionPartner/newAdd'),
//      meta: {
//        title: '添加/修改展会'
//      }
//    }
    ]
  }
]

