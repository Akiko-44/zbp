import request from '@/utils/request'

// 帮助中心首页
export function page(params) {
  return request({
    url: '/admin/portal/help/page/article',
    method: 'get',
    params
  })
}

// 帮助中心发布/编辑文档

export function getObj(id) {
  return request({
    url: '/admin/portal/help/article/detial/' + id,
    method: 'get'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/portal/help/saveOrUpdate/article',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: `/admin/portal/help/article/delete/${id}`,
    method: 'get'
  })
}

