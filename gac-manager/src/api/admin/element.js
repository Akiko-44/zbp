import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/admin/perm/element/list',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/perm/element',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/perm/element/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/perm/element/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return request({
    url: '/admin/perm/element/' + id,
    method: 'put',
    data: obj
  })
}
