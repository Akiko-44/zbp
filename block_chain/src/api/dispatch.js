import request from '@/utils/request'

export function getDispatchList(params) {
  return request({
    url: '/admin/dispatchingManagement/getAllThreadTask',
    method: 'get',
    params
  })
}

export function getDispatch(params) {
  return request({
    url: `/admin/dispatchingManagement/getThreadTask`,
    method: 'get',
    params
  })
}

export function saveDispatch(data) {
  return request({
    url: '/admin/dispatchingManagement/saveOrUpdate',
    method: 'post',
    data
  })
}

export function delDispatch(id) {
  return request({
    url: `/admin/dispatchingManagement/deleteThreadTask/${id}`,
    method: 'post'
  })
}
