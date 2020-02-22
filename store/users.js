import { paginate, getPageCount } from '~/utils'

export const state = () => ({
  users: [],
  perPage: 75,
  currentPage: 1,
  filters: {
    id: '',
    login: '',
    url: '',
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
  }
}

export const getters = {
  filteredUsers: (state) => {
    const { users, filters } = state
    const { id = '', login = '', url = '', contributions = '' } = filters

    return users
      .filter((user) => (user.id + '').toLowerCase().includes(id))
      .filter((user) => user.login.toLowerCase().includes(login))
      .filter((user) => user.url.toLowerCase().includes(url))
      .filter((user) =>
        (user.contributions + '').toLowerCase().includes(contributions)
      )
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
