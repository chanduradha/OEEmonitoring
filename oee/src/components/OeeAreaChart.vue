<template>
    <div class="parent-container">
      <div class="chart-container" ref="chart"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import * as echarts from 'echarts';
  
  const chart = ref(null);
  const oeeData = ref([90, 85, 85, 80, 90, 85, 87]);
  
  onMounted(() => {
    const myChart = echarts.init(chart.value);
  
    const option = {
      title: {
        text: 'OEE',
        left: 'left',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLabel: {
          formatter: '{value} %',
        },
      },
      series: [
        {
          name: 'OEE',
          type: 'line',
          data: oeeData.value,
          areaStyle: {
            color: 'rgba(50, 205, 50, 0.6)', // Green area
          },
          lineStyle: {
            color: 'rgba(50, 205, 50, 1)', // Green line
          },
          showSymbol: false,
        },
      ],
    };
  
    myChart.setOption(option);
  
    watch(oeeData, (newData) => {
      myChart.setOption({
        series: [
          {
            data: newData,
          },
        ],
      });
    });
  });
  </script>
  
  <style scoped>
  .parent-container {
    width: 100%; /* Increase parent container width */
    
  }
  
  .chart-container {
    width: 100%; /* Keep chart container width at 100% of its parent */
    height: 320px; /* Ensure height is set */
    margin-bottom: 200px;
  
  }
  </style>
  