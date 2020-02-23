<template>
  <table>
    <thead>
      <tr>
        <th>
          <input
            type="input"
            placeholder="Name"
            @input="updateFilters({ name: $event.target.value || '' })"
          />
        </th>
        <th class="w-1/6">
          <input
            type="input"
            placeholder="Gender"
            @input="updateFilters({ gender: $event.target.value || '' })"
          />
        </th>
        <th class="w-1/6">
          <input
            type="input"
            placeholder="Eye color"
            @input="updateFilters({ eyeColor: $event.target.value || '' })"
          />
        </th>
        <th class="w-1/6">
          <input
            type="input"
            placeholder="Age"
            @input="updateFilters({ age: $event.target.value || '' })"
          />
        </th>
      </tr>
      <tr>
        <th>
          Name
        </th>
        <th>
          Gender
        </th>
        <th>
          EyeColor
        </th>
        <th>
          Age
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id" class="capitalize">
        <td>
          {{ user.name }}
        </td>
        <td>
          {{ user.gender }}
        </td>
        <td>
          {{ user.eyeColor }}
        </td>
        <td>
          {{ user.age }}
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
        name: '',
        gender: '',
        eyeColor: '',
        age: ''
      })
    }
  },

  methods: {
    updateFilters({
      name = this.filters.name,
      gender = this.filters.gender,
      eyeColor = this.filters.eyeColor,
      age = this.filters.age
    }) {
      this.$emit('updateFilters', { name, gender, eyeColor, age })
    }
  }
}
</script>
