import { mount } from '@vue/test-utils'
import FileUploader, { IDLE, DRAGGING } from '~/components/FileUploader.vue'

describe('FileUploader', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(FileUploader, {
      attachToDocument: true,
      propsData: {
        accept: ['application/json', 'text/csv']
      }
    })
  })

  it(`should start in the ${IDLE} state`, () => {
    expect(wrapper.vm.state).toBe(IDLE)
  })

  it(`should transition to the ${DRAGGING} state when it triggers dragenter`, () => {
    wrapper.find('div').trigger('dragenter')
    expect(wrapper.vm.state).toBe(DRAGGING)
  })

  it(`should transition to the ${IDLE} state when it triggers dragleave`, () => {
    wrapper.find('div').trigger('dragenter')
    wrapper.find('div').trigger('dragleave')
    expect(wrapper.vm.state).toBe(IDLE)
  })

  it('should only accept the file types specified in the accept prop', async () => {
    expect(wrapper.find('input[type="file"]').attributes('accept')).toBe(
      'application/json,text/csv'
    )
    wrapper.setProps({
      accept: ['foo', 'bar', 'baz']
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('input[type="file"]').attributes('accept')).toBe(
      'foo,bar,baz'
    )
  })

  it('should only accept the file types specified in the accept prop when dropping a file in the file area', () => {
    const fileArea = wrapper.find('div')

    const file = {
      type: 'application/pdf'
    }

    wrapper.find('div').trigger('dragenter')
    fileArea.trigger('drop', {
      dataTransfer: {
        files: [file]
      }
    })

    expect(wrapper).not.toHaveEmitted('upload', expect.anything())
  })

  it('should emit the file when a valid file is dropped in the file area', () => {
    wrapper.setProps({
      accept: ['text/csv']
    })

    const fileArea = wrapper.find('div')

    const file = {
      type: 'text/csv'
    }

    wrapper.find('div').trigger('dragenter')
    fileArea.trigger('drop', {
      dataTransfer: {
        files: [file]
      }
    })

    expect(wrapper).toHaveEmitted('upload', file)
  })

  it('should emit the first file when multiple files are dropped in the file area', () => {
    wrapper.setProps({
      accept: ['text/csv', 'application/json']
    })

    const fileArea = wrapper.find('div')

    const file1 = {
      type: 'application/json'
    }

    const file2 = {
      type: 'text/csv'
    }

    wrapper.find('div').trigger('dragenter')
    fileArea.trigger('drop', {
      dataTransfer: {
        files: [file1, file2]
      }
    })

    expect(wrapper).toHaveEmitted('upload', file1)
  })

  it('should not emit a file if the first file is invalid', () => {
    wrapper.setProps({
      accept: ['text/csv']
    })

    const fileArea = wrapper.find('div')

    const file1 = {
      type: 'application/pdf'
    }

    const file2 = {
      type: 'text/csv'
    }

    wrapper.find('div').trigger('dragenter')
    fileArea.trigger('drop', {
      dataTransfer: {
        files: [file1, file2]
      }
    })

    expect(wrapper).not.toHaveEmitted('upload', file1)
  })

  it('should emit a file selected from the file input', () => {
    const file = {
      type: 'application/json'
    }

    const fileInput = wrapper.find('input[type="file"]')

    const get = () => [file]

    Object.defineProperty(fileInput.element, 'files', {
      get
    })

    fileInput.setValue('')
    expect(wrapper).toHaveEmitted('upload', file)
  })
})
