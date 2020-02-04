import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/admin/designmanu/merchant/cateCategory/list',
    method: 'post',
    data
  })
}

export function addObj(data) {
  return request({
    url: '/admin/designmanu/merchant/category/saveOrUpdate',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: `/admin/designmanu/merchant/delCaseCategory/${id}`,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/designmanu/merchant/category/saveOrUpdate',
    method: 'post',
    data
  })
}

export function jewelryPage(params) {
  return request({
    url: '/admin/goodsCategory/page',
    method: 'get',
    params
  })
}

export function addJewelryObj(data) {
  return request({
    url: '/admin/goodsCategory/saveOrUpdate',
    method: 'post',
    data
  })
}

export function delJewelryObj(id) {
  return request({
    url: `/admin/goodsCategory/delete/${id}`,
    method: 'post'
  })
}

/*筛选分类*/
/* *
 *  标志 flag 1、珠宝店 2、设计室；3、制造间；4、互换坊';
 * */
export function pageScreen(params) {
  return request({
    url: '/admin/portal/user/search/list',
    method: 'get',
    params
  })
}

export function delObjScreen(id) {
  return request({
    url: `/admin/portal/user/search/delSearchCategory/${id}`,
    method: 'get'
  })
}

export function addObjScreen(data) {
  return request({
    url: '/admin/portal/user/search/category/saveOrUpdate',
    method: 'post',
    data
  })
}