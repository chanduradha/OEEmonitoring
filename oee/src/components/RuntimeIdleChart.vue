<template>
    <div class="runtime-off-time-chart">
      <div ref="chartContainer" style="width: 100%; height: 280px;"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Highcharts from 'highcharts';
  
  const chartContainer = ref(null);
  
  const chartOptions = {
    chart: {
      type: 'bar',
      zoomType: 'xy' // Enable zooming on both axes
    },
    title: {
      text: 'Runtime vs Off Time'
    },
    xAxis: {
      categories: ['Machine 1'] // Replace with your machine names or identifiers
    },
    yAxis: {
      title: {
        text: 'Time (minutes)'
      }
    },
    plotOptions: {
      bar: {
        stacking: 'normal' // Stack bars horizontally
      }
    },
    series: [{
      name: 'Runtime cycle1',
      data: [{
        y: 400,
        color: '#228B22' // Green color for Runtime cycle1
      }]
    }, {
      name: 'Off Time cycle1',
      data: [{
        y: 100,
        color: '#FF0000' // Red color for Off Time cycle1
      }]
    }, {
      name: 'Runtime cycle2',
      data: [{
        y: 300,
        color: '#228B22' // Green color for Runtime cycle2
      }]
    }, {
      name: 'Off Time cycle2',
      data: [{
        y: 200,
        color: '#FF0000' // Red color for Off Time cycle2
      }]
    }]
  };
  
  onMounted(() => {
    if (chartContainer.value) {
      Highcharts.chart(chartContainer.value, chartOptions);
    }
  });
  </script>
  
  <style scoped>
  .runtime-off-time-chart {
    width: 500px; /* Utilize full width of the container */
    
  }

  </style>
  