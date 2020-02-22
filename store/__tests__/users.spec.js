import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as usersStore from '~/store/users'

jest.mock('papaparse', () => ({
  parse: (file, { complete }) => complete(file)
}))

describe('Store', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  let store, api
  beforeEach(() => {
    store = new Vuex.Store({ ...usersStore })
    api = {
      fetchUsers: jest.fn()
    }
    store.$api = api
  })

  const users = [
    {
      id: 1,
      login: 'Foo',
      url: 'www.example.com',
      contributions: 11
    },
    {
      id: 2,
      login: 'Bar',
      url: 'www.test.org',
      contributions: 22
    },
    {
      id: 3,
      login: 'Baz',
      url: 'github.com',
      contributions: 23
    },
    {
      id: 4,
      login: 'Qux',
      url: 'test.org',
      contributions: 42
    },
    {
      id: 5,
      login: 'Quux',
      url: 'myspace.com',
      contributions: 19
    }
  ]

  describe('fetchUsers action', () => {
    it('should call the fetch user api', () => {
      store.dispatch('fetchUsers')
      expect(api.fetchUsers).toHaveBeenCalled()
    })

    it('should populate the store with the fetched users', async () => {
      api.fetchUsers.mockReturnValue(users)

      await store.dispatch('fetchUsers')

      expect(store.state.users).toBe(users)
    })
  })

  describe('setPage action', () => {
    it('should set the current page', () => {
      store.dispatch('setPage', 42)
      expect(store.state.currentPage).toBe(42)

      store.dispatch('setPage', 19)
      expect(store.state.currentPage).toBe(19)
    })
  })

  describe('applyFilters action', () => {
    it('should set filters', () => {
      const filters = { foo: 'bar' }
      store.dispatch('applyFilters', filters)
      expect(store.state.filters).toEqual(filters)
    })

    it('should set filters as lowercase', () => {
      const filters = { foo: 'Bar', bar: 'BAZ', baz: 'foo' }
      store.dispatch('applyFilters', filters)
      expect(store.state.filters).toEqual({
        foo: 'bar',
        bar: 'baz',
        baz: 'foo'
      })
    })
  })

  describe('filteredUsers getters', () => {
    beforeEach(() => {
      store.state.users = users
    })

    it('should return all users if no filters are applied', () => {
      expect(store.getters.filteredUsers).toEqual(users)
    })

    it.each([
      [{ id: '5' }, [users[4]]],
      [{ id: '6' }, []],
      [{ login: 'ba' }, [users[1], users[2]]],
      [{ login: 'test' }, []],
      [{ url: '.com' }, [users[0], users[2], users[4]]],
      [{ url: '.io' }, []],
      [{ contributions: 2 }, [users[1], users[2], users[3]]],
      [{ contributions: 12 }, []],
      [{ login: 'ba', url: '.', contributions: 2 }, [users[1], users[2]]]
    ])(
      'should filter out users that does not match filter %j',
      (filter, expected) => {
        store.state.filters = filter
        expect(store.getters.filteredUsers).toEqual(expected)
      }
    )
  })

  describe('getUsers getter', () => {
    const perPage = 2

    let getUsers
    beforeEach(() => {
      store.state.users = users
      store.state.perPage = perPage
      getUsers = store.getters.getUsers
    })

    it('should get the first page of the paginated result if no argument is provided', () => {
      expect(getUsers()).toEqual([users[0], users[1]])
    })

    test('the result set size depends on the perPage value', () => {
      store.state.perPage = 3
      expect(getUsers()).toEqual([users[0], users[1], users[2]])
    })

    it('should get the results on the provided page', () => {
      expect(getUsers(2)).toEqual([users[2], users[3]])
    })

    it('should return a partial return set if not a full page exists on the requested page', () => {
      expect(getUsers(3)).toEqual([users[4]])
    })

    it('should return an empty array if the page does not exist', () => {
      expect(getUsers(42)).toEqual([])
    })

    test('the result should be paginated over filtered users', () => {
      store.state.perPage = 3
      store.state.filters = { login: 'ba' }
      expect(getUsers(1)).toEqual([users[1], users[2]])
    })
  })

  describe('pageCount getter', () => {
    const perPage = 2

    beforeEach(() => {
      store.state.users = users
      store.state.perPage = perPage
    })

    it('should return the page count', () => {
      expect(store.getters.pageCount).toBe(3)

      store.state.perPage = 3
      expect(store.getters.pageCount).toBe(2)
    })

    test('the page count should be applied to filtered users', () => {
      store.state.filters = { url: '.com' }
      store.state.perPage = 2

      expect(store.getters.pageCount).toBe(2)
    })
  })
})
