import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import router, {
  resetRouter
} from '@/router'

const state = {
  token: getToken(),
  name: '',
  userId: '',
  avatar: 'http://image.gacjc.com/work_1KyFQUiR6eQkt3u_284_284.png',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    commit('SET_TOKEN', '')
    commit('SET_NAME', '')
    const {
      username,
      password,
      verifyCode,
      codeUuid,
      verify
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        userName: username.trim(),
        password: password,
        verifyCode: verifyCode,
        codeUuid: codeUuid,
        verify: verify
      }).then(response => {
        const {
          data
        } = response
        commit('SET_TOKEN', data.accessToken)
        commit('SET_NAME', data.userName)
        commit('SET_USERID', data.id)
        sessionStorage.setItem('userId', data.id)
        sessionStorage.setItem('userName', data.userName)
        sessionStorage.setItem('randomString', _getRandomString(17) + getNowTime())
        setToken(data.accessToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {
          data
        } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const {
          roles,
          name,
          avatar,
          introduction,
          id
        } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_USERID', id)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('userName')
        sessionStorage.removeItem('randomString')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({
    commit,
    dispatch
  }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const {
        roles
      } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {
        root: true
      })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, {
        root: true
      })

      resolve()
    })
  }
}

// 随机数
function _getRandomString(len) {
  len = len || 32
  var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var maxPos = $chars.length
  var randomStr = ''
  for (let i = 0; i < len; i++) {
    randomStr += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return randomStr
}

function getNowTime() {
  return (new Date().getTime()).toString()
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
