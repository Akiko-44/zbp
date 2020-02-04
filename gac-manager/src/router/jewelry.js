/* Layout */
import Layout from '@/views/layout/Layout'

// 珠宝店管理路由
export default [
  {
    path: '/baseSetting',
    name: 'baseSetting',
    component: Layout,
    authority: 'baseSetting',
    meta: {
      title: '基础设置'
    },
    children: [
      {
        path: 'setBrand',
        name: 'setBrand',
        component: () => import('@/views/jewelry/baseSetting/setBrand'),
        authority: 'setBrand',
        meta: {
          title: '设置品牌'
        }
      },
      {
        path: 'setClassify',
        name: 'setClassify',
        component: () => import('@/views/jewelry/baseSetting/setClassify'),
        authority: 'setClassify',
        meta: {
          title: '设置分类'
        }
      }
    ]
  }
]
