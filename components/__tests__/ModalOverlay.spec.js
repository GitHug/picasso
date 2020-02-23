import { mount } from '@vue/test-utils'
import ModalOverlay from '~/components/ModalOverlay.vue'
import CloseIcon from '~/components/CloseIcon.vue'

describe('ModalOverlay', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ModalOverlay)
  })

  it('should close when the escape key is clicked', () => {
    wrapper.trigger('keydown.esc')
    expect(wrapper).toHaveEmitted('close')
  })

  it('should close when the close icon is clicked', () => {
    const closeIcons = wrapper.findAll(CloseIcon)
    expect(closeIcons).toHaveLength(2)

    closeIcons.at(0).trigger('click')
    expect(wrapper).toHaveEmitted('close')

    wrapper = mount(ModalOverlay)
    wrapper
      .findAll(CloseIcon)
      .at(1)
      .trigger('click')
    expect(wrapper).toHaveEmitted('close')
  })

  it('should close when the close button is clicked', () => {
    wrapper.find('button[title="close"]').trigger('click')
    expect(wrapper).toHaveEmitted('close')
  })
})
