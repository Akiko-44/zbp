import request from '@/utils/request'
// 品牌管理分页
export function selectBrandMerchantPage(params) {
  return request({
    url: '/admin/goodsBrand/selectBrandMerchantPage',
    method: 'get',
    params
  })
}
// 品牌删除
export function delBrands(ids) {
  return request({
    url: '/admin/goodsBrand/delete/' + ids,
    method: 'post'
  })
}
//   品牌添加
export function addBrand(data) {
  return request({
    url: '/admin/goodsBrand/saveOrUpdate',
    method: 'post',
    data
  })
}
// 品牌管理获取选择商家
export function getMerchantInfo(params) {
  return request({
    url: '/admin/goodsBrand/getMerchantInfo',
    method: 'get',
    params
  })
}
// 根据品牌id获取绑定商家分页
export function selectMerchantPage(brandId, params) {
  return request({
    url: '/admin/goodsBrand/selectMerchantPage/' + brandId,
    method: 'get',
    params
  })
}
// 根据绑定id删除绑定商家
export function delBrandMerchant(id) {
  return request({
    url: '/admin/goodsBrand/deleteBrandMerchant/' + id,
    method: 'get'
  })
}
// 根据品牌id单独关联商家
export function saveBrandMerchant(data) {
  return request({
    url: '/admin/goodsBrand/saveBrandMerchant',
    method: 'POST',
    data
  })
}

// 根据品牌id绑定商家
export function brandBindingMerchant(data) {
  return request({
    url: '/admin/goodsBrand/brandBindingMerchant',
    method: 'POST',
    data
  })
}
