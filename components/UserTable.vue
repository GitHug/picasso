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
        contributions: ''
      })
    }
  },

  methods: {
    updateFilters({
      id = this.filters.id,
      login = this.filters.login,
      contributions = this.filters.contributions
    }) {
      this.$emit('updateFilters', { id, login, contributions })
    }
  }
}
</script>
