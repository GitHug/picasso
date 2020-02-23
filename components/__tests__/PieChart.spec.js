import { mount } from '@vue/test-utils'
import { GChart } from 'vue-google-charts'
import PieChart from '~/components/PieChart'
import { twPluginMock } from '~/testSuiteSetup'

describe('PieChart', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(PieChart, {
      propsData: {
        chartData: [],
        name: 'Data'
      },
      mocks: {
        $tw: twPluginMock
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

  it('should render a pie chart', () => {
    expect(wrapper.find(GChart).props('type')).toBe('PieChart')
  })
})
