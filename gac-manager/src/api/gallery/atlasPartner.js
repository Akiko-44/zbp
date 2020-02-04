import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/platform/gallery/atlas/page',
    method: 'get',
    params
  })
}
export function pageCount(params) {
	return request({
		url: '/admin/platform/gallery/atlas/count',
		method: 'get',
		params
	})
}
export function getObj(id) {
  return request({
    url: `/admin/platform/gallery/atlas/detail/${id}`,
    method: 'get'
  })
}

export function addObj(data) {
  return request({
    url: '/admin/platform/gallery/atlas/saveOrUpdate',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: `/admin/platform/gallery/atlas/delete/${id}`,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/platform/gallery/atlas/saveOrUpdate',
    method: 'post',
    data
  })
}
