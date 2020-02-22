<template>
  <div class="w-full">
    <file-uploader :accept="['text/csv']" class="mb-2" @upload="parseFile" />

    <div>
      <download-json :rows="rows" :name="name" />

      <div class="border border-gray-700">
        <data-table
          class="w-full h-64"
          :labels="labels"
          :rows="currentPageRows"
          @updateRow="updateRow"
        />

        <pagination-controls
          class="border-t border-gray-700"
          :current-page="currentPage"
          :page-count="pageCount"
          @pageChange="setPage"
        />
      </div>

      <data-visualizer :rows="rows" :labels="labels" />
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
    }
  },

  methods: {
    ...mapActions(['parseFile', 'updateRow', 'setPage'])
  }
}
</script>
