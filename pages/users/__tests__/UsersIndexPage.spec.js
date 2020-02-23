import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import UsersIndexPage from '~/pages/users/index.vue'
import * as indexStore from '~/store'
import * as usersStore from '~/store/users'
import UserTable from '~/components/UserTable.vue'
import ModalOverlay from '~/components/ModalOverlay.vue'

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
        store
      })
    })

    it('should render a UserTable component', () => {
      expect(wrapper.find(UserTable).exists()).toBeTruthy()
    })

    it('should open a modal when a user is selected', async () => {
      expect(wrapper.find(ModalOverlay).exists()).toBeFalsy()

      wrapper.setData({
        selectedUser: user
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.find(ModalOverlay).exists()).toBeTruthy()
    })

    it('should close the modal and remove the selected user when the modal closes', async () => {
      wrapper.setData({
        selectedUser: user
      })
      await wrapper.vm.$nextTick()
      wrapper.find(ModalOverlay).vm.$emit('close')
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.selectedUser).toBeUndefined()
      expect(wrapper.find(ModalOverlay).exists()).toBeFalsy()
    })

    it('should render user details in the modal', async () => {
      wrapper.setData({
        selectedUser: user
      })
      await wrapper.vm.$nextTick()

      const modal = wrapper.find(ModalOverlay)
      expect(modal.text()).toContain(user.name)
      expect(modal.text()).toContain(user.gender)
      expect(modal.text()).toContain(user.age)
      expect(modal.text()).toContain(user.eyeColor)
      expect(modal.text()).toContain(user.preferences.pet)
      expect(modal.text()).toContain(user.preferences.fruit)
    })
  })
})
