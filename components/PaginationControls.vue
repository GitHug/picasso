<template>
  <paginate
    :page-count="pageCount"
    :value="currentPage"
    :click-handler="onPageChange"
    :prev-text="'Previous'"
    :next-text="'Next'"
    v-bind="styles"
  />
</template>

<script>
import Paginate from 'vuejs-paginate'

export default {
  name: 'PaginationControls',

  components: {
    Paginate
  },

  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pageCount: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      styles: {
        containerClass: 'flex',
        pageClass: 'page',
        pageLinkClass: 'link',
        activeClass: 'active',
        nextClass: 'page',
        nextLinkClass: 'link',
        prevClass: 'page',
        prevLinkClass: 'link'
      }
    }
  },

  computed: {
    showPreviousButton() {
      return this.currentPage > 1
    },

    showNextButton() {
      return this.currentPage < this.lastPage
    }
  },

  methods: {
    onPageChange(page) {
      this.$emit('pageChange', page)
    }
  }
}
</script>

<style scoped>
/deep/ .page {
  @apply mr-2 text-teal-400 border border-teal-400;
}

/deep/ .page.active {
  @apply bg-teal-500 text-white cursor-default;
}

/deep/ .page:not(.disabled) {
  @apply cursor-pointer;
}

/deep/ .link {
  @apply block rounded-sm font-bold py-1 px-2 flex items-center text-sm;
}

/deep/ .link:hover {
  @apply bg-teal-400 text-white;
}

/deep/ .page.disabled {
  @apply text-teal-700 border-teal-700 cursor-default;
}

/deep/ .page.disabled .link:hover {
  @apply text-teal-700 border-teal-700 bg-gray-800;
}
</style>
