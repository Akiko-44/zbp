import request from '@/utils/request'

export function getAllGroupTypes() {
  return request({
    url: '/admin/perm/groupType/all',
    method: 'get'
  })
}

export function fetchTree(query) {
  return request({
    url: '/admin/perm/group/tree',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/perm/group/saveOrUpdate',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/perm/group/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: `/admin/perm/group/delete/${id}`,
    method: 'post'
  })
}

export function putObj(id, obj) {
  return request({
    url: '/admin/perm/group/saveOrUpdate',
    method: 'post',
    data: obj
  })
}

export function getUsers(id) {
  return request({
    url: '/admin/perm/group/' + id + '/user',
    method: 'get'
  })
}

export function modifyUsers(id, data) {
  return request({
    url: '/admin/perm/group/' + id + '/user',
    method: 'put',
    params: data
  })
}

export function removeElementAuthority(id, data) {
  return request({
    url: '/admin/perm/group/' + id + '/authority/element/remove',
    method: 'post',
    params: data
  })
}

export function addElementAuthority(id, data) {
  return request({
    url: '/admin/perm/group/' + id + '/authority/element/add',
    method: 'post',
    params: data
  })
}

export function getElementAuthority(id) {
  return request({
    url: '/admin/perm/group/' + id + '/authority/element',
    method: 'get'
  })
}

export function modifyMenuAuthority(id, data) {
  return request({
    url: '/admin/perm/group/' + id + '/authority/menu',
    method: 'post',
    params: data
  })
}

export function getMenuAuthority(id) {
  return request({
    url: '/admin/perm/group/' + id + '/authority/menu',
    method: 'get'
  })
}
