import request from '@/utils/request'

// 消息列表
export function page(params) {
  return request({
    url: '/admin/portal/message/page',
    method: 'get',
    params
  })
}

export function getObj(id) {
  return request({
    url: '/admin/portal/message/detailMes/' + id,
    method: 'post'
  })
}

// 发布消息
export function putObj(data) {
  return request({
    url: '/admin/portal/message/add',
    method: 'post',
    data
  })
}

// 编辑消息
export function editObj(data) {
  return request({
    url: '/admin/portal/message/updateMes',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: `/admin/portal/message/delete/${id}`,
    method: 'post'
  })
}

