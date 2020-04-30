import request from '@/utils/request'
// =========上链模块=========
// 手工重试上链查询
export function searchManualRetryChain(params) {
  return request({
    url: '/admin/task/searchManualRetryChain',
    method: 'get',
    params
  })
}

// 手工上链
export function manulDealChainFailResult(params) {
  return request({
    url: '/admin/task/manulDealChainFailResult',
    method: 'get',
    params
  })
}

// 上链审核查询
export function searchChain(params) {
  return request({
    url: '/admin/task/getHandSetPublicChainRecord',
    method: 'get',
    params
  })
}

// 上链
export function dealChain(data) {
  return request({
    url: '/admin/task/handSetPublicChain',
    method: 'post',
    data
  })
}
