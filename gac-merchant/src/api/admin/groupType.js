import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/admin/perm/groupType/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/perm/groupType/save',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/perm/groupType/detail/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/perm/groupType/delete/' + id,
    method: 'post'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/perm/groupType/save',
    method: 'post',
    data: obj
  })
}
