import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/report/adminReport',
    method: 'get',
    params
  })
}

export function audit(params) {
  return request({
    url: `/admin/report/audit/${params.id}/${params.state}`,
    method: 'get'
  })
}
