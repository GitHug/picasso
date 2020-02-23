import { mount } from '@vue/test-utils'
import Paginate from 'vuejs-paginate'
import PaginationControls from '~/components/tables/PaginationControls.vue'

describe('PaginationControls', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(PaginationControls, {
      propsData: {
        pageCount: 5,
        currentPage: 1
      }
    })
  })

  it('should set the value to the currentPage prop', async () => {
    wrapper.setProps({ currentPage: 42 })
    await wrapper.vm.$nextTick()

    expect(wrapper.find(Paginate).props('value')).toBe(42)
  })

  it('should set the page count to the pageCount prop', async () => {
    wrapper.setProps({ pageCount: 19 })
    await wrapper.vm.$nextTick()

    expect(wrapper.find(Paginate).props('pageCount')).toBe(19)
  })

  it('should emit a page change event when the pagination controls are clicked', () => {
    const page3 = wrapper
      .find(Paginate)
      .findAll('.link')
      .at(3)

    expect(page3.text()).toBe('3')

    page3.trigger('click')

    expect(wrapper).toHaveEmitted('pageChange', 3)
  })
})
