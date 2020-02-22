import { mount } from '@vue/test-utils'
import UserTable from '~/components/UserTable'

describe('UserTable', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(UserTable)
  })

  it('should render users', async () => {
    const users = [
      {
        id: 42,
        login: 'Foo',
        url: 'example.com',
        contributions: 19
      },
      {
        id: 19,
        login: 'Bar',
        url: 'test.org',
        contributions: 42
      }
    ]
    wrapper.setProps({ users })
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('tbody tr')).toHaveLength(2)

    const query = ({ row, column }) =>
      wrapper
        .findAll('tbody tr')
        .at(row)
        .findAll('td')
        .at(column)
        .text()

    expect(query({ row: 0, column: 0 })).toBe('42')
    expect(query({ row: 0, column: 1 })).toBe('Foo')
    expect(query({ row: 0, column: 2 })).toBe('example.com')
    expect(query({ row: 0, column: 3 })).toBe('19')

    expect(query({ row: 1, column: 0 })).toBe('19')
    expect(query({ row: 1, column: 1 })).toBe('Bar')
    expect(query({ row: 1, column: 2 })).toBe('test.org')
    expect(query({ row: 1, column: 3 })).toBe('42')
  })

  describe('when a filter is updated', () => {
    const filters = {
      id: '42',
      login: 'Githug',
      url: 'myspace.com',
      contributions: '0'
    }

    beforeEach(() => {
      wrapper.setProps({ filters })
    })

    it.each([
      [0, 'id', '19'],
      [1, 'login', 'Blub'],
      [2, 'url', 'wikipedia.org'],
      [3, 'contributions', '200']
    ])(
      'should emit an event with the updated value corresponding to column %s (%s)',
      (index, key, value) => {
        const input = wrapper.findAll('thead input[type="input"]').at(index)
        input.setValue(value)

        expect(wrapper).toHaveEmitted('updateFilters', {
          ...filters,
          [key]: value
        })
      }
    )
  })
})
