import request from '@/utils/request'

export function allPage(params){
	return request({
		url: '/admin/gallery/activity/getNumCount',
		method: 'get',
		params
	})
}
export function page(params) { // 图文馆活动列表
	return request({
		url: '/admin/gallery/activity/adminPage',
		method: 'get',
		params
	})
}

export function saveGalleryActivity(data) { // 新增活动
	return request({
		url: '/admin/gallery/activity/saveGalleryActivity',
		method: 'post',
		data
	})
}

export function updateStickstate(params) { // 置顶活动
	return request({
		url: `/admin/gallery/activity/updateStickstate`,
		method: 'post',
		params
	})
}

export function delActivityById(id) { // 删除活动
	return request({
		url: '/admin/gallery/activity/delActivityById/'+id,
		method: 'post'
	})
}

export function activityPutWayState(params) { // 上架或下架活动
	return request({
		url: '/admin/gallery/activity/activityPutWayState',
		method: 'post',
		params
	})
}
export function getGalleryActivityById(id){
	return request({
		url: '/admin/gallery/activity/getGalleryActivityById/'+id,
		method: 'get'
	})
}
export function updateGalleryActivityById(data) { // 活动编辑
	return request({
		url: '/admin/gallery/activity/updateGalleryActivityById',
		method: 'post',
		data
	})
}