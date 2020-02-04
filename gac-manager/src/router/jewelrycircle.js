/* Layout */
import Layout from '@/views/layout/Layout'
import container from '@/views/layout/container'

// 珠宝圈自媒体管理路由
export default [{
  path: '/jewelryCircle',
  component: Layout,
  authority: 'jewelryCircle',
  alwaysShow: true,
  children: [{
    path: 'jccontentManage',
    name: 'jccontentManager',
    component: container,
    redirect: '/jewelryCircle/jccontentManage/index',
    meta: {
      title: '内容管理'
    },
    children: [{
      path: 'index',
      name: 'jccontentManage',
      component: () => import('@/views/jewelryCircle/contentManage/index'),
      meta: {
        title: '内容列表'
      }
    }, {
      path: 'jccontentManageDetail',
      name: 'jccontentManageDetail',
      // authority: 'callBackList',
      component: () => import('@/views/jewelryCircle/contentManage/detail'),
      meta: {
        title: '内容详情'
      }
    },
    {
      path: 'jccontentManageModify',
      name: 'jccontentManageModify',
      // authority: 'callBackList',
      component: () => import('@/views/jewelryCircle/contentManage/modify'),
      meta: {
        title: '内容添加/修改'
      }
    },
    {
      path: 'jcassociatedGoods',
      name: 'jcassociatedGoods',
      // authority: 'announcement',
      component: () => import('@/views/jewelryCircle/contentManage/associatedGoods'),
      meta: {
        title: '绑定商品'
      }
    },
    {
      path: 'jccommentsGoods',
      name: 'jccommentsGoods',
      // authority: 'announcement',
      component: () => import('@/views/jewelryCircle/contentManage/comments'),
      meta: {
        title: '全部评论'
      }
    }
    ]
  }, {
    path: 'jccontentDraftManage',
    name: 'jccontentDraftManage',
    component: () => import('@/views/jewelryCircle/draftManage/index'),
    meta: {
      title: '草稿箱列表'
    }
  }, {
    path: 'jcweMediaFans',
    name: 'jcweMediaFans',
    component: () => import('@/views/jewelryCircle/weMediaFans'),
    meta: {
      title: '粉丝管理'
    }
  }, {
    path: 'jcupdatePwd',
    name: 'jcupdatePwd',
    component: () => import('@/views/jewelryCircle/updatePwd'),
    meta: {
      title: '修改密码'
    }
  }]
}]
