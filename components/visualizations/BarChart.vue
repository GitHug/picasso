<template>
  <g-chart
    :settings="{ packages: ['bar'] }"
    :data="chartData"
    :options="chartOptions"
    :create-chart="(el, google) => new google.charts.Bar(el)"
    @ready="onChartReady"
  />
</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
  components: {
    GChart
  },

  props: {
    chartData: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      chartsLib: null
    }
  },

  computed: {
    chartOptions() {
      if (!this.chartsLib) return null
      return this.chartsLib.charts.Bar.convertOptions({
        chart: {
          title: this.name
        },
        bars: 'vertical',
        hAxis: {
          format: 'decimal',
          textStyle: { color: this.$tw.colors.gray[100] }
        },
        vAxis: {
          format: 'decimal',
          textStyle: { color: this.$tw.colors.gray[100] }
        },
        height: 400,
        backgroundColor: {
          fill: this.$tw.colors.gray[800]
        },
        colors: [
          this.$tw.colors.teal[400],
          this.$tw.colors.orange[400],
          this.$tw.colors.green[400]
        ]
      })
    }
  },

  methods: {
    onChartReady(chart, google) {
      this.chartsLib = google
    }
  }
}
</script>
