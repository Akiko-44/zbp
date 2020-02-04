/**
 * 数据缓存
 */
const data = {
  namespaced: true,
  state: {
    swapBrands: [],
    swapCategories: []
  },
  mutations: {
    set(state, { name, data }) {
      state[name] = data
    }
  },
  actions: {
    get({ commit, state }, { name, service }) {
      const cache = state[name].length || Object.keys(state[name]).length
      return cache ? Promise.resolve() : service().then(res => res.data).then(data => {
        commit('set', { name, data })
      })
    }
  }
}

export default data
