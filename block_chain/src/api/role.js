import request from '@/utils/request'

// 项目中使用的接口
// 获取所有角色
export function roleList() {
  return request({
    url: '/admin/role/get',
    method: 'get'
  })
}

// 关联菜单
export function bindMenu(data) {
  return request({
    url: '/admin/role/bindMenu',
    method: 'post',
    data
  })
}

// 关联菜单回显
export function getRoleMenu(params) {
  return request({
    url: '/admin/menu/getRoleMenu',
    method: 'get',
    params
  })
}

// 框架自带
export function getRoutes() {
  return request({
    url: '/admin/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/admin/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/admin/role/${id}`,
    method: 'delete'
  })
}
