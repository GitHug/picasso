import { mount } from '@vue/test-utils'
import DashboardIndexPage from '~/pages/dashboard/index.vue'

describe('DashboardIndexPage', () => {
  it('should mount', () => {
    expect(() => mount(DashboardIndexPage)).not.toThrow()
  })
})
