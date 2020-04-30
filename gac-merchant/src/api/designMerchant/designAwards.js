import request from '@/utils/request'

export function awardsList(params) {
  return request({
    url: '/admin/designmanu/awards/awardsInfoList',
    method: 'get',
    params
  })
}

export function getAwards(awardsId) {
  return request({
    url: `/admin/designmanu/awards/awardsInfo/${awardsId}`,
    method: 'get'
  })
}

export function saveOrUpdateAwards(data) {
  return request({
    url: '/admin/designmanu/awards/saveOrUpdate',
    method: 'post',
    data
  })
}

export function delAwards(awardsId) {
  return request({
    url: `/admin/designmanu/awards/delete/${awardsId}`,
    method: 'post'
  })
}
