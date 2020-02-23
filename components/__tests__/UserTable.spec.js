import { mount } from '@vue/test-utils'
import UserTable from '~/components/UserTable'

describe('UserTable', () => {
  const user1 = {
    _id: '5d5d7ad6b0e83bc2d9d67dfb',
    age: 28,
    eyeColor: 'brown',
    name: 'Stephens Townsend',
    gender: 'male'
  }

  const user2 = {
    _id: '5d5d7ad67879dec8b9286d51',
    age: 27,
    eyeColor: 'blue',
    name: 'Aida Mccarty',
    gender: 'female'
  }

  let wrapper
  beforeEach(() => {
    wrapper = mount(UserTable, {
      propsData: {
        users: [user1, user2]
      }
    })
  })

  it('should render users', () => {
    expect(wrapper.findAll('tbody tr')).toHaveLength(2)

    const query = ({ row, column }) =>
      wrapper
        .findAll('tbody tr')
        .at(row)
        .findAll('td')
        .at(column)
        .text()

    expect(query({ row: 0, column: 0 })).toBe(user1.name)
    expect(query({ row: 0, column: 1 })).toBe(user1.gender)
    expect(query({ row: 0, column: 2 })).toBe(user1.eyeColor)
    expect(query({ row: 0, column: 3 })).toBe(user1.age + '')

    expect(query({ row: 1, column: 0 })).toBe(user2.name)
    expect(query({ row: 1, column: 1 })).toBe(user2.gender)
    expect(query({ row: 1, column: 2 })).toBe(user2.eyeColor)
    expect(query({ row: 1, column: 3 })).toBe(user2.age + '')
  })

  describe('when a filter is updated', () => {
    const filters = {
      name: 'Githug',
      gender: 'male',
      eyeColor: 'blue',
      age: 31
    }

    beforeEach(() => {
      wrapper.setProps({ filters })
    })

    it.each([
      [0, 'name', 'test'],
      [1, 'gender', 'female'],
      [2, 'eyeColor', 'green'],
      [3, 'age', '42']
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

  it('should emit a user when a row is selected', () => {
    wrapper
      .findAll('tbody tr')
      .at(1)
      .trigger('click')
    expect(wrapper).toHaveEmitted('update:selectedUser', user2)
  })

  it('should give a teal background to a selected user', async () => {
    wrapper.setProps({
      selectedUser: user1
    })
    await wrapper.vm.$nextTick()

    expect(
      wrapper
        .findAll('tbody tr')
        .at(0)
        .classes()
    ).toEqual(expect.arrayContaining([expect.stringContaining('teal')]))

    expect(
      wrapper
        .findAll('tbody tr')
        .at(1)
        .classes()
    ).not.toEqual(expect.arrayContaining([expect.stringContaining('teal')]))
  })
})
