import {
  service
} from '~/plugins/service'
import {
  setToken,
  removeToken
} from '~/utils/auth'
import {
  native
} from '~/plugins/native'

export const state = () => ({
  info: {},
  token: ''
})

export const mutations = {
  set(state, {
    name,
    data
  }) {
    state[name] = data
  },
  setToken(state, token) {
    setToken(token)
    state.token = token
  },
  removeToken() {
    removeToken()
    state.token = ''
  }
}

export const actions = {
  getUserInfo({
    commit,
    state
  }, clearCache) {
    if (!state.info.createTime || clearCache) {
      return service('userInfo').then(result => {
        commit('set', {
          name: 'info',
          data: Object.assign({}, state.info, result.data)
        })
        return result.data
      })
    }
    return Promise.resolve(state.info)
  },
  checkLogin({
    commit,
    state
  }, data) {
    // console.log('checkLogin')
    if (!state.token) {
      if (native.isApp()) {
        native.goToLogin()
      } else if (data) {
        // 如果第二个参为router 回调url为原来的地址 反之为包含fromUrl的对象 跳指定url
        if (data.fromUrl) {
          localStorage.setItem('fromUrl', data.fromUrl)
          data.router.push({
            name: 'user-login'
          })
        } else {
          localStorage.setItem('fromUrl', location.href)
          data.push({
            name: 'user-login'
          })
        }
        // router &&
        //   router.push({
        //     name: 'user-login',
        //     query: {
        //       from: location.href
        //     }
        //   })
      }
      return Promise.reject(new Error('用户未登录'))
    } else {
      return Promise.resolve(state.token)
    }
  }
}
