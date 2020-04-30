import request from '@/utils/request'

export function page() {
  return request({
    url: '',
    method: 'get'
  })
}

export function addObj(data) {
  return request({
    url: '',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: ``,
    method: 'post'
  })
}

export function getCategoryShow() {
  return request({
    url: '/admin/homePage/categoryShow',
    method: 'get'
  })
}
