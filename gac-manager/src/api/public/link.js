import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/portal/friendship/link/list',
    method: 'get',
    params
  })
}

export function putObj(data) {
  return request({
    url: '/admin/portal/friendship/link/save',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: `/admin/portal/friendship/link/delete/${id}`,
    method: 'post'
  })
}
