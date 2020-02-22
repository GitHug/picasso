import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import UsersIndexPage from '~/pages/users/index.vue'
import * as indexStore from '~/store'
import * as usersStore from '~/store/users'
import UserTable from '~/components/UserTable.vue'

describe('UsersIndexPage', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  let store
  beforeEach(() => {
    store = new Vuex.Store({
      ...indexStore,
      modules: {
        users: {
          namespaced: true,
          ...usersStore
        }
      }
    })
  })

  it('should mount', () => {
    expect(() =>
      mount(UsersIndexPage, {
        localVue,
        store
      })
    ).not.toThrow()
  })

  describe('when mounted', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(UsersIndexPage, {
        localVue,
        store
      })
    })

    it('should render a UserTable component', () => {
      expect(wrapper.find(UserTable).exists()).toBeTruthy()
    })
  })
})
