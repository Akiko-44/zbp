import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/report/adminReport',
    method: 'get',
    params
  })
}

export function newPage(params) {
  return request({
    url: '/admin/report/adminReportNew',
    method: 'get',
    params
  })
}

export function reportOrderDetail(id) {
  return request({
    url: `/admin/report/order/detail/${id}`,
    method: 'get'
  })
}

export function audit(params) {
  return request({
    url: `/admin/report/audit/${params.id}/${params.state}?auditLog=${params.auditLog}`,
    method: 'get'
  })
}
