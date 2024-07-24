<template>
    <div ref="pieChart" style="width: 100%; height: 400px;position:relative;left:100px;"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import * as echarts from 'echarts';
  
  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  });
  
  const pieChart = ref(null);
  let chartInstance = null;
  
  onMounted(() => {
    chartInstance = echarts.init(pieChart.value);
    updateChart();
  });
  
  watch(() => props.data, () => {
    updateChart();
  }, { deep: true });
  
  const updateChart = () => {
    if (chartInstance && props.data) {
      const option = {
        title: {
          text: 'Machine State Distribution',
          right: 'center',
      
          
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'State',
            type: 'pie',
            radius: '50%',
            data: [
              { value: props.data.runtime, name: 'Runtime' },
              { value: props.data.idletime, name: 'Idle Time' },
              { value: props.data.offtime, name: 'Off Time' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      chartInstance.setOption(option);
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styling if needed */
  </style>
  