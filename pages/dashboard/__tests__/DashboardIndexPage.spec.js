import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import DashboardIndexPage from '~/pages/dashboard/index.vue'
import FileUploader from '~/components/FileUploader.vue'
import * as rootStore from '~/store'
import DownloadJson from '~/components/DownloadJson.vue'
import DataTable from '~/components/DataTable.vue'
import PaginationControls from '~/components/PaginationControls.vue'

describe('DashboardIndexPage', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  it('should mount', () => {
    expect(() =>
      mount(DashboardIndexPage, {
        localVue,
        store: new Vuex.Store({ ...rootStore })
      })
    ).not.toThrow()
  })

  describe('when mounted', () => {
    let store, wrapper
    beforeEach(() => {
      store = new Vuex.Store({ ...rootStore })
      wrapper = mount(DashboardIndexPage, {
        localVue,
        store
      })
    })

    it('should render a FileUploader component', () => {
      expect(wrapper.find(FileUploader).exists()).toBeTruthy()
    })

    it('should render a DownloadJson component', () => {
      expect(wrapper.find(DownloadJson).exists()).toBeTruthy()
    })

    it('should render a DownloadJson component', () => {
      expect(wrapper.find(DownloadJson).exists()).toBeTruthy()
    })

    it('should render a DataTable component', () => {
      expect(wrapper.find(DataTable).exists()).toBeTruthy()
    })

    it('should render a DataTable component', () => {
      expect(wrapper.find(DataTable).exists()).toBeTruthy()
    })

    it('should render a PaginationControls component', () => {
      expect(wrapper.find(PaginationControls).exists()).toBeTruthy()
    })
  })
})
