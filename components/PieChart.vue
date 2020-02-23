<template>
  <g-chart type="PieChart" :data="chartData" :options="chartOptions" />
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
      return {
        chart: {
          title: this.name
        },
        height: 400,
        backgroundColor: {
          fill: this.$tw.colors.gray[800]
        },
        legend: {
          textStyle: {
            color: this.$tw.colors.gray[100]
          }
        },
        colors: [
          this.$tw.colors.teal[400],
          this.$tw.colors.blue[400],
          this.$tw.colors.indigo[400],
          this.$tw.colors.purple[400],
          this.$tw.colors.pink[400],
          this.$tw.colors.green[400],
          this.$tw.colors.yellow[400],
          this.$tw.colors.orange[400],
          this.$tw.colors.red[400],
          this.$tw.colors.gray[400],
          this.$tw.colors.black
        ]
      }
    }
  }
}
</script>

<style></style>
