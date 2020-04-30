import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/store/page',
    method: 'get',
    params
  })
}

/* *
 * 1珠宝店 2.设计室 3制造间
 * */
export function detailStore(id) {
  return request({
    url: '/admin/store/detailStore/'+id+'/3',
    method: 'get'
  })
}

export function addObj(data) {
  return request({
    url: '/admin/store/designStoreAddOrUpdate',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: '/admin/store/delete/'+id,
    method: 'post'
  })
}

export function fabuObj(id) {
  return request({
    url: '/admin/store/updateStatus?storeId='+id,
    method: 'post'
  })
}

export function saveBanners(data) {
  return request({
    url: '/admin/store/saveOrUpdateBanner',
    method: 'post',
    data
  })
}

export function getGoods(data,params) {
  return request({
    url: '/admin/designmanu/merchant/case/page',
    method: 'post',
    data,
    params
  })
}

export function getCategory() {
  return request({
    url: '/admin/homePage/categoryShow',
    method: 'get'
  })
}

/*export function getCategory(data) {
  return request({
    url: '/admin/designmanu/merchant/cateCategory/list',
    method: 'post',
    data
  })
}*/

export function saveOrUpdateMenu(data) {
  return request({
    url: '/admin/store/saveOrUpdateMenu',
    method: 'post',
    data
  })
}

export function saveOrUpdateCustom(data) {
  return request({
    url: '/admin/store/saveOrUpdateCustom',
    method: 'post',
    data
  })
}

export function saveOrUpdateFloor(data) {
  return request({
    url: '/admin/store/saveOrUpdateFloor',
    method: 'post',
    data
  })
}