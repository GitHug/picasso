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
        containerClass: 'flex justify-evenly',
        pageClass: 'page',
        pageLinkClass: 'page-link',
        activeClass: 'active',
        nextClass: 'page',
        nextLinkClass: 'page-link',
        prevClass: 'page',
        prevLinkClass: 'page-link'
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
  @apply flex-1 bg-white border border-orange-300 text-center px-2;
  flex: 1 1 0px;
}

/deep/ .page:hover:not(.active-class) {
  @apply bg-orange-500;
}

/deep/ .page-link {
  @apply flex-1 justify-center;
}

/deep/ .active {
  @apply bg-orange-700 text-white cursor-default outline-none;
}

/deep/ .active .page-link-class {
  @apply cursor-default;
}
</style>
