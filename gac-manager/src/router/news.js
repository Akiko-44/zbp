/* Layout */
import Layout from '@/views/layout/Layout'

// 行业之声路由
export default [{
	path: '/news',
	component: Layout,
	authority: 'news',
	alwaysShow: true,
	children: [{
			path: 'column',
			name: 'column',
			authority: 'column',
			component: () =>
				import('@/views/news/column'),
			meta: {
				title: '栏目管理'
			}
		},
		{
			path: 'article',
			name: 'article',
			component: () =>
				import('@/views/news/article/list'),
			authority: 'article',
			meta: {
				title: '内容管理'
			}
		},
		{
			path: 'article/add',
			name: 'addArticle',
			component: () =>
				import('@/views/news/article/add'),
			meta: {
				title: '添加/修改文章'
			}
		},
		{
			path: 'comment',
			name: 'comment',
			authority: 'comment',
			component: () =>
				import('@/views/news/comment'),
			meta: {
				title: '评论管理'
			}
		},
		{
			path: 'commentPartner',
			name: 'commentPartner',
			component: () =>
				import('@/views/news/commentPartner'),
			meta: {
				title: '评论管理'
			}
		},
		{
			path: 'ad',
			name: 'ad',
			authority: 'ad',
			component: () =>
				import('@/views/news/ad'),
			meta: {
				title: '广告管理'
			}
		},
		{
			path: 'link',
			name: 'friendLink',
			authority: 'link',
			component: () =>
				import('@/views/news/link'),
			meta: {
				title: '友情链接'
			}
		},
		// 活动外发
		{
			path: 'articlePartnerList',
			name: 'articlePartnerList',
			component: () =>
				import('@/views/news/articlePartner/list'),
			authority: 'articlePartnerList',
			meta: {
				title: '内容管理'
			}
		},
		{
			path: 'articlePartnerAdd',
			name: 'articlePartnerAdd',
			component: () =>
				import('@/views/news/articlePartner/add'),
			meta: {
				title: '添加/修改文章'
			}
		},
		{
			path: 'home',
			name: 'home',
			component: () =>
				import('@/views/news/home'),
			meta: {
				title: '首页管理'
			}
		},
		{
			path: 'actirity',
			name: 'actirity',
			component: () =>
				import('@/views/news/actirity'),
			meta: {
				title: '活动管理'
			},
			children: []
		},{
				path: 'actirityActivities',
				name: 'actirityActivities',
				component: () =>
					import('@/views/news/actirity/add'),
				meta: {
					title: '添加活动'
				}
			}, {
				path: 'actirityActive',
				name: 'actirityActive',
				component: () =>
					import('@/views/news/actirity/newAdd'),
				meta: {
					title: '编辑活动'
				}
			},
		{
			path: 'patent',
			name: 'patent',
			component: () =>
				import('@/views/news/patent'),
			meta: {
				title: '编辑活动'
			},
			children: []
		},{
				path: 'addPatent',
				name: 'addPatent',
				component: () =>
					import('@/views/news/patent/add'),
				meta: {
					title: '新增服务商'
				}
		},{
				path: 'newPatent',
				name: 'newPatent',
				component: () =>
					import('@/views/news/patent/newAdd'),
				meta: {
					title: '编辑服务商'
				}
		},
		// 公告管理
      {
        path: 'anniuncent',
        name: 'anniuncentList',
        component: () => import('@/views/news/anniuncent/list'),
        meta: {
          title: '公告管理'
        }
      },
      {
        path: 'anniuncentAdd',
        name: 'anniuncentAdd',
        component: () => import('@/views/news/anniuncent/add'),
        meta: {
          title: '添加/修改公告'
        }
      },
      // 数据管理
      {
        path: 'dataList',
        name: 'dataList',
        component: () => import('@/views/news/data/list'),
        meta: {
          title: '数据管理'
        }
      },
      {
        path: 'dataChart',
        name: 'dataChart',
        component: () => import('@/views/news/data/chart'),
        meta: {
          title: '趋势变化图'
        }
	}]
}]