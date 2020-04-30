import request from '@/utils/request'

// 反馈列表
export function getPage(data, params) {
  return request({
    url: '/admin/portal/message/pagefeedBack',
    method: 'get',
    data,
    params
  })
}
// 反馈详情
export function getObj(id) {
  return request({
    url: `/admin/portal/message/detailFeedBack/${id}`,
    method: 'post'
  })
}
