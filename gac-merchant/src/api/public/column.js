import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/portal/help/page/category',
    method: 'get',
    params
  })
}

export function addObj(data) {
  return request({
    url: '/admin/portal/help/saveOrUpdate/category',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: '/admin/portal/help/delete/category/' + id,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/portal/help/saveOrUpdate/category',
    method: 'post',
    data
  })
}
