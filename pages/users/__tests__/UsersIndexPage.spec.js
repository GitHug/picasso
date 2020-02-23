import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import UsersIndexPage from '~/pages/users/index.vue'
import * as indexStore from '~/store'
import * as usersStore from '~/store/users'
import UserTable from '~/components/UserTable.vue'
import UserModal from '~/components/UserModal.vue'

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

  const user = {
    _id: '5d5d7ad6b0e83bc2d9d67dfb',
    age: 28,
    eyeColor: 'brown',
    name: 'Stephens Townsend',
    gender: 'male',
    location: {
      latitude: 26.723281,
      longitude: 99.391104
    },
    preferences: {
      pet: 'bird',
      fruit: 'apple'
    }
  }

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
        store,
        stubs: {
          LocationMap: true
        }
      })
    })

    it('should render a UserTable component', () => {
      expect(wrapper.find(UserTable).exists()).toBeTruthy()
    })

    it('should open a UserModal component when a user is selected', async () => {
      expect(wrapper.find(UserModal).exists()).toBeFalsy()

      wrapper.setData({
        selectedUser: user
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.find(UserModal).exists()).toBeTruthy()
    })

    it('should close the modal and remove the selected user when the modal closes', async () => {
      wrapper.setData({
        selectedUser: user
      })
      await wrapper.vm.$nextTick()
      wrapper.find(UserModal).vm.$emit('close')
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.selectedUser).toBeUndefined()
      expect(wrapper.find(UserModal).exists()).toBeFalsy()
    })

    it('should provide selected user as prop to the UserModal', async () => {
      wrapper.setData({
        selectedUser: user
      })
      await wrapper.vm.$nextTick()

      expect(wrapper.find(UserModal).props('user')).toBe(user)
    })
  })
})
