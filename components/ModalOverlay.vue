<template>
  <div
    ref="overlay"
    class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center"
    tabindex="0"
    @keydown.esc="close"
  >
    <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div
      class="bg-gray-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <button
        class="absolute top-0 right-0 flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
        @click="close"
      >
        <close-icon class="text-gray-100" />
        <span class="text-sm">(Esc)</span>
      </button>

      <div class="py-4 text-left px-6">
        <div class="flex justify-between items-center pb-3">
          <h2 class="text-2xl font-bold">
            <slot name="title" />
          </h2>
          <button class="cursor-pointer z-50" @click="close">
            <close-icon class="text-gray-100" />
          </button>
        </div>

        <slot name="content" />

        <div class="flex justify-end pt-2">
          <button class="button" title="close" @click="close">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '~/components/CloseIcon.vue'

export default {
  components: {
    CloseIcon
  },
  props: {
    showOverlay: {
      type: Boolean,
      default: false
    }
  },

  mounted() {
    this.$refs.overlay.focus()
  },

  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal {
  transition: opacity 0.25s ease;
}
</style>
