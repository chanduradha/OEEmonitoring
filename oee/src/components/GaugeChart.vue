<template>
    <div class="gauge-chart">
      <h3>{{ title }}</h3>
      <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  
  const props = defineProps({
    title: String,
    data: Number
  });
  
  const chartRef = ref(null);
  let chartInstance = null;
  
  onMounted(() => {
    renderChart();
  });
  
  watch(() => props.data, (newData) => {
    if (chartInstance) {
      updateChart(newData);
    }
  });
  
  function renderChart() {
    if (chartRef.value && props.data !== undefined) {
      const ctx = chartRef.value.getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Value'],
          datasets: [
            {
              label: props.title,
              data: [props.data, 100 - props.data],
              backgroundColor: ['rgba(255, 99, 132, 0.2)', '#f3f3f3'],
              borderColor: ['rgba(255, 99, 132, 1)', '#f3f3f3'],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            animateRotate: true,
            animateScale: true
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
  }
  
  function updateChart(newData) {
    if (chartInstance) {
      chartInstance.data.datasets[0].data = [newData, 100 - newData];
      chartInstance.update();
    }
  }
  </script>
  
  <style scoped>
  .gauge-chart {
    border: 1px solid #ccc;
   
    margin-bottom: 20px;
    
  
  }
  
  .chart-container {
    width: 100%;
    height: 200px;
  }
  </style>
  