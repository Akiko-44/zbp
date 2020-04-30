import request from '@/utils/request'

export function getAllMenu(params) {
  return request({
    url: '/admin/menu/getAllMenu',
    method: 'get',
    params
  })
}

export function getMenu(id) {
  return request({
    url: `/admin/menu/get?id=${id}`,
    method: 'get'
  })
}

export function saveOrUpdateMenu(data) {
  return request({
    url: '/admin/menu/saveOrUpdate',
    method: 'post',
    data
  })
}

export function deleteMenu(id) {
  return request({
    url: `/admin/menu/delete?id=${id}`,
    method: 'post'
  })
}

export function getUserMenu() {
  return request({
    url: '/admin/menu/getUserMenu',
    method: 'get'
  })
}
