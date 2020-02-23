<template>
  <modal-overlay @close="$emit('close')">
    <template v-slot:title>
      {{ user.name }}
    </template>

    <template v-slot:content>
      <div>
        <article class="capitalize mb-2">
          <div class="flex">
            <label
              class="block text-gray-500 font-bold mb-1 md:mb-0 text-left w-1/3 md:w-1/4"
            >
              Gender
            </label>
            <div>
              {{ user.gender }}
            </div>
          </div>
          <div class="flex">
            <label
              class="block text-gray-500 font-bold mb-1 md:mb-0 text-left w-1/3 md:w-1/4"
            >
              Eye Color
            </label>
            <div>
              {{ user.eyeColor }}
            </div>
          </div>
          <div class="flex">
            <label
              class="block text-gray-500 font-bold mb-1 md:mb-0 text-left w-1/3 md:w-1/4"
            >
              Age
            </label>
            <div>
              {{ user.age }}
            </div>
          </div>
          <div class="flex">
            <label
              class="block text-gray-500 font-bold mb-1 md:mb-0 text-left w-1/3 md:w-1/4"
            >
              ❤️ Pet
            </label>
            <div>
              {{ user.preferences.pet }}
            </div>
          </div>
          <div class="flex">
            <label
              class="block text-gray-500 font-bold mb-1 md:mb-0 text-left w-1/3 md:w-1/4"
            >
              ❤️ Fruit
            </label>
            <div>
              {{ user.preferences.fruit }}
            </div>
          </div>
        </article>
        <location-map class="h-64 mb-2" v-bind="user.location" />
      </div>
    </template>
  </modal-overlay>
</template>

<script>
import ModalOverlay from '~/components/ModalOverlay.vue'
import LocationMap from '~/components/LocationMap.vue'

export default {
  components: {
    ModalOverlay,
    LocationMap
  },

  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
