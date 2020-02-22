import * as Papa from 'papaparse'

export const state = () => ({
  labels: [],
  rows: [],
  currentPage: 1,
  perPage: 100,
  name: ''
})

export const actions = {
  parseFile({ commit }, file) {
    const nameWithoutExtension = file.name
      .split('.')
      .slice(0, -1)
      .join('.')

    commit('SET_NAME', nameWithoutExtension)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data, meta = {} }) => {
        commit('SET_ROWS', data)
        commit('SET_LABELS', meta.fields)
      }
    })

    commit('SET_PAGE', 1)
  },

  updateRow({ state, commit }, { row, key, value }) {
    const index = state.rows.indexOf(row)
    commit('SET_ROWS', [
      ...state.rows.slice(0, index),
      { ...row, [key]: value },
      ...state.rows.slice(index + 1)
    ])
  },

  setPage({ commit }, page = 1) {
    commit('SET_PAGE', page)
  }
}

export const getters = {
  getRows: (state) => (page = 1) => {
    const offset = state.perPage * (page - 1)
    return state.rows.slice(offset, offset + state.perPage)
  },

  pageCount: (state) => {
    return Math.ceil(state.rows.length / state.perPage)
  }
}

export const mutations = {
  SET_NAME(state, name) {
    state.name = name
  },
  SET_ROWS(state, rows = []) {
    state.rows = rows
  },
  SET_LABELS(state, labels = []) {
    state.labels = labels
  },
  SET_PAGE(state, page = 1) {
    state.currentPage = page
  }
}
