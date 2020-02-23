<template>
  <div class="w-full">
    <file-uploader
      :accept="['text/csv']"
      class="mb-8 border border-dashed border-gray-500"
      @upload="parseFile"
    />

    <div v-if="hasRows" class="flex flex-col">
      <download-json :rows="rows" :name="name" class="self-end mb-4 button" />

      <div>
        <data-table
          class="w-full h-64 mb-6"
          :labels="labels"
          :rows="currentPageRows"
          @updateRow="updateRow"
        />

        <pagination-controls
          v-if="pageCount > 1"
          class="justify-center"
          :current-page="currentPage"
          :page-count="pageCount"
          @pageChange="setPage"
        />
      </div>

      <data-visualizer :rows="rows" :name="name" />
    </div>
    <div
      v-else
      class="flex justify-center text-gray-700 text-4xl text-center leading-tight h-auto items-center mt-48"
    >
      Select a .csv file <br />to get started
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import FileUploader from '~/components/FileUploader.vue'
import DataTable from '~/components/DataTable.vue'
import DownloadJson from '~/components/DownloadJson.vue'
import PaginationControls from '~/components/PaginationControls.vue'
import DataVisualizer from '~/components/DataVisualizer.vue'

export default {
  layout: 'page',

  components: {
    FileUploader,
    DataTable,
    DownloadJson,
    PaginationControls,
    DataVisualizer
  },

  computed: {
    ...mapState(['currentPage', 'labels', 'rows', 'name']),
    ...mapGetters(['pageCount', 'getRows']),

    currentPageRows() {
      return this.getRows(this.currentPage)
    },

    hasRows() {
      return this.rows.length > 0
    }
  },

  methods: {
    ...mapActions(['parseFile', 'updateRow', 'setPage'])
  }
}
</script>
