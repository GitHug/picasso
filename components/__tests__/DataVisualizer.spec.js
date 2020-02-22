import { mount } from '@vue/test-utils'
import { GChart } from 'vue-google-charts'
import DataVisualizer from '~/components/DataVisualizer.vue'

describe('DataVisualizer', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(DataVisualizer, {
      stubs: {
        GChart: true
      }
    })
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

    expect(wrapper.find(GChart).props('data')[0][0]).toBe('def')
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

    expect(wrapper.find(GChart).props('data')).toEqual([
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

    expect(wrapper.find(GChart).props('data')).toEqual([
      ['abc', 'def', 'ghi'],
      ['123', 456, 789]
    ])
  })

  it('should render as bar chart when mounted', () => {
    expect(wrapper.find(GChart).props('type')).toBe('ColumnChart')
  })

  it('should render as pie chart when the pie chart button is clicked', async () => {
    wrapper.find('button[title="Pie Chart"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find(GChart).props('type')).toBe('PieChart')
  })

  it('should render as bar chart when the bar chart button is clicked', async () => {
    wrapper.setData({
      type: 'PieChart'
    })

    wrapper.find('button[title="Bar Chart"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find(GChart).props('type')).toBe('ColumnChart')
  })
})
