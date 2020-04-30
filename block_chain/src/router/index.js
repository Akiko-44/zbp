import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import container from '@/layout/container'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/forgetPassword',
  component: () => import('@/views/login/forgetPassword'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () => import('@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: {
      title: '首页',
      icon: 'dashboard',
      affix: true
    }
  }]
}
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [{
  path: '/account',
  component: Layout,
  redirect: '/account/page',
  name: 'account',
  meta: {
    title: '权限管理',
    icon: 'user'
  },
  children: [{
    path: 'page',
    component: () => import('@/views/authority/account'),
    name: 'PageAccount',
    meta: {
      title: '用户管理'
    }
  },
  {
    path: 'addAccount',
    component: () => import('@/views/authority/account/add'),
    name: 'addAccount',
    meta: {
      title: '账户添加'
    },
    hidden: true
  },
  {
    path: 'accountDetail',
    component: () => import('@/views/authority/account/detail'),
    name: 'accountDetail',
    meta: {
      title: '查看用户'
    },
    hidden: true
  }, {
    path: 'menu',
    component: () => import('@/views/authority/menu'),
    name: 'menu',
    meta: {
      title: '菜单管理'
    }
  }, {
    path: 'roleManage',
    component: () => import('@/views/authority/role'),
    name: 'roleManage',
    meta: {
      title: '角色管理'
    }
  }, {
    path: 'addMenu',
    component: () => import('@/views/authority/menu/add'),
    name: 'addMenu',
    meta: {
      title: '添加/修改菜单'
    },
    hidden: true
  }
  ]
},
{
  path: '/publicChain',
  component: Layout,
  redirect: '/publicChain/system/globalParams',
  name: 'publicChain',
  meta: {
    title: '公链管理',
    icon: 'user'
  },
  children: [{
    path: 'system',
    component: container,
    redirect: '/system/globalParams',
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'example'
    },
    children: [{
      path: 'globalParams',
      component: () => import('@/views/system/globalParams'),
      name: 'globalParams',
      meta: {
        title: '全局参数配置'
      }
    },
    {
      path: 'businessPlatform',
      component: () => import('@/views/system/businessPlatform'),
      name: 'businessPlatform',
      meta: {
        title: '上链平台管理'
      }
    },
    {
      path: 'extracteData',
      component: () => import('@/views/system/extracteData'),
      name: 'extracteData',
      meta: {
        title: '补数'
      },
      hidden: true
    },
    {
      path: 'modifyBusiness',
      component: () => import('@/views/system/modifyBusiness'),
      name: 'modifyBusiness',
      meta: {
        title: '上链平台编辑'
      },
      hidden: true
    },
    {
      path: 'blockChainPlatform',
      component: () => import('@/views/system/blockChainPlatform'),
      name: 'blockChainPlatform',
      meta: {
        title: '区块链平台管理'
      }
    },
    {
      path: 'modifyBlockChain',
      component: () => import('@/views/system/modifyBlockChain'),
      name: 'modifyBlockChain',
      meta: {
        title: '区块链平台编辑'
      },
      hidden: true
    },
    {
      path: 'ETHPlatform',
      component: () => import('@/views/system/ETHPlatform'),
      name: 'ETHPlatform',
      meta: {
        title: '以太坊参数配置'
      },
      hidden: true
    }
    ]
  },

  {
    path: 'dispatch',
    component: container,
    redirect: '/dispatch/page',
    name: 'dispatch',
    meta: {
      title: '调度管理',
      icon: 'guide'
    },
    children: [{
      path: 'page',
      component: () => import('@/views/dispatch'),
      name: 'dispatchPage',
      meta: {
        title: '调度管理'
      }
    },
    {
      path: 'modifyDispatch',
      component: () => import('@/views/dispatch/modify'),
      name: 'modifyDispatch',
      meta: {
        title: '调度编辑'
      },
      hidden: true
    }
    ]
  },

  {
    path: 'upperChain',
    component: container,
    redirect: '/upperChain/page',
    name: 'upperChain',
    meta: {
      title: '上链管理',
      icon: 'link'
    },
    children: [{
      path: 'page',
      component: () => import('@/views/upperChain'),
      name: 'upperChainPage',
      meta: {
        title: '上链审核'
      }
    },
    {
      path: 'manual',
      component: () => import('@/views/upperChain/manual'),
      name: 'manualUpperChain',
      meta: {
        title: '手工重试上链'
      }
    },
    {
      path: 'task',
      component: () => import('@/views/task'),
      name: 'taskPage',
      meta: {
        title: '上链详情'
      }
    },
    {
      path: 'detail',
      component: () => import('@/views/task/detail'),
      name: 'taskDetail',
      meta: {
        title: '任务详情'
      },
      hidden: true
    },
    {
      path: 'statistics',
      component: () => import('@/views/task/statistics'),
      name: 'taskStatistics',
      meta: {
        title: '上链结果统计'
      }
    }
    ]
  },
  {
    path: 'accountBook',
    component: container,
    redirect: '/accountBook/detail',
    name: 'accountBook',
    meta: {
      title: '账本管理',
      icon: 'documentation'
    },
    children: [{
      path: 'detail',
      component: () => import('@/views/accountBook/detail'),
      name: 'accountBookDetail',
      meta: {
        title: '账本明细'
      }
    },
    {
      path: 'statistics',
      component: () => import('@/views/accountBook/statistics'),
      name: 'accountBookStatistics',
      meta: {
        title: '账本统计'
      }
    }
    ]
  }
  ]
},
{
  path: '/privateChain',
  component: Layout,
  redirect: '/privateChain/group',
  name: 'privateChain',
  meta: {
    title: '私链管理',
    icon: 'documentation'
  },
  children: [{
    path: 'blockChain',
    component: container,
    redirect: '/privateChain/blockChain/group',
    name: 'blockChain',
    meta: {
      title: '区块链管理'
    },
    children: [{
      path: 'group',
      component: () => import('@/views/privateChain/group'),
      name: 'group',
      meta: {
        title: 'Group管理'
      }
    },
    {
      path: 'groupModify',
      component: () => import('@/views/privateChain/group/modify'),
      name: 'groupModify',
      meta: {
        title: 'Group编辑'
      },
      hidden: true
    },
    {
      path: 'backChain',
      component: () => import('@/views/privateChain/backChain'),
      name: 'backChain',
      meta: {
        title: '重上链查询'
      }
    },
    {
      path: 'backChainDataDetail',
      component: () => import('@/views/privateChain/backChain/detail'),
      name: 'backChainDataDetail',
      meta: {
        title: '数据详情'
      }
    }
    ]
  },
  {
    path: 'accountBook',
    component: container,
    redirect: '/privateChain/accountBook/detail',
    name: 'privateAccountBook',
    meta: {
      title: '账本管理',
      icon: 'documentation'
    },
    children: [{
      path: 'detail',
      component: () => import('@/views/privateChain/accountBook/detail'),
      name: 'privateAccountBookDetail',
      meta: {
        title: '账本明细'
      }
    },
    {
      path: 'statistics',
      component: () => import('@/views/privateChain/accountBook/statistics'),
      name: 'privateAccountBookStatistics',
      meta: {
        title: '账本统计'
      }
    }
    ]
  }, {
    path: 'blockChainInteraction',
    component: container,
    redirect: '/privateChain/blockChainInteraction/contractManagement',
    name: 'blockChainInteraction',
    meta: {
      title: '区块链交互',
      icon: 'documentation'
    },
    children: [{
      path: 'contractManagement',
      component: () => import('@/views/privateChain/blockChainInteraction/contractManagement'),
      name: 'privateContractManagement',
      meta: {
        title: '合约管理'
      }
    }, {
      path: 'addContract',
      component: () => import('@/views/privateChain/blockChainInteraction/addContract'),
      name: 'privateAddContract',
      meta: {
        title: '添加合约'
      },
      hidden: true
    }, {
      path: 'contractDeployment',
      component: () => import('@/views/privateChain/blockChainInteraction/contractDeployment'),
      name: 'privateContractDeployment',
      meta: {
        title: '合约部署'
      },
      hidden: true
    },
    {
      path: 'contractExampleList',
      component: () => import('@/views/privateChain/blockChainInteraction/contractExampleList'),
      name: 'privateContractExampleList',
      meta: {
        title: '合约实例列表'
      },
      hidden: true
    }, {
      path: 'contractExampleCall',
      component: () => import('@/views/privateChain/blockChainInteraction/contractExampleCall'),
      name: 'privateContractExampleCall',
      meta: {
        title: '合约实例调用'
      },
      hidden: true
    }, {
      path: 'transferTransaction',
      component: () => import('@/views/privateChain/blockChainInteraction/transferTransaction'),
      name: 'privateTransferTransaction',
      meta: {
        title: '转账交易'
      }
    }
    ]
  },
  {
    path: 'blockChainBrowser',
    component: container,
    redirect: '/privateChain/blockChainBrowser/transactionHash',
    name: 'blockChainBrowser',
    meta: {
      title: '区块链浏览器'
    },
    children: [{
      path: 'transactionHash',
      component: () => import('@/views/privateChain/browser/transactionHash'),
      name: 'transactionHash',
      meta: {
        title: '交易Hash查询'
      }
    },
    {
      path: 'blockHeight',
      component: () => import('@/views/privateChain/browser/blockHeight'),
      name: 'blockHeight',
      meta: {
        title: '区块高度查询'
      }
    },
    {
      path: 'walletAddress',
      component: () => import('@/views/privateChain/browser/walletAddress'),
      name: 'walletAddress',
      meta: {
        title: '钱包地址查询'
      }
    },
    {
      path: 'contractAddress',
      component: () => import('@/views/privateChain/browser/contractAddress'),
      name: 'contractAddress',
      meta: {
        title: '合约地址查询'
      }
    },
    {
      path: 'chainData',
      component: () => import('@/views/privateChain/browser/chainData'),
      name: 'chainData',
      meta: {
        title: '上链数据查询'
      }
    },
    {
      path: 'chainDataDetail',
      component: () => import('@/views/privateChain/browser/detail'),
      name: 'chainDataDetail',
      meta: {
        title: '数据详情'
      }
    }
    ]
  },
  {
    path: 'blockChainEvent',
    component: container,
    redirect: '/privateChain/blockChainEvent/latestChain',
    name: 'blockChainEvent',
    meta: {
      title: '区块链事件'
    },
    children: [{
      path: 'latestChain',
      component: () => import('@/views/privateChain/event/latestChain'),
      name: 'latestChain',
      meta: {
        title: '最新上链数据'
      }
    },
    {
      path: 'latestDeal',
      component: () => import('@/views/privateChain/event/latestDeal'),
      name: 'latestDeal',
      meta: {
        title: '最新交易'
      }
    },
    {
      path: 'lastestBlock',
      component: () => import('@/views/privateChain/event/lastestBlock'),
      name: 'lastestBlock',
      meta: {
        title: '最新区块'
      }
    },
    {
      path: 'lastestChainDataDetail',
      component: () => import('@/views/privateChain/event/detail'),
      name: 'lastestChainDataDetail',
      meta: {
        title: '数据详情'
      }
    }
    ]
  }
  ]
},

// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
