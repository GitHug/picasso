<template>
  <div>
    <div class="flex">
      <button
        type="button"
        title="Bar Chart"
        class="border border-orange-600 py-1 px-3"
        :class="{ 'bg-orange-700': type === 'ColumnChart' }"
        @click="type = 'ColumnChart'"
      >
        Bar Chart
      </button>

      <button
        type="button"
        title="Pie Chart"
        class="border border-orange-600 py-1 px-3"
        :class="{ 'bg-orange-700': type === 'PieChart' }"
        @click="type = 'PieChart'"
      >
        Pie Chart
      </button>
    </div>

    <GChart
      v-if="type === 'ColumnChart'"
      type="ColumnChart"
      :data="chartData"
      :options="chartOptions"
    />
    <GChart v-else type="PieChart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
  components: {
    GChart
  },

  props: {
    rows: {
      type: Array,
      default: () => []
    },
    labels: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      type: 'ColumnChart',
      chartOptions: {}
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
    }
  }
}
</script>

<style></style>
