import { mount } from '@vue/test-utils'
import LocationMap from '~/components/LocationMap.vue'

describe('LocationMap', () => {
  const latitude = 42.4242
  const longitude = 11.235

  let wrapper
  beforeEach(() => {
    wrapper = mount(LocationMap, {
      propsData: {
        latitude,
        longitude
      },
      stubs: {
        NoSsr: true,
        LMap: {
          name: 'LMap',
          props: ['center'],
          render(h) {
            return h('div', this.$slots.default)
          }
        },
        LTileLayer: true,
        LMarker: {
          name: 'LMarker',
          props: ['latLng'],
          render(h) {
            return h('div', this.$slots.default)
          }
        }
      }
    })
  })

  test('the map should be centered on provided coordinates', () => {
    expect(wrapper.find({ name: 'LMap' }).props('center')).toEqual([
      latitude,
      longitude
    ])
  })

  test('the marker should be positioned at the provided coordinates', () => {
    expect(wrapper.find({ name: 'LMarker' }).props('latLng')).toEqual([
      latitude,
      longitude
    ])
  })
})
