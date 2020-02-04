import request from '@/utils/request'

export function page(params, orderType) {
  return request({
    url: '/admin/order/comment/list/' + orderType,
    method: 'get',
    params
  })
}

/* 评论新列表 */
export function pageList(params) {
  return request({
    url: '/api/userCenter/userComment/pageList',
    method: 'get',
    params
  })
}

/* 评论新详情 */
export function getObjDetail(id) {
  return request({
    url: '/api/userCenter/userComment/detail/' + id,
    method: 'get'
  })
}

export function getObj(id) {
  return request({
    url: '/admin/order/comment/detial/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/order/comment/delete/' + id,
    method: 'post'
  })
}

export function getRegular() {
  return request({
    url: '/admin/industry/comment/regular/detail',
    method: 'get'
  })
}

export function setRegular(data) {
  return request({
    url: '/admin/industry/comment/regular/save',
    method: 'post',
    data
  })
}

export function addReply(data) {
  return request({
    url: '/api/userCenter/userComment/jwAddReply',
    method: 'post',
    data
  })
}

