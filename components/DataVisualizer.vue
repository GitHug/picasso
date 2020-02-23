<template>
  <div style="min-height: 500px;">
    <div class="flex mb-4">
      <button
        type="button"
        title="Bar Chart"
        class="button"
        :class="{ 'button--active': chart === BAR }"
        @click="chart = BAR"
      >
        Bar Chart
      </button>

      <button
        type="button"
        title="Pie Chart"
        class="button"
        :class="{ 'button--active': chart === PIE }"
        @click="chart = PIE"
      >
        Pie Chart
      </button>
    </div>

    <keep-alive>
      <transition name="fade" mode="out-in">
        <bar-chart v-if="chart === BAR" :chart-data="chartData" :name="name" />
        <pie-chart v-else :chart-data="chartData" :name="name" />
      </transition>
    </keep-alive>
  </div>
</template>

<script>
import BarChart from '~/components/BarChart.vue'
import PieChart from '~/components/PieChart.vue'

export const { BAR, PIE } = {
  BAR: 'bar',
  PIE: 'pie'
}

export default {
  components: {
    BarChart,
    PieChart
  },

  props: {
    rows: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: 'Data'
    }
  },

  data() {
    return {
      chart: BAR
    }
  },

  computed: {
    chartData() {
      const firstRow = this.rows[0] || {}

      let firstLabel = this.getFirstNonNumericColumnLabel(firstRow)
      firstLabel = firstLabel || Object.keys(firstRow)[0]

      if (!firstLabel) return []

      const numericLabels = this.getNumericColumnLabels(firstRow, firstLabel)

      const chartData = [[firstLabel, ...numericLabels]]
      this.rows.forEach((row) => {
        const data = [row[firstLabel]]

        numericLabels.forEach((label) => {
          data.push(Number.isNaN(+row[label]) ? 0 : +row[label])
        })

        chartData.push(data)
      })
      return chartData
    }
  },

  created() {
    Object.assign(this, { BAR, PIE })
  },

  methods: {
    isNumber(value) {
      return !isNaN(value)
    },

    getFirstNonNumericColumnLabel(firstRow) {
      const [label] =
        Object.entries(firstRow).find(
          ([key, value]) => typeof value === 'string' && !this.isNumber(value)
        ) || []

      return label
    },

    getNumericColumnLabels(firstRow, firstLabel) {
      return Object.entries(firstRow)
        .filter(([key, value]) => key !== firstLabel && this.isNumber(value))
        .map(([key, value]) => key)
    },

    onChartReady(chart, google) {
      this.chartsLib = google
    }
  }
}
</script>

<style></style>
