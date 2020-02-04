import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/industry/article/comment/list',
    method: 'get',
    params
  })
}

export function getObj(id) {
  return request({
    url: '/admin/industry/article/comment/detail/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/industry/article/comment/delete/' + id,
    method: 'post'
  })
}

export function getRegular() {
  return request({
    url: '/admin/industry/comment/regular/detail',
    method: 'get'
  })
}

export function setRegular(data) {
  return request({
    url: '/admin/industry/comment/regular/save',
    method: 'post',
    data
  })
}

export function refuse(data){
	return request({
		url: `/admin/industry/article/comment/revertById/${data[0]}?commentRevert=${data[1]}`,
		method:'post'
	})
}
