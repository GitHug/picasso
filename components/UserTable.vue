<template>
  <table>
    <thead>
      <tr>
        <th>
          <input
            type="input"
            placeholder="Filter id"
            @input="updateFilters({ id: $event.target.value || '' })"
          />
        </th>
        <th>
          <input
            type="input"
            placeholder="Filter username"
            @input="updateFilters({ login: $event.target.value || '' })"
          />
        </th>
        <th>
          <input
            type="input"
            placeholder="Filter url"
            @input="updateFilters({ url: $event.target.value || '' })"
          />
        </th>
        <th>
          <input
            type="input"
            placeholder="Filter contributions"
            @input="updateFilters({ contributions: $event.target.value || '' })"
          />
        </th>
      </tr>
      <tr>
        <th>
          id
        </th>
        <th>
          username
        </th>
        <th>
          url
        </th>
        <th>
          contribution
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>
          {{ user.id }}
        </td>
        <td>
          {{ user.login }}
        </td>
        <td>
          {{ user.url }}
        </td>
        <td>
          {{ user.contributions }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Object,
      default: () => ({
        id: '',
        login: '',
        url: '',
        contributions: ''
      })
    }
  },

  methods: {
    updateFilters({
      id = this.filters.id,
      login = this.filters.login,
      url = this.filters.url,
      contributions = this.filters.contributions
    }) {
      this.$emit('updateFilters', { id, login, url, contributions })
    }
  }
}
</script>

<style scoped>
th {
  @apply py-2 px-3 bg-gray-200 font-bold uppercase text-xs border-b border-gray-400 text-gray-700 text-left;
}

th input {
  @apply w-full;
}

td {
  @apply py-2 px-3 border-b border-gray-400 text-sm text-gray-800;
}
</style>
