import request from '@/utils/request'

export function drawPage(params) {
  return request({
    url: '/admin/draw/page',
    method: 'get',
    params
  })
}

export function getObj(id) {
  return request({
    url: `/admin/draw/detail?id=${id}`,
    method: 'get'
  })
}

export function saveDraw(data) {
  return request({
    url: '/admin/draw/saveOrUpdate',
    method: 'post',
    data
  })
}

export function deleteDraw(data) {
  return request({
    url: '/admin/draw/delete',
    method: 'post',
    data
  })
}

export function setStatusDraw(data) {
  return request({
    url: '/admin/draw/setStatus',
    method: 'post',
    data
  })
}

export function prizePage(params) {
  return request({
    url: '/admin/draw/prize/page',
    method: 'get',
    params
  })
}

export function send(data) {
  return request({
    url: '/admin/draw/send',
    method: 'post',
    data
  })
}

export function expressObj(id) {
  return request({
    url: `/admin/draw/view/express?id=${id}`,
    method: 'get'
  })
}