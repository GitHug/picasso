<template>
  <div class="overflow-scroll">
    <table class="w-full">
      <thead>
        <tr>
          <th v-for="(label, index) in labels" :key="`${label}-${index}`">
            {{ label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="[key, value] in Object.entries(row)" :key="key">
            <input
              type="input"
              :value="value"
              @input="updateRow({ row, key, value: $event.target.value })"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DataTable',

  props: {
    labels: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    updateRow({ row, key, value }) {
      this.$emit('updateRow', { row, key, value })
    }
  }
}
</script>
