import request from '@/utils/request'

export function page(data, params) {
  return request({
    url: '/admin/designmanu/craft/page',
    method: 'post',
    data,
    params
  })
}

export function delObj(id) {
  return request({
    url: `/admin/designmanu/craft/delete/${id}`,
    method: 'post'
  })
}

export function getObj(id) {
  return request({
    url: `/admin/designmanu/craft/info/${id}`,
    method: 'get'
  })
}

export function audit(data) {
  return request({
    url: '/admin/designmanu/craft/audit',
    method: 'post',
    data
  })
}
