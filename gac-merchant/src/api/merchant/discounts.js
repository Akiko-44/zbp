import request from '@/utils/request'


/* *
 * 优惠券类型type: 1珠宝店 ，2互换坊， 3制造间， 4运营
 * 商品来源goodsSource： 1、珠宝店; 2、互换坊; 3、设计室; 4、制造间; 5、图文馆
 * */

export function page(data, params, type) {
  return request({
    url: '/admin/coupons/page/' + type,
    method: 'get',
    data,
    params
  })
}

export function delObj(id) {
  return request({
    url: `/admin/coupons/delete/${id}`,
    method: 'post'
  })
}

export function getObj(id) {
  return request({
    url: `/admin/coupons/detail/${id}`,
    method: 'get'
  })
}

export function putObj(data, type) {
  return request({
    url: `/admin/coupons/saveOrUpdate/` + type,
    method: 'post',
    data
  })
}

export function getGoods(data, params) {
  return request({
    url: '/admin/designmanu/merchant/case/page',
    method: 'post',
    data,
    params
  })
}

export function getGoodsSwap(data, params) {
  return request({
    url: '/admin/swap/goods/sale_goods/list',
    method: 'get',
    data,
    params
  })
}

