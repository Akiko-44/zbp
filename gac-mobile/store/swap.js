export const state = () => ({
  searchType: 0
})

export const mutations = {
  set (state, { name, data }) {
    state[name] = data
  }
}

export const actions = {}
