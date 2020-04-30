import request from '@/utils/request'

export function page() {
  return request({
    url: '/admin/goodsBrand/page/2',
    method: 'get'
  })
}

