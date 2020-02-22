import { mount } from '@vue/test-utils'
import { saveAs } from 'file-saver'
import DownloadJson from '~/components/DownloadJson.vue'

jest.mock('file-saver', () => ({
  saveAs: jest.fn()
}))

describe('DownloadJson', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(DownloadJson, {
      propsData: {
        rows: ['row1', 'row2'],
        name: 'file name'
      }
    })
  })

  it('should download a file when clicked', () => {
    wrapper.find('button').trigger('click')
    expect(saveAs).toHaveBeenCalledWith(expect.anything(), 'file name.json')
  })
})
