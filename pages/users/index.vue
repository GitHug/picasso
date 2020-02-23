<template>
  <div>
    <transition name="fade">
      <user-modal
        v-if="openModal"
        class="-mr-6"
        :user="selectedUser"
        @close="modalClose"
      />
    </transition>

    <div class="flex flex-col">
      <div class="mb-4 flex">
        <user-table
          :users="users"
          :filters="filters"
          class="w-full"
          :selected-user.sync="selectedUser"
          @updateFilters="$store.dispatch('users/applyFilters', $event)"
        />
      </div>
      <div class="w-full">
        <div class="p-4 bg-gray-800 w-full flex justify-center">
          <pagination-controls
            :current-page="currentPage"
            :page-count="pageCount"
            @pageChange="$store.dispatch('users/setPage', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import PaginationControls from '~/components/tables/PaginationControls.vue'
import UserTable from '~/components/users/UserTable.vue'
import UserModal from '~/components/users/UserModal.vue'

export default {
  layout: 'page',

  components: {
    UserTable,
    PaginationControls,
    UserModal
  },

  fetch({ store }) {
    return store.dispatch('users/fetchUsers')
  },

  data() {
    return {
      selectedUser: undefined,
      openModal: false
    }
  },

  computed: {
    ...mapState('users', ['currentPage', 'filters']),
    ...mapGetters('users', ['getUsers', 'pageCount']),

    users() {
      return this.getUsers(this.currentPage)
    }
  },
  watch: {
    selectedUser(user) {
      if (user) {
        this.openModal = true
      }
    }
  },

  methods: {
    modalClose() {
      this.openModal = false
      this.selectedUser = undefined
    }
  }
}
</script>

<style scoped></style>
