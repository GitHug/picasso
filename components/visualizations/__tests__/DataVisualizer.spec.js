import { mount } from '@vue/test-utils'
import DataVisualizer, {
  PIE
} from '~/components/visualizations/DataVisualizer.vue'
import BarChart from '~/components/visualizations/BarChart.vue'
import PieChart from '~/components/visualizations/PieChart.vue'
import { twPluginMock } from '~/testSuiteSetup'

describe('DataVisualizer', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(DataVisualizer, {
      stubs: {
        GChart: true,
        Transition: {
          render(h) {
            return h('div', this.$slots.default)
          }
        }
      },
      mocks: {
        $tw: twPluginMock
      }
    })
  })

  it('should render as bar chart when mounted', () => {
    expect(wrapper.find(BarChart).exists()).toBeTruthy()
    expect(wrapper.find(PieChart).exists()).toBeFalsy()
  })

  it('should set the first non-numeric column to be the first column', async () => {
    wrapper.setProps({
      rows: [
        {
          abc: '123',
          def: 'foo',
          ghi: 'bar'
        }
      ]
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find(BarChart).props('chartData')[0][0]).toBe('def')
  })

  it('should should only pick columns with numeric values for subsequent columns', async () => {
    wrapper.setProps({
      rows: [
        {
          abc: '123',
          def: 'foo',
          ghi: 'bar'
        }
      ]
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find(BarChart).props('chartData')).toEqual([
      ['def', 'abc'],
      ['foo', 123]
    ])
  })

  it('should select a numeric column to be the first column if there are no non-numeric columns', async () => {
    wrapper.setProps({
      rows: [
        {
          abc: '123',
          def: '456',
          ghi: '789'
        }
      ]
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find(BarChart).props('chartData')).toEqual([
      ['abc', 'def', 'ghi'],
      ['123', 456, 789]
    ])
  })

  it('should render as pie chart when the pie chart button is clicked', async () => {
    wrapper.find('button[title="Pie Chart"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find(PieChart).exists()).toBeTruthy()
    expect(wrapper.find(BarChart).exists()).toBeFalsy()
  })

  it('should render as bar chart when the bar chart button is clicked', async () => {
    wrapper.setData({
      chart: PIE
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find(PieChart).exists()).toBeTruthy()

    wrapper.find('button[title="Bar Chart"]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find(PieChart).exists()).toBeFalsy()
    expect(wrapper.find(BarChart).exists()).toBeTruthy()
  })
})
