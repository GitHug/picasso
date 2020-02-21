import { mount } from '@vue/test-utils'
import DataTable from '~/components/DataTable.vue'

describe('DataTable', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(DataTable)
  })

  it('should render a table head for every label', async () => {
    const label1 = 'ABC'
    const label2 = 'DEF'
    const label3 = 'GHI'

    expect(wrapper.findAll('thead th')).toHaveLength(0)

    wrapper.setProps({ labels: [label1, label2, label3] })
    await wrapper.vm.$nextTick()

    const ths = wrapper.findAll('thead th')

    expect(ths).toHaveLength(3)
    expect(ths.at(0).text()).toContain(label1)
    expect(ths.at(1).text()).toContain(label2)
    expect(ths.at(2).text()).toContain(label3)
  })

  it('should render a table row for every row', async () => {
    const rows = [{}, {}, {}, {}]

    expect(wrapper.findAll('tbody tr')).toHaveLength(0)

    wrapper.setProps({ rows })
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('tbody tr')).toHaveLength(4)
  })

  it('should render a table column with an input field for every object key in a row', async () => {
    const row1 = {
      column1: 'some text',
      column2: 42,
      column3: true
    }

    const row2 = {
      column1: 'some other text',
      column2: 19,
      column3: false
    }

    wrapper.setProps({ rows: [row1, row2] })
    await wrapper.vm.$nextTick()

    const trs = wrapper.findAll('tbody tr')

    const query = ({ row, column }) =>
      trs
        .at(row)
        .findAll('td')
        .at(column)
        .find('input').element.value

    expect(query({ row: 0, column: 0 })).toContain(row1.column1)
    expect(query({ row: 0, column: 1 })).toContain(row1.column2)
    expect(query({ row: 0, column: 2 })).toContain(row1.column3)

    expect(query({ row: 1, column: 0 })).toContain(row2.column1)
    expect(query({ row: 1, column: 1 })).toContain(row2.column2)
    expect(query({ row: 1, column: 2 })).toContain(row2.column3)
  })

  it('should emit an updateRow event when a column value is updated for a row', async () => {
    const row1 = {
      column1: 'some text',
      column2: 'some other text'
    }

    const row2 = {
      column1: 'some more text',
      column2: 'more text'
    }

    wrapper.setProps({ rows: [row1, row2] })
    await wrapper.vm.$nextTick()

    wrapper
      .findAll('tbody tr')
      .at(1)
      .findAll('td')
      .at(1)
      .find('input')
      .setValue('FooBar')

    expect(wrapper).toHaveEmitted('updateRow', {
      row: row2,
      key: 'column2',
      value: 'FooBar'
    })
  })
})
