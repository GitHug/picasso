import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as index from '~/store'

jest.mock('papaparse', () => ({
  parse: (file, { complete }) => complete(file)
}))

describe('Store', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  let store
  beforeEach(() => {
    store = new Vuex.Store({ ...index })
  })

  describe('parseFile action', () => {
    it('should set the name of the file in the store', () => {
      const file = {
        name: 'my.file.with_extension.exe'
      }

      store.dispatch('parseFile', file)

      expect(store.state.name).toBe('my.file.with_extension')
    })

    it('should parse the data in the file', () => {
      const file = {
        name: 'my.file.with_extension.exe',
        data: ['data1', 'data2'],
        meta: {
          fields: ['label1', 'label2']
        }
      }

      store.dispatch('parseFile', file)

      expect(store.state.rows).toEqual(['data1', 'data2'])
      expect(store.state.labels).toEqual(['label1', 'label2'])
    })

    it('should reset the current page', () => {
      const file = {
        name: 'test.csv'
      }

      store.dispatch('setPage', 42)
      expect(store.state.currentPage).toBe(42)

      store.dispatch('parseFile', file)

      expect(store.state.currentPage).toBe(1)
    })
  })

  describe('updateRow action', () => {
    const row1 = { foo: 'abc', bar: 'def' }
    const row2 = { foo: 'ghi', bar: 'jkl' }
    const row3 = { foo: 'mno', bar: 'pqr' }

    beforeEach(() => {
      store.commit('SET_ROWS', [row1, row2, row3])
    })

    it.each([
      ['first', { key: 'foo', value: 42 }, { foo: 42, bar: 'def' }, 0],
      ['second', { key: 'bar', value: 0.39 }, { foo: 'ghi', bar: 0.39 }, 1],
      ['third', { key: 'foo', value: true }, { foo: true, bar: 'pqr' }, 2]
    ])(
      'should update the %s row in the list of rows',
      (_, { key, value }, expected, index) => {
        const rowToUpdate = store.state.rows[index]

        store.dispatch('updateRow', { row: rowToUpdate, key, value })

        const firstRow = store.state.rows[0]
        const secondRow = store.state.rows[1]
        const thirdRow = store.state.rows[2]

        expect(firstRow).toEqual(index === 0 ? expected : row1)
        expect(secondRow).toEqual(index === 1 ? expected : row2)
        expect(thirdRow).toEqual(index === 2 ? expected : row3)
      }
    )
  })

  describe('setPage action', () => {
    it('should set the current page', () => {
      store.dispatch('setPage', 42)
      expect(store.state.currentPage).toBe(42)

      store.dispatch('setPage', 19)
      expect(store.state.currentPage).toBe(19)
    })
  })

  describe('getRows getter', () => {
    const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const perPage = 3

    let getRows
    beforeEach(() => {
      store.state.rows = rows
      store.state.perPage = perPage
      getRows = store.getters.getRows
    })

    it('should get the first page of the paginated result if no argument is provided', () => {
      getRows = store.getters.getRows
      expect(getRows()).toEqual([0, 1, 2])
    })

    test('the result set size depends on the perPage value', () => {
      store.state.perPage = 7
      expect(getRows()).toEqual([0, 1, 2, 3, 4, 5, 6])
    })

    it('should get the results on the provided page', () => {
      expect(getRows(3)).toEqual([6, 7, 8])
    })

    it('should return a partial return set if not a full page exists on the requested page', () => {
      expect(getRows(4)).toEqual([9])
    })

    it('should return an empty array if the page does not exist', () => {
      expect(getRows(42)).toEqual([])
    })
  })

  describe('pageCount action', () => {
    const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const perPage = 3

    beforeEach(() => {
      store.state.rows = rows
      store.state.perPage = perPage
    })

    it('should return the page count', () => {
      expect(store.getters.pageCount).toBe(4)

      store.state.perPage = 7
      expect(store.getters.pageCount).toBe(2)
    })
  })
})
