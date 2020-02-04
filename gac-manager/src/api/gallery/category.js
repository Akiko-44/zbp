import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/gallery/category/list',
    method: 'get',
    params
  })
}

export function addObj(data) {
  return request({
    url: '/admin/gallery/category/saveOrUpdate',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: `/admin/gallery/category/delete/${id}`,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/gallery/category/saveOrUpdate',
    method: 'post',
    data
  })
}
