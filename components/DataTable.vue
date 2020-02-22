<template>
  <div class="overflow-scroll">
    <table class="text-left w-full border-collapse">
      <thead>
        <tr>
          <th
            v-for="(label, index) in labels"
            :key="`${label}-${index}`"
            class="py-2 px-3 bg-gray-200 font-bold uppercase text-xs border-b border-gray-400 text-gray-700"
          >
            {{ label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index" class="hover:bg-gray-300">
          <td
            v-for="[key, value] in Object.entries(row)"
            :key="key"
            class="py-2 px-3 border-b border-gray-400 text-sm text-gray-800"
          >
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
