/* Layout */
import Layout from '@/views/layout/Layout'

// 图文馆路由
export default [{
		path: '/subject',
		name: 'subject',
		authority: 'subject',
		component: Layout,
		meta: {
			title: '专题管理'
		},
		children: [{
				path: 'list',
				name: 'list',
				authority: 'list',
				component: () =>
					import('@/views/gallery/subject/list'),
				meta: {
					title: '精品专题'
				}
			},
			{
				path: 'add',
				name: 'addSubject',
				component: () =>
					import('@/views/gallery/subject/add'),
				meta: {
					title: '添加/修改专题'
				}
			},
			{
				path: 'props',
				name: 'props',
				authority: 'props',
				component: () =>
					import('@/views/gallery/props'),
				meta: {
					title: '属性管理'
				}
			}
		]
	},
	{
		path: '/gallerySettings',
		name: 'gallerySettings',
		authority: 'gallerySettings',
		component: Layout,
		meta: {
			title: '其他设置'
		},
		children: [{
				path: 'galleryHome',
				name: 'galleryHome',
				authority: 'galleryHome',
				component: () =>
					import('@/views/gallery/homeSettings'),
				meta: {
					title: '主页设置'
				},
				children: []
			},
			{
				path: 'galleryActivities',
				name: 'galleryActivities',
				authority: 'galleryActivities',
				component: () =>
					import('@/views/gallery/listActivities'),
				meta: {
					title: '活动列表'
				},
				children: []
			},
			{
				path: 'galleryActivities/Activities',
				name: 'Activities',
				component: () =>
					import('@/views/gallery/listActivities/add'),
				meta: {
					title: '添加活动'
				}
			},{
				path: 'galleryActivities/Active',
				name: 'Active',
				component: () =>
					import('@/views/gallery/listActivities/newAdd'),
				meta: {
					title: '编辑活动'
				}
			}
		]
	},
	{
		path: '/picture',
		name: 'picture',
		authority: 'picture',
		component: Layout,
		meta: {
			title: '图片管理'
		},
		children: [{
				path: 'atlas',
				name: 'atlas',
				authority: 'atlas',
				component: () =>
					import('@/views/gallery/atlas'),
				meta: {
					title: '图集管理'
				}
			},
			{
				path: 'atlas/add',
				name: 'addAtlas',
				component: () =>
					import('@/views/gallery/atlas/add'),
				meta: {
					title: '图集添加/修改'
				}
			},
			{
				path: 'category',
				name: 'category',
				authority: 'category',
				component: () =>
					import('@/views/gallery/category'),
				meta: {
					title: '图集分类'
				}
			},
			// 活动外发
			{
				path: 'atlasPartnerList',
				name: 'atlasPartnerList',
				authority: 'atlasPartnerList',
				component: () =>
					import('@/views/gallery/atlasPartner'),
				meta: {
					title: '图集管理'
				}
			},
			{
				path: 'atlasPartnerAdd',
				name: 'atlasPartnerAdd',
				component: () =>
					import('@/views/gallery/atlasPartner/add'),
				meta: {
					title: '图集添加/修改'
				}
			}
		]
	},
	{
		path: '/commentList',
		name: 'commentList',
		authority: 'commentList',
		component: Layout,
		meta: {
			title: '评论管理'
		},
		children: [{
			path: 'galleryComment',
			name: 'galleryComment',
			authority: 'galleryComment',
			component: () =>
				import('@/views/gallery/comment'),
			meta: {
				title: '评论管理'
			}
		}]
	},
	{
		path: '/galleryOrder',
		name: 'galleryOrder',
		authority: 'galleryOrder',
		component: Layout,
		meta: {
			title: '订单管理'
		},
		children: [{
				path: 'orderList',
				name: 'orderList',
				authority: 'orderList',
				component: () =>
					import('@/views/gallery/orderList'),
				meta: {
					title: '订单管理'
				}
			},
			{
				path: 'myOrderList',
				name: 'myOrderList',
				authority: 'myOrderList',
				component: () =>
					import('@/views/gallery/orderList/myOrder'),
				meta: {
					title: '我的订单'
				}
			}
		]
	},
	{
		path: '/galleryFund',
		name: 'galleryFund',
		authority: 'galleryFund',
		component: Layout,
		redirect: '/galleryFund/kitingRecords',
		meta: {
			title: '资金管理'
		},
		children: [{
				path: 'kitingRecords',
				name: 'kitingRecords',
				authority: 'kitingRecords',
				component: () =>
					import('@/views/gallery/fund/kitingRecords'),
				meta: {
					title: '提现记录'
				}
			},
			{
				path: 'cardList',
				name: 'cardList',
				authority: 'cardList',
				component: () =>
					import('@/views/gallery/fund/cardList'),
				meta: {
					title: '我的银行卡'
				}
			}
		]
	}
]