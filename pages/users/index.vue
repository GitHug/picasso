<template>
  <div class="flex flex-col h-screen">
    <div class="overflow-auto mb-24">
      <user-table
        :users="users"
        :filters="filters"
        @updateFilters="$store.dispatch('users/applyFilters', $event)"
      />
    </div>
    <div class="flex justify-center">
      <div class="fixed bottom-0 items-center p-4">
        <pagination-controls
          :current-page="currentPage"
          :page-count="pageCount"
          class=""
          @pageChange="$store.dispatch('users/setPage', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import UserTable from '~/components/UserTable.vue'
import PaginationControls from '~/components/PaginationControls.vue'

export default {
  layout: 'page',

  components: {
    UserTable,
    PaginationControls
  },

  fetch({ store }) {
    return store.dispatch('users/fetchUsers')
  },
  computed: {
    ...mapState('users', ['currentPage', 'filters']),
    ...mapGetters('users', ['getUsers', 'pageCount']),

    users() {
      return this.getUsers(this.currentPage)
    }
  }
}
</script>

<style></style>
