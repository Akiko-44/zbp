import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/admin/mid/getMid',
    method: 'get',
    data
  })
}
