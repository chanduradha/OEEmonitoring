<template>
  <div class="line-chart">
    <div class="chart" ref="lineChartRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import { useOEEStore } from '@/stores/oeestore';

const lineChartRef = ref(null);
const oeeStore = useOEEStore();

let lineChart;

const updateLineChart = (timeData, metricData) => {
  if (!lineChart) {
    lineChart = echarts.init(lineChartRef.value);
  }

  console.log('Updating chart with data:', { timeData, metricData });

  // Unwrap reactive proxies if necessary
  const unwrappedTimeData = Array.isArray(timeData) ? timeData.slice() : [];
  const unwrappedMetricData = Array.isArray(metricData) ? metricData.slice() : [];

  lineChart.setOption({
    xAxis: {
      type: 'category',
      data: unwrappedTimeData,
    },
    yAxis: {
      type: 'value',
    
    },
    series: [{
      data: unwrappedMetricData,
      type: 'line',
      smooth: true,
    }]
  });

  // Make the chart responsive
  window.addEventListener('resize', () => {
    if (lineChart) {
      lineChart.resize();
    }
  });
};

const updateCharts = () => {
  const { timeData, metricData } = oeeStore.lineChartData;
  console.log('Line chart data:', { timeData, metricData });

  // Check if data is defined before updating the chart
  if (timeData && metricData) {
    updateLineChart(timeData, metricData);
  }
};

onMounted(() => {
  console.log('Component mounted, initializing chart');
  updateCharts(); // Initial chart update
});

watch(() => oeeStore.lineChartData, updateCharts);

// Watch for changes in selectedMetrics and update the chart accordingly
watch(() => oeeStore.selectedMetrics, (newVal) => {
  if (newVal === 'overall') {
    const overallMetrics = oeeStore.calculateOverallMetrics();
    oeeStore.setLineChartData({
      timeData: oeeStore.lineChartData.timeData,
      metricData: {
        quality: Array(oeeStore.lineChartData.timeData.length).fill(overallMetrics.quality),
        availability: Array(oeeStore.lineChartData.timeData.length).fill(overallMetrics.availability),
        performance: Array(oeeStore.lineChartData.timeData.length).fill(overallMetrics.performance),
      }
    });
  } else {
    // Update with machine-specific data
    oeeStore.setSelectedMetrics(newVal);
  }
});
</script>

<style scoped>
.line-chart {
  height: 300px;
  margin: 10px;
  border: 1px solid #ccc;
  background-color: rgb(224, 233, 228);
  width: 100%; /* Adjust width to fit container */
  max-width: 500px; /* Set maximum width */
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
