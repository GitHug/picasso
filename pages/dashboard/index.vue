<template>
  <div class="w-full">
    <file-uploader
      :accept="['text/csv']"
      class="mb-2"
      @upload="$store.dispatch('parseFile', $event)"
    />

    <div>
      <download-json />

      <div class="border border-gray-700">
        <data-table class="w-full h-64" :labels="labels" :rows="rows" />

        <pagination-controls
          class="border-t border-gray-700"
          :current-page="currentPage"
          :page-count="pageCount"
          @pageChange="$store.dispatch('setPage', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FileUploader from '~/components/FileUploader.vue'
import DataTable from '~/components/DataTable.vue'
import DownloadJson from '~/components/DownloadJson.vue'
import PaginationControls from '~/components/PaginationControls.vue'

export default {
  layout: 'page',

  components: {
    FileUploader,
    DataTable,
    DownloadJson,
    PaginationControls
  },

  computed: {
    ...mapState(['currentPage', 'labels']),
    ...mapGetters(['pageCount', 'getRows']),

    rows() {
      return this.getRows(this.currentPage)
    }
  }
}
</script>
