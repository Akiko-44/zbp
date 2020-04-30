import request from '@/utils/request'

export function regions(id) {
  return request({
    url: `/admin/freight/getRegionById/${id}`,
    method: 'get'
  })
}

export function getpage(params) {
  return request({
    url: `/admin/freight/page`,
    method: 'get',
    params
  })
}

export function addlist(obj) {
  return request({
    url: `/admin/freight/addFreightTemplate?name=${obj.name}&pricMethod=${obj.pricMethod}&template_type=2&startWeight=${obj.startWeight}&startPrice=${obj.startPrice}&renewWeight=${obj.renewWeight}&renewPrice=${obj.renewPrice}`,
    method: 'post'
  })
}

export function getpull(id) {
  return request({
    url: ` /admin/freight/detail/${id}`,
    method: 'get'
  })
}

export function editlist(obj,id) {
  return request({
    url: ` /admin/freight/updateFreightTemplate?name=${obj.name}&pricMethod=${obj.pricMethod}&template_type=2&startWeight=${obj.startWeight}&startPrice=${obj.startPrice}&renewWeight=${obj.renewWeight}&renewPrice=${obj.renewPrice}&id=${id}`,
    method: 'post'
  })
}

export function del(id) {
  return request({
    url: ` /admin/freight/delete/${id}`,
    method: 'get'
  })
}

export function Addaddress(obj,id,region) {
  return request({
    url: `/admin/freightAppoint/addAppointFreight?region=${region}&regionStartWeight=${obj.regionStartWeight}&regionStartPrice=${obj.regionStartPrice}&regionRenewWeight=${obj.regionRenewWeight}&regionRenewPrice=${obj.regionRenewPrice}&fid=${id}`,
    method: 'post'
  })
}

export function selectAppoint(id) {
  return request({
    url: `/admin/freightAppoint/selectAppointFreightById?id=${id}`,
    method: 'get'
  })
}

export function freightAppointPage(id) {
  return request({
    url: `/admin/freightAppoint/page?id=${id}`,
    method: 'get'
  })
}

export function delAppointFreightById(id) {
  return request({
    url: `/admin/freightAppoint/delAppointFreightById?id=${id}`,
    method: 'get'
  })
}


export function updateAppointFreight(obj,id,region,fid) {
  return request({
     url: `/admin/freightAppoint/updateAppointFreight?region=${region}&regionStartWeight=${obj.regionStartWeight}&regionStartPrice=${obj.regionStartPrice}&regionRenewWeight=${obj.regionRenewWeight}&regionRenewPrice=${obj.regionRenewPrice}&id=${id}&fid=${fid}`,
     method: 'post'
  })
}