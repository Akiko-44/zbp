import request from '@/utils/request'

// 栏目管理
export function jewelryColumnList(params) {
  return request({
    url: '/admin/jewelryColumn/page',
    method: 'get',
    params
  })
}
export function updateJewelryColumn(data) {
  return request({
    url: '/admin/jewelryColumn/saveOrUpdate',
    method: 'post',
    data
  })
}
export function delJewelryColumn(id) {
  return request({
    url: `/admin/jewelryColumn/delete/${id}`,
    method: 'post'
  })
}

// 标签管理
export function contentLabelList(params) {
  return request({
    url: '/admin/contentLabel/page',
    method: 'get',
    params
  })
}
export function updateContentLabel(data) {
  return request({
    url: '/admin/contentLabel/saveOrUpdate',
    method: 'post',
    data
  })
}
export function delContentLabel(id) {
  return request({
    url: `/admin/contentLabel/delete/${id}`,
    method: 'post'
  })
}

// 内容管理(type: 0内容列表  1 草稿列表)
export function jewelryContentList(params, type) {
  return request({
    url: `/admin/jewelryContent/page/${type}`,
    method: 'get',
    params
  })
}
export function updateJewelryContent(data) {
  return request({
    url: '/admin/jewelryContent/saveOrUpdate',
    method: 'post',
    data
  })
}
export function delJewelryContent(id) {
  return request({
    url: `/admin/jewelryContent/delete/${id}`,
    method: 'post'
  })
}

export function associatedGoodsList(params) {
  return request({
    url: '/admin/jewelryContent/getGoods',
    method: 'get',
    params
  })
}
export function bindAndUnbindContent(type, data) {
  return request({
    url: `/admin/jewelryContent/bindAndUnbind/${type}`,
    method: 'post',
    data
  })
}

export function contentCommentList(params) {
  return request({
    url: '/admin/contentComment/page',
    method: 'get',
    params
  })
}
export function delContentComment(id) {
  return request({
    url: `/admin/contentComment/delete/${id}`,
    method: 'post'
  })
}

// 修改标签
export function updateLabel(data) {
  return request({
    url: `/admin/jewelryContent/updateLabel`,
    method: 'post',
    data
  })
}

// 申请推送
export function applyPushObject(id, applyPushObject) {
  return request({
    url: `/admin/jewelryContent/applyPush/${id}/${applyPushObject}`,
    method: 'post'
  })
}

// 强制下架
export function forceTakeOffContent(data) {
  return request({
    url: `/admin/jewelryContent/forceTakeOff`,
    method: 'post',
    data
  })
}

// 审核管理-内容审核
export function auditContentReview(data) {
  return request({
    url: '/admin/jewelryContent/contentReview',
    method: 'post',
    data
  })
}

// 审核管理-推送审核
export function auditPushReview(data) {
  return request({
    url: '/admin/jewelryContent/pushReview',
    method: 'post',
    data
  })
}

// 内容管理-评论列表
export function contentCommentDetail(params) {
  return request({
    url: `/admin/contentComment/detail`,
    method: 'get',
    params
  })
}

// 内容管理-评论列表-回复
export function contentCommentSave(data) {
  return request({
    url: '/admin/contentComment/save',
    method: 'post',
    data
  })
}
