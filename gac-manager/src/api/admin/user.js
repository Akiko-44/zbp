import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/admin/perm/user/front/info',
    method: 'get'
  })
}

export function page(query) {
  return request({
    url: '/admin/perm/user/page',
    method: 'get',
    params: query
  })
}

/**
 * 添加用户
 * @param {Object} obj 对象
 * {
    name: 'bbb',
    username: 'bbb',
    password: '123456',
    sex: '男',
    description: '描述'
  }
 */
export function addObj(obj) {
  return request({
    url: '/admin/perm/user/saveOrUpdate',
    method: 'post',
    data: obj
  })
}

/**
 * 禁用用户
 * @param {Number} userId 用户ID
 * @param {Number} status 状态 1激活、0禁用
 */
export function delObj(userId, status) {
  return request({
    url: '/admin/perm/user/forbidden',
    method: 'post',
    data: {
      userId,
      status
    }
  })
}

/**
 * 修改用户资料
 * @param {Object} data 用户数据
 * {
    id: 21,
    name: 'bbb',
    username: 'bbb again',
    password: '123456',
    sex: '女',
    description: '描述 again'
  }
 */
export function putObj(data) {
  return request({
    url: '/admin/perm/user/saveOrUpdate',
    method: 'post',
    data
  })
}

/**
 * 找回密码，验证手机号
 */
export function resetPasswordPre(data) {
  return request({
    url: `/api/userCenter/reset-password-pre`,
    method: 'post',
    data
  })
}

/**
 * 找回密码，设置新密码
 */
export function resetPassword(data) {
  return request({
    url: `/api/userCenter/reset-password`,
    method: 'post',
    data
  })
}