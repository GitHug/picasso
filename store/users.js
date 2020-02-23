import { paginate, getPageCount } from '~/utils'

export const state = () => ({
  users: [],
  perPage: 25,
  currentPage: 1,
  filters: {
    id: '',
    login: '',
    contributions: ''
  }
})

export const actions = {
  async fetchUsers({ commit }) {
    try {
      const users = await this.$api.fetchUsers()
      commit('SET_USERS', users)
      return users
    } catch (e) {}
  },

  setPage({ commit }, page) {
    commit('SET_PAGE', page)
  },

  applyFilters({ commit }, filters = {}) {
    commit(
      'SET_FILTERS',
      Object.entries(filters).reduce(
        (obj, [key, value]) =>
          Object.assign(obj, {
            [key]: typeof value === 'string' ? value.toLowerCase() : ''
          }),
        {}
      )
    )
    commit('SET_PAGE', 1)
  }
}

export const getters = {
  filteredUsers: (state) => {
    const { users, filters } = state
    const { name = '', eyeColor = '', gender = '', age = '' } = filters

    return users
      .filter((user) => user.name.toLowerCase().includes(name))
      .filter((user) => user.eyeColor.toLowerCase().includes(eyeColor))
      .filter((user) => user.gender.toLowerCase().includes(gender))
      .filter((user) => (user.age + '').includes(age))
  },

  getUsers: (state, getters) => (page = 1) => {
    return paginate(getters.filteredUsers, page, state.perPage)
  },
  pageCount: (state, getters) =>
    getPageCount(getters.filteredUsers, state.perPage)
}

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
  SET_PAGE(state, page) {
    state.currentPage = page
  },
  SET_FILTERS(state, filters) {
    state.filters = filters
  }
}
