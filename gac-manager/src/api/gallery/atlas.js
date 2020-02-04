import request from '@/utils/request'

export function page(params) {
	return request({
		url: '/admin/gallery/atlas/page',
		method: 'get',
		params
	})
}
export function pageCount(params) {
	return request({
		url: '/admin/gallery/atlas/count',
		method: 'get',
		params
	})
}

export function getObj(id) {
	return request({
		url: `/admin/gallery/atlas/detail/${id}`,
		method: 'get'
	})
}

export function addObj(data) {
	return request({
		url: '/admin/gallery/atlas/saveOrUpdate',
		method: 'post',
		data
	})
}

export function delObj(id) {
	return request({
		url: `/admin/gallery/atlas/delete/${id}`,
		method: 'post'
	})
}

export function putObj(data) { // 保存
	return request({
		url: '/admin/gallery/atlas/saveOrUpdate',
		method: 'post',
		data
	})
}

export function categpries() {
	return request({
		url: '/admin/gallery/atlas/categpries',
		method: 'post'
	})
}
export function getTree() {
	return request({
		url: '/admin/platform/gallery/atlas/galleryCateList',
		method: 'get'
	})
}