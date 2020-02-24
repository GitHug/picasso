<template>
  <div id="map-wrap">
    <client-only>
      <l-map :zoom="4" :center="[latitude, longitude]">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          :attribution="attribution"
        />
        <l-marker :lat-lng="[latitude, longitude]" />
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  }
}
</script>
