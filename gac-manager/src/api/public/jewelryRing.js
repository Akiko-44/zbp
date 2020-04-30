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

// 话题管理
export function getTopicList(status, params) {
  return request({
    url: `/admin/jewelryTopic/getTopicList/${status}`,
    method: 'get',
    params
  })
}

export function saveOrUpdateTopic(data) {
  return request({
    url: '/admin/jewelryTopic/saveOrUpdate',
    method: 'post',
    data
  })
}

// 话题管理-是否置顶
export function stickTopic(id, status) {
  return request({
    url: `/admin/jewelryTopic/setOrCancelTop/${id}/${status}`,
    method: 'post'
  })
}

export function delTopic(id) {
  return request({
    url: `/admin/jewelryTopic/delete/${id}`,
    method: 'post'
  })
}

// 话题管理-参与人数
export function topicJoinNumList(params) {
  return request({
    url: `/admin/jewelryTopic/topicJoinNumList`,
    method: 'get',
    params
  })
}

// 内容管理-内容置顶1、置顶2、不置顶
export function stickJewelryContent(id, topStatus) {
  return request({
    url: `/admin/jewelryContent/setTop/${id}/${topStatus}`,
    method: 'get'
  })
}

// 自媒体后台相关接口
// 账户信息获取
export function getAcountDetail(id) {
  return request({
    url: `/admin/accountManage/getAcountDetail/${id}`,
    method: 'get'
  })
}

// 账户信息修改
export function updateAcount(data) {
  return request({
    url: '/admin/accountManage/updateAcount',
    method: 'post',
    data
  })
}

// 手机号是否绑定
export function isPhoneBinding(phoneNum) {
  return request({
    url: `/admin/phoneBinding/isBinding/${phoneNum}`,
    method: 'get'
  })
}

// 手机号绑定
export function phoneBinding(data) {
  return request({
    url: '/admin/phoneBinding/bindingPhone',
    method: 'post',
    data
  })
}
// 自媒体后台相关接口结束

// 举报类型
export function reportTypeList(params, type) {
  return request({
    url: '/admin/jewelry/reportType/listReport',
    method: 'get',
    params
  })
}
export function updateReportType(data) {
  return request({
    url: '/admin/jewelry/reportType/saveOrUpdate',
    method: 'post',
    data
  })
}
export function delReportType(id) {
  return request({
    url: `/admin/jewelry/reportType/delete/${id}`,
    method: 'post'
  })
}

// 举报管理
export function reportList(params) {
  return request({
    url: '/admin/jewelry/report/list',
    method: 'get',
    params
  })
}

export function reportCheck(reportId, params) {
  return request({
    url: `/admin/jewelry/report/check/${reportId}`,
    method: 'post',
    params
  })
}

export function reportDetail(id, params) {
  return request({
    url: `/admin/jewelry/report/detail/${id}`,
    method: 'get',
    params
  })
}
