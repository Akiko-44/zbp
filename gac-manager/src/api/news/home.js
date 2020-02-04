import request from '@/utils/request'
// 首页管理
export function getBanners(params) {
  return request({
    url: `/admin/industry/homeSetting/getBannerList`,
    method: 'get',
    params
  })
}
export function delBanner(id){
	return request({
		url: `/admin/industry/homeSetting/deleteBannerById?id=${id}`,
		method: 'post'
	})
}

export function saveBanners(params) {
  return request({
    url: `/admin/industry/homeSetting/addBanner`,
    method: 'post',
    params
  })
}
export function updataBanners(params) {
  return request({
    url: `admin/industry/homeSetting/getBannerList`,
    method: 'get',
    params
  })
}
export function setHomePage(params){
	return request({
		url: '/admin/industry/homeSetting/setHomePage',
		method: 'post',
		params
	})
}

export function getHomePage(params){
	return request({
		url: '/admin/industry/homeSetting/getHomePage',
		method: 'get',
		params
	})
}
