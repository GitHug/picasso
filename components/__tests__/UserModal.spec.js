import { mount } from '@vue/test-utils'
import ModalOverlay from '~/components/ModalOverlay.vue'
import UserModal from '~/components/UserModal.vue'
import LocationMap from '~/components/LocationMap.vue'

describe('UserModal', () => {
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

  let wrapper
  beforeEach(() => {
    wrapper = mount(UserModal, {
      propsData: {
        user
      },
      stubs: {
        LocationMap: true
      }
    })
  })

  it('should render user details in the modal', () => {
    const modal = wrapper.find(ModalOverlay)
    expect(modal.text()).toContain(user.name)
    expect(modal.text()).toContain(user.gender)
    expect(modal.text()).toContain(user.age)
    expect(modal.text()).toContain(user.eyeColor)
    expect(modal.text()).toContain(user.preferences.pet)
    expect(modal.text()).toContain(user.preferences.fruit)
  })

  it('should emit a close event when the ModalOverlay emits a close event', () => {
    wrapper.find(ModalOverlay).vm.$emit('close')
    expect(wrapper).toHaveEmitted('close')
  })

  it('should render a LocationMap component', () => {
    expect(wrapper.find(LocationMap).exists()).toBeTruthy()
  })

  test('the location map should be provided with longitude and latitude', () => {
    expect(wrapper.find(LocationMap).props()).toEqual({
      latitude: user.location.latitude,
      longitude: user.location.longitude
    })
  })
})
