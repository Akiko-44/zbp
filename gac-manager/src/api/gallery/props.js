import request from '@/utils/request'

export function page() {
  return request({
    url: '/admin/gallery/subject/prop/list',
    method: 'get'
  })
}

export function addObj(data) {
  return request({
    url: '/admin/gallery/subject/prop/saveOrUpdate',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: `/admin/gallery/subject/delete/prop/${id}`,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/gallery/subject/prop/saveOrUpdate',
    method: 'post',
    data
  })
}
