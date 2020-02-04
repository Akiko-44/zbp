import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/report/merReport',
    method: 'get',
    params
  })
}
