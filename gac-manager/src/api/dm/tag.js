import request from '@/utils/request'

export function page(data, params) {
  return request({
    url: '/admin/designmanu/tag/list',
    method: 'post',
    data,
    params
  })
}

export function addObj(data) {
  return request({
    url: '/admin/designmanu/tag/saveOrUpdate',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: `/admin/designmanu/tag/delete/${id}`,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/designmanu/tag/saveOrUpdate',
    method: 'post',
    data
  })
}

export function disableTag(id, flag) {
  return request({
    url: `/admin/designmanu/tag/ableTag/${id}/${flag}`,
    method: 'post'
  })
}
