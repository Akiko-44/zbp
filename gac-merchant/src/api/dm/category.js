import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/admin/designmanu/category/list',
    method: 'post',
    data
  })
}

export function addObj(data) {
  return request({
    url: '/admin/designmanu/category/saveOrUpdate',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: `/admin/designmanu/category/delete/${id}`,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/designmanu/category/saveOrUpdate',
    method: 'post',
    data
  })
}
