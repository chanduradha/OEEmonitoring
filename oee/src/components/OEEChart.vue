<template>
    <div class="parent-container">
      <div class="chart-container" ref="chart"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, onUnmounted } from 'vue';
  import * as echarts from 'echarts';
  
  const chart = ref(null);
  const runtimeData = ref([100, 0, 90, 0, 80, 0, 70, 0, 60, 0, 50, 0]);
  const offTimeData = ref([0, 20, 0, 30, 0, 40, 0, 50, 0, 60, 0, 70]);
  
  // Initialize chart on mount
  onMounted(() => {
    const myChart = echarts.init(chart.value);
  
    const updateChart = () => {
      const option = {
        title: {
          text: 'Runtime and Off Time',
          left: 'center', // Center the title horizontally
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 120,
          axisLabel: {
            formatter: '{value} %',
          },
        },
        series: [
          {
            name: 'Runtime',
            type: 'line',
            data: runtimeData.value,
            areaStyle: {
              color: 'rgba(30, 144, 255, 0.6)', // Blue area
            },
            lineStyle: {
              color: 'rgba(30, 144, 255, 1)', // Blue line
            },
            showSymbol: false,
          },
          {
            name: 'Off Time',
            type: 'line',
            data: offTimeData.value,
            lineStyle: {
              color: 'rgba(220, 20, 60, 1)', // Red line
            },
            showSymbol: false,
          },
        ],
      };
  
      // Set chart option
      myChart.setOption(option);
    };
  
    // Update chart on window resize
    const resizeHandler = () => {
      myChart.resize();
    };
  
    // Initialize chart and resize handler
    updateChart();
    window.addEventListener('resize', resizeHandler);
  
    // Cleanup resize handler on component unmount
    onUnmounted(() => {
      window.removeEventListener('resize', resizeHandler);
    });
  
    // Watch for changes in runtimeData and offTimeData
    watch([runtimeData, offTimeData], ([newRuntimeData, newOffTimeData]) => {
      myChart.setOption({
        series: [
          { name: 'Runtime', data: newRuntimeData },
          { name: 'Off Time', data: newOffTimeData },
        ],
      });
    });
  });
  </script>
  
  <style scoped>
  .parent-container {
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    display: flex;
    justify-content: start; /* Center horizontally */
    align-items: center; /* Center vertically */
  
  }
  
  .chart-container {
    width: 100%; /* Adjust width as needed */
    height: 300px; /* Adjust initial height as needed */


  }
  </style>
  