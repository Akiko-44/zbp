export const state = () => ({
  newsColumns: [],
  swapBrands: [],
  swapCategories: []
})

export const mutations = {
  set (state, { name, data }) {
    state[name] = data
  }
}

export const actions = {
  get ({ commit, state }, { name, service }) {
    const cache = state[name].length || Object.keys(state[name]).length
    return cache
      ? Promise.resolve()
      : service.then(res => res.data).then(data => {
        commit('set', { name, data })
      })
  }
}
