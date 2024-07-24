<template>
  <div>
    <!-- <p>Welcome to the Daily Page!</p> -->

    <div class="charts-row">
      <!-- OEE Chart -->
      <div class="chart-container">
        <div class="chart" ref="oeeChartRef"></div>
      </div>

      <!-- Performance Chart -->
      <div class="chart-container">
        <div class="chart" ref="performanceChartRef"></div>
      </div>

      <!-- Quality Chart -->
      <div class="chart-container">
        <div class="chart" ref="qualityChartRef"></div>
      </div>

      <!-- Availability Chart -->
      <div class="chart-container">
        <div class="chart" ref="availabilityChartRef"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const oeeChartRef = ref(null);
const performanceChartRef = ref(null);
const qualityChartRef = ref(null);
const availabilityChartRef = ref(null);

onMounted(() => {
  // Initialize OEE Chart
  if (oeeChartRef.value) {
    const oeeChart = echarts.init(oeeChartRef.value);
    const oeeOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'OEE',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          startAngle: 180,
          endAngle: 360,
          data: [
            { value: 80, name: 'Availability' },
            { value: 90, name: 'Performance' },
            { value: 95, name: 'Quality' }
          ]
        }
      ]
    };
    oeeChart.setOption(oeeOption);xc 
  } else {
    console.error('OEE Chart DOM element not found.');
  }

  // Initialize Performance Chart
  if (performanceChartRef.value) {
    const performanceChart = echarts.init(performanceChartRef.value);
    const performanceOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Performance',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          startAngle: 180,
          endAngle: 360,
          data: [
            { value: 85, name: 'Performance' },
            { value: 15, name: 'Other Metrics' }
          ]
        }
      ]
    };
    performanceChart.setOption(performanceOption);
  } else {
    console.error('Performance Chart DOM element not found.');
  }

  // Initialize Quality Chart
  if (qualityChartRef.value) {
    const qualityChart = echarts.init(qualityChartRef.value);
    const qualityOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Quality',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          startAngle: 180,
          endAngle: 360,
          data: [
            { value: 92, name: 'Quality' },
            { value: 8, name: 'Defects' }
          ]
        }
      ]
    };
    qualityChart.setOption(qualityOption);
  } else {
    console.error('Quality Chart DOM element not found.');
  }

  // Initialize Availability Chart
  if (availabilityChartRef.value) {
    const availabilityChart = echarts.init(availabilityChartRef.value);
    const availabilityOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Availability',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          startAngle: 180,
          endAngle: 360,
          data: [
            { value: 88, name: 'Availability' },
            { value: 12, name: 'Downtime' }
          ]
        }
      ]
    };
    availabilityChart.setOption(availabilityOption);
  } else {
    console.error('Availability Chart DOM element not found.');
  }
});
</script>

<style scoped>
.charts-row {
  display: flex;
  justify-content: space-between;
}

.chart-container {
  flex: 1;
  height: 300px; /* Adjusted height */
  margin-right: 20px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
