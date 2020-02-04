/* Layout */
import Layout from '@/views/layout/Layout'

// 权限管理系统路由
export default [
  {
    path: '/baseManager',
    component: Layout,
    authority: 'baseManager',
    alwaysShow: true,
    children: [
      {
        path: 'userManager',
        name: 'userManager',
        component: () => import('@/views/admin/user'),
        authority: 'userManager',
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'menuManager',
        name: 'menuManager',
        authority: 'menuManager',
        component: () => import('@/views/admin/menu'),
        meta: {
          title: '菜单管理'
        }
      },
      {
        path: 'groupManager',
        name: 'groupManager',
        authority: 'groupManager',
        component: () => import('@/views/admin/group'),
        meta: {
          title: '角色权限管理'
        }
      },
      {
        path: 'groupTypeManager',
        name: 'groupTypeManager',
        authority: 'groupTypeManager',
        component: () => import('@/views/admin/groupType'),
        meta: {
          title: '角色类型管理'
        }
      }
    ]
  }
]
