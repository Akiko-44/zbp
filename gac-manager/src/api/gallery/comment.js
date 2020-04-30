import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/gallery/atlas/commentList',
    method: 'get',
    params
  })
}

export function getObj(id) {
  return request({
    url: '/admin/gallery/atlas/detail/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/gallery/atlas/delcomment/' + id,
    method: 'post'
  })
}

export function getRegular() {
  return request({
    url: '/admin/industry/comment/regular/detail',
    method: 'get'
  })
}

export function setRegular(data) {
  return request({
    url: '/admin/industry/comment/regular/save',
    method: 'post',
    data
  })
}

// 敏感词导入
export function addSensitiveWordByFile(data) {
  return request({
    url: '/admin/sensitiveWord/addSensitiveWordByFile',
    method: 'post',
    data
  })
}

// 敏感词列表
export function getSensitiveWordList(params) {
  return request({
    url: '/admin/sensitiveWord/getSensitiveWordList',
    method: 'get',
    params
  })
}

// 敏感词添加
export function saveSensitiveWord(data) {
  return request({
    url: '/admin/sensitiveWord/saveSensitiveWord',
    method: 'post',
    data
  })
}

// 敏感词删除
export function deleteSensitivWord(wordId) {
  return request({
    url: `/admin/sensitiveWord/deleteSensitivWord/${wordId}`,
    method: 'post'
  })
}
