import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/extend/exhibition/AdminPage',  // /admin/extend/exhibition/list
    method: 'get',
    params
  })
}

export function allLength(data){
	return request({
		url: '/admin/extend/exhibition/getNumCount',
		method: 'get',
		data
	})
}
export function delObj(id) {
  return request({
    url: `/admin/extend/exhibition/delExById/${id}`,
    method: 'post'
  })
}

export function getObj(id) {
  return request({
    url: `/admin/extend/exhibition/detail/${id}`,
    method: 'get'
  })
}
export function putObj(data) {
  return request({
    url: `/admin/extend/exhibition/saveOrUpdateInfo`,
    method: 'post',
    data
  })
}

export function addPic(data) {
  return request({
    url: `/admin/extend/exhibition/addMerPic`,
    method: 'post',
    data
  })
}

export function getDetailMerPic(id) {
  return request({
    url: `/admin/extend/exhibition/detailMerPic/${id}`,
    method: 'get'
  })
}

export function delDetailMerPic(id) {
  return request({
    url: `/admin/extend/exhibition/deleteMerPic/${id}`,
    method: 'post'
  })
}

export function getRegion(){
	return request({
		url:'/admin/extend/exhibition/getRegion',
		method: 'get'
	})
}
export function getRegionById(id){
	return request({
		url:`/admin/extend/exhibition/getRegionById/${id}`,
		method: 'get'
	})
}
export function getBrandList(){
	return request({
		url: '/admin/extend/classification/getBrandList?limit=1000',
		method: 'get'
	})
}
export function addEx(params){
	return request({
		url: '/admin/extend/exhibition/addEx',
		method: 'post',
		params
	})
}
export function delExById(id){
		return request({
			url:`/admin/extend/exhibition/delExById/${id}`,
			method: 'post'
	})
}
export function getExById(id){
		return request({
			url:`/admin/extend/exhibition/getExById/${id}`,
			method: 'get'
	})
}
export function Stick(params){
	return request({
		url: '/admin/extend/exhibition/updateStick',
		method: 'post',
		params
	})
}

export function getHomePage(params){
	return request({
		url:'/admin/jewelry/home/getHomePage',
		method:'get',
		params
	})
}
export function setHomePage(params){
	return request({
		url:'/admin/jewelry/home/setHomePage',
		method:'post',
		params
	})
}
export function getHomePageHR(params){
	return request({
		url:'/admin/jewelry/home/getHomeVRPage',
		method:'get',
		params
	})
}
export function setHomePageHR(params){
	return request({
		url:'/admin/jewelry/home/setHomePageVR',
		method:'post',
		params
	})
}
export function saveExhibitionVrcolumn(params){
	return request({
		url: '/admin/extend/vrcolumn/saveExhibitionVrcolumn',
		method: 'post',
		params
	})
}

export function getIndustryPatentBanner(){
	return request({
		url: '/admin/extend/vrcolumn/getIndustryPatentBanner',
		method: 'get',
	})
}

export function delExhibitionVrcolumn(id){
	return request({
		url: `/admin/extend/vrcolumn/delExhibitionVrcolumn/${id}`,
		method: 'post',
	})
}

export function updaExhibitionVrcolumn(params){
	return request({
		url: `/admin/extend/vrcolumn/updaExhibitionVrcolumn`,
		method: 'post',
		params
	})
}

export function getPage(params){
	return request({
		url:`/admin/extend/exhibitionVr/page`,
		method: 'get',
		params
	})
}
export function getAllPage(params){
	return request({
		url:`/admin/extend/exhibitionVr/getNumCount`,
		method: 'get',
		params
	})
}

export function delExhibitionById(id){
	return request({
		url:`/admin/extend/exhibitionVr/delExhibitionById/${id}`,
		method: 'post',
	})
}

export function saveExhibitionVr(params){
	return request({
		url:`/admin/extend/exhibitionVr/saveExhibitionVr`,
		method: 'post',
		params
	})
}

export function getExhibitionVr(id){
	return request({
		url:`/admin/extend/exhibitionVr/getExhibitionById/${id}`,
		method: 'get'
	})
}
export function updateExById(params){
	return request({
		url:`/admin/extend/exhibition/updateExById`,
		method: 'post',
		params
	})
}
export function updateExhibitionVr(params){
	return request({
		url:`/admin/extend/exhibitionVr/updateExhibitionById`,
		method: 'post',
		params
	})
}

export function subscribeListNum(id){
	return request({
		url:`/admin/extend/exhibition/subscribeListNum?id=${id}`,
		method: 'get',
	})
}
export function subscribeList(params,id){
	return request({
		url:`/admin/extend/exhibition/subscribeList?id=${id}`,
		method: 'get',
		params
	})
}