<template>
  <button
    type="button"
    class="bg-orange-400 border border-orange-800 p-px rounded-sm"
    @click="download"
  >
    Download JSON
  </button>
</template>

<script>
import { saveAs } from 'file-saver'

export default {
  name: 'DownloadJson',

  props: {
    rows: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: 'data'
    }
  },

  methods: {
    download() {
      const rows = this.rows

      const blob = this.createBlob(rows)
      saveAs(blob, `${this.name}.json`)
    },

    createBlob(rows) {
      return new Blob([this.stringify(rows)], {
        type: 'application/json;charset=utf-8'
      })
    },

    stringify(rows) {
      return JSON.stringify({ rows }, null, 2)
    }
  }
}
</script>
