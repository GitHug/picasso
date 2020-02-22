import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import DashboardIndexPage from '~/pages/dashboard/index.vue'
import FileUploader from '~/components/FileUploader.vue'
import * as rootStore from '~/store'
import DownloadJson from '~/components/DownloadJson.vue'
import DataTable from '~/components/DataTable.vue'
import PaginationControls from '~/components/PaginationControls.vue'
import DataVisualizer from '~/components/DataVisualizer.vue'

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

    test('the FileUploader should accept files of type text/csv', () => {
      expect(wrapper.find(FileUploader).props('accept')).toEqual(['text/csv'])
    })

    test('the parseFile action should have been dispatched when the FileUploader emits upload', () => {
      store.dispatch = jest.fn()
      const file = {}

      wrapper.find(FileUploader).vm.$emit('upload', file)
      expect(store.dispatch).toHaveBeenCalledWith('parseFile', file)
    })

    it('should render a DownloadJson component', () => {
      expect(wrapper.find(DownloadJson).exists()).toBeTruthy()
    })

    test('DownloadJson should have been provided rows and name', async () => {
      const rows = [{ row: 1 }, { row: 2 }]
      const name = 'file name'

      store.commit('SET_NAME', name)
      store.commit('SET_ROWS', rows)

      await wrapper.vm.$nextTick()

      expect(wrapper.find(DownloadJson).props()).toEqual({
        rows,
        name
      })
    })

    it('should render a DataTable component', () => {
      expect(wrapper.find(DataTable).exists()).toBeTruthy()
    })

    test('DataTable should be provided with labels and paginated rows', async () => {
      const labels = ['label1', 'label2']
      store.state.perPage = 2
      const rows = [{ row: 1 }, { row: 2 }, { row: 3 }]

      store.commit('SET_LABELS', labels)
      store.commit('SET_ROWS', rows)
      store.commit('SET_PAGE', 2)
      await wrapper.vm.$nextTick()

      expect(wrapper.find(DataTable).props('rows')).toEqual([rows[2]])
      expect(wrapper.find(DataTable).props('labels')).toEqual(labels)
    })

    it('should dispatch the updateRow action when the DataTable emits updateRow', () => {
      store.dispatch = jest.fn()
      const payload = {}

      wrapper.find(DataTable).vm.$emit('updateRow', payload)
      expect(store.dispatch).toHaveBeenCalledWith('updateRow', payload)
    })

    it('should render a PaginationControls component', () => {
      expect(wrapper.find(PaginationControls).exists()).toBeTruthy()
    })

    test('PaginationControls should be provided with current page and page count', async () => {
      store.state.perPage = 1
      store.commit('SET_PAGE', 42)
      store.commit('SET_ROWS', [{}, {}, {}])

      await wrapper.vm.$nextTick()

      expect(wrapper.find(PaginationControls).props('currentPage')).toBe(42)
      expect(wrapper.find(PaginationControls).props('pageCount')).toBe(3)
    })

    it('should dispatch the setPage action when PaginationControls emits pagChange', () => {
      store.dispatch = jest.fn()
      wrapper.find(PaginationControls).vm.$emit('pageChange', 19)

      expect(store.dispatch).toHaveBeenCalledWith('setPage', 19)
    })

    it('should render a DataVisualizer component', () => {
      expect(wrapper.find(DataVisualizer).exists()).toBeTruthy()
    })

    test('DataVisualizer should be provided rows', async () => {
      const rows = [{ row: 1 }, { row: 2 }]
      store.commit('SET_ROWS', rows)

      await wrapper.vm.$nextTick()

      expect(wrapper.find(DataVisualizer).props('rows')).toEqual(rows)
    })
  })
})
