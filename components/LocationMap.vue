<template>
  <div id="map-wrap">
    <no-ssr>
      <l-map :zoom="4" :center="[latitude, longitude]">
        <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <l-marker :lat-lng="[latitude, longitude]" />
      </l-map>
    </no-ssr>
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
  }
}
</script>
