import request from '@/utils/request'

export function fetchTree(query) {
  return request({
    url: '/admin/perm/menu/tree',
    method: 'get',
    params: query
  })
}

export function fetchAll() {
  return request({
    url: '/admin/perm/menu/all',
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/perm/menu/saveOrUpdate',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/perm/menu/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/perm/menu/delete/' + id,
    method: 'post'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/perm/menu/saveOrUpdate',
    method: 'post',
    data: obj
  })
}

export function getMenus() {
  return request({
    url: '/admin/perm/user/front/menus?query=up',
    method: 'get'
  })
}
