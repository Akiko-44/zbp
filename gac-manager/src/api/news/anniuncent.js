import request from '@/utils/request'

//获取公告管理列表数据
export function getAnniuncentList(params) {
  return request({
    url: '/admin/industry/Notice/page',
    method: 'get',
    params
  })
}

//获取数据管理列表总条数
export function getTotal(params) {
  return request({
    url: '/admin/industry/Notice/getNumCount',
    method: 'get',
    params
  })
}

//获取单条数据
export function getItem(params){
  return request({
    url: '/admin/industry/Notice/queryNoticeById',
    method: 'get',
    params
  })
}

//添加或者修改数据
export function addItem(params){
  return request({
    url: '/admin/industry/Notice/saveOrUpdateNotice',
    method: 'post',
    params
  })
}
//删除数据
export function removeItem(params){
  return request({
    url: '/admin/industry/Notice/batchDelNotice',
    method: 'post',
    params
  })
}



