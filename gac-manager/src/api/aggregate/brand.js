import request from '@/utils/request'

//获取品牌管理列表数据
export function getBrandList(params) {
  return request({
    url: '/admin/extend/classification/getBrandList',
    method: 'get',
    params
  })
}

//获取品牌管理列表总条数
export function getTotal(params) {
  return request({
    url: '/admin/extend/classification/getNumCount',
    method: 'get',
    params
  })
}

//获取品牌单条数据
export function getItem(params){
  return request({
    url: '/admin/extend/classification/getBrandById',
    method: 'get',
    params
  })
}

//添加或者修改品牌
export function addItem(params){
  return request({
    url: '/admin/extend/classification/saveOrUpdateBrand',
    method: 'post',
    params
  })
}

//删除品牌
export function removeItem(params){
  return request({
    url: '/admin/extend/classification/deleteBrandById',
    method: 'post',
    params
  })
}