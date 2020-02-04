import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/industry/article/list',
    method: 'get',
    params
  })
}

export function getObj(id) {
  return request({
    url: '/admin/industry/article/detail/' + id,
    method: 'get'
  })
}

export function addObj(data) {
  return request({
    url: '/admin/industry/article/save',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: '/admin/industry/article/delete/' + id,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/industry/article/save',
    method: 'post',
    data
  })
}

export function getProps() {
  return request({
    url: '/admin/industry/article/prop/list',
    method: 'get'
  })
}

export function audit(id, auditState) {
  return request({
    url: `/admin/industry/article/audit/${id}/${auditState}`,
    method: 'post'
  })
}

export function refuse(params){  // 拒绝理由
	return request({
		url: '/admin/industry/article/audit/refuse',
		method: 'post',
		params
	})
}
