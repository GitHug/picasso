<template>
  <div class="flex flex-col">
    <div class="mb-24 flex">
      <user-table
        :users="users"
        :filters="filters"
        class="w-full"
        @updateFilters="$store.dispatch('users/applyFilters', $event)"
      />
    </div>
    <div class="w-full">
      <div
        class="fixed bottom-0 p-4 bg-gray-800 mx-auto w-full flex justify-center"
      >
        <pagination-controls
          :current-page="currentPage"
          :page-count="pageCount"
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
