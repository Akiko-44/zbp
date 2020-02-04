import request from '@/utils/request'

export function page(data, params) {
  return request({
    url: '/admin/designmanu/merchant/craft/page',
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

export function putObj(data) {
  return request({
    url: `/admin/designmanu/merchant/craft/saveOrUpdate`,
    method: 'post',
    data
  })
}

export function getBrandList(data) {
  return request({
    url: `/admin/goodsBrand/page`,
    method: 'get',
    data
  })
}