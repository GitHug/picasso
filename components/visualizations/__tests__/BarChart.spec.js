import { mount } from '@vue/test-utils'
import { GChart } from 'vue-google-charts'
import BarChart from '~/components/visualizations/BarChart'

describe('BarChart', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(BarChart, {
      propsData: {
        chartData: [],
        name: 'Data'
      }
    })
  })

  it('should provide the chartData prop to the GChart component', async () => {
    wrapper.setProps({
      chartData: ['some data']
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find(GChart).props('data')).toEqual(['some data'])
  })

  it('should render a bar chart', () => {
    expect(wrapper.find(GChart).props('settings')).toEqual({
      packages: ['bar']
    })
  })
})
