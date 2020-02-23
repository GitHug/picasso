import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as usersStore from '~/store/users'

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

  const user1 = {
    _id: '5d5d7ad6b0e83bc2d9d67dfb',
    age: 28,
    eyeColor: 'brown',
    name: 'Stephens Townsend',
    gender: 'male'
  }

  const user2 = {
    _id: '5d5d7ad67879dec8b9286d51',
    age: 27,
    eyeColor: 'blue',
    name: 'Aida Townsend',
    gender: 'female'
  }

  const user3 = {
    _id: '5d5d7ad69975c19b54ba1b73',
    age: 33,
    eyeColor: 'green',
    name: 'Mercado West',
    gender: 'male'
  }

  const user4 = {
    _id: '5d5d7ad6b0518f619b88c330',
    age: 34,
    eyeColor: 'brown',
    name: 'Berry Fletcher',
    gender: 'male'
  }

  const user5 = {
    _id: '5d5d7ad67534839ac2910e6b',
    age: 34,
    eyeColor: 'green',
    name: 'Deloris Perkins',
    gender: 'female'
  }

  const users = [user1, user2, user3, user4, user5]

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

    it('should set it to the first page', () => {
      store.state.currentPage = 42

      store.dispatch('applyFilters', { foo: 'bar' })
      expect(store.state.currentPage).toBe(1)
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
      [{ name: 'townsend' }, [user1, user2]],
      [{ name: 'foo' }, []],
      [{ gender: 'female' }, [user2, user5]],
      [{ gender: 'alien' }, []],
      [{ eyeColor: 'brown' }, [user1, user4]],
      [{ eyeColor: 'pink' }, []],
      [{ age: '3' }, [user3, user4, user5]],
      [{ age: '100' }, []],
      [{ name: 'townsend', gender: 'female' }, [user2]]
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
      expect(getUsers()).toEqual([user1, user2])
    })

    test('the result set size depends on the perPage value', () => {
      store.state.perPage = 3
      expect(getUsers()).toEqual([user1, user2, user3])
    })

    it('should get the results on the provided page', () => {
      expect(getUsers(2)).toEqual([user3, user4])
    })

    it('should return a partial return set if not a full page exists on the requested page', () => {
      expect(getUsers(3)).toEqual([user5])
    })

    it('should return an empty array if the page does not exist', () => {
      expect(getUsers(42)).toEqual([])
    })

    test('the result should be paginated over filtered users', () => {
      store.state.perPage = 1
      store.state.filters = { gender: 'female' }
      expect(getUsers(1)).toEqual([user2])
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
      store.state.filters = { age: '3' }
      store.state.perPage = 2

      expect(store.getters.pageCount).toBe(2)
    })
  })
})
