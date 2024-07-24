<template>
  <div class="metrics-page">
    <!-- Controls row -->
    <div class="controls-row">
      <!-- Machine selection -->
      <div class="control">
        <label for="machineSelect">Select Machine:</label>
        <select id="machineSelect" v-model="selectedMachine" @change="updateMetrics" class="styled-select">
          <option value="overall">Overall Metrics</option>
          <option v-for="machine in Object.keys(store.machines)" :key="machine" :value="machine">{{ machine }}</option>
        </select>
      </div>

      <!-- Date selection -->
      <div class="control">
        <label for="dateSelect">Select Date:</label>
        <input type="date" id="dateSelect" v-model="selectedDate" @change="updateMetrics" class="styled-select" />
      </div>

      <!-- Shift selection -->
      <div class="control" v-if="selectedMachine !== 'overall'">
        <label for="shiftSelect">Select Shift:</label>
        <select id="shiftSelect" v-model="selectedShift" @change="updateMetrics" class="styled-select">
          <option v-for="shift in Object.keys(store.machines[selectedMachine]?.shifts)" :key="shift" :value="shift">{{ shift }}</option>
        </select>
      </div>
    </div>

    <!-- Metrics and chart display row -->
    <div class="metrics-chart-row">
      <!-- Metrics display -->
      <div class="metrics-container">
        <div class="metrics-box">
          <div class="metric" :class="getMetricClass('availability')">
            <h3>Availability</h3>
            <div class="metric-value">{{ metricsData.availability }}%</div>
          </div>
          <div class="metric" :class="getMetricClass('performance')">
            <h3>Performance</h3>
            <div class="metric-value">{{ metricsData.performance }}%</div>
          </div>
          <div class="metric" :class="getMetricClass('quality')">
            <h3>Quality</h3>
            <div class="metric-value">{{ metricsData.quality }}%</div>
          </div>
          <div class="metric" :class="getMetricClass('oee')">
            <h3>OEE</h3>
            <div class="metric-value">{{ metricsData.oee }}%</div>
          </div>
          <div class="metric" :class="getMetricClass('runtime')">
            <h3>Runtime</h3>
            <div class="metric-value">{{ metricsData.runtime }} hrs</div>
          </div>
          <div class="metric" :class="getMetricClass('idletime')">
            <h3>Idle Time</h3>
            <div class="metric-value">{{ metricsData.idletime }} hrs</div>
          </div>
          <div class="metric" :class="getMetricClass('offtime')">
            <h3>Off Time</h3>
            <div class="metric-value">{{ metricsData.offtime }} hrs</div>
          </div>
          <div class="metric" :class="getMetricClass('badparts')">
            <h3>Bad Parts</h3>
            <div class="metric-value">{{ metricsData.badparts }}</div>
          </div>
          
        </div>
                <!-- Chart display -->
      <div class="chart-container">
        <PieChart :data="metricsData"></PieChart>
      </div>
      </div>
    
    </div>
    <RuntimeIdleChart />

    <!-- Additional charts row -->
    <div class="additional-charts-row">
      <div class="chart-container">
        <OeeAreaChart />
      </div>
      <div class="chart-container">
        <OEEChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAnalyticsStore } from '@/stores/Analyticstore';
import PieChart from '@/components/PieChart.vue';
import RuntimeIdleChart from './RuntimeIdleChart.vue';
import OeeAreaChart from '../components/OeeAreaChart.vue';
import OEEChart from './OEEChart.vue';

const store = useAnalyticsStore();

// Reactive variables and computed properties
const selectedDate = ref('');
const selectedShift = ref('shift1'); // Default to shift 1
const selectedMachine = ref(Object.keys(store.machines)[0]); // Default to the first machine

const metricsData = computed(() => {
  if (!selectedDate.value) {
    return {
      availability: 0,
      performance: 0,
      quality: 0,
      oee: 0,
      runtime: 0,
      idletime: 0,
      offtime: 0,
      badparts: 0,
    };
  }

  let selectedDateMetrics = [];
  if (selectedMachine.value === 'overall') {
    // Aggregate metrics from all machines for the selected date
    Object.keys(store.machines).forEach(machine => {
      const machineMetrics = store.machines[machine];
      Object.keys(machineMetrics.shifts).forEach(shift => {
        const shiftMetrics = machineMetrics.shifts[shift];
        selectedDateMetrics = selectedDateMetrics.concat(
          shiftMetrics.filter(metric => metric.timestamp.split(' ')[0] === selectedDate.value)
        );
      });
    });
  } else {
    // Find the selected machine's metrics for the selected date and shift
    const machineMetrics = store.machines[selectedMachine.value];
    const shiftMetrics = machineMetrics?.shifts[selectedShift.value] || [];

    // Filter metrics for the selected date
    selectedDateMetrics = shiftMetrics.filter(metric => metric.timestamp.split(' ')[0] === selectedDate.value);
  }

  if (selectedDateMetrics.length === 0) {
    console.warn(`No metrics found for selected date '${selectedDate.value}'`);
    return {
      availability: 0,
      performance: 0,
      quality: 0,
      oee: 0,
      runtime: 0,
      idletime: 0,
      offtime: 0,
      badparts: 0,
    };
  }

  // Calculate averages for availability, performance, quality, and OEE
  const totalMetrics = selectedDateMetrics.length;
  const avgAvailability = selectedDateMetrics.reduce((acc, curr) => acc + curr.availability, 0) / totalMetrics;
  const avgPerformance = selectedDateMetrics.reduce((acc, curr) => acc + curr.performance, 0) / totalMetrics;
  const avgQuality = selectedDateMetrics.reduce((acc, curr) => acc + curr.quality, 0) / totalMetrics;
  const avgOEE = (avgQuality / 100) * (avgAvailability / 100) * (avgPerformance / 100) * 100; // Example OEE calculation

  // Calculate averages for runtime, idle time, off time, and bad parts
  const totalRuntime = selectedDateMetrics.reduce((acc, curr) => acc + (curr.runtime || 0), 0);
  const totalIdletime = selectedDateMetrics.reduce((acc, curr) => acc + (curr.idletime || 0), 0);
  const totalOfftime = selectedDateMetrics.reduce((acc, curr) => acc + (curr.offtime || 0), 0);
  const totalBadparts = selectedDateMetrics.reduce((acc, curr) => acc + (curr.badparts || 0), 0);

  return {
    availability: avgAvailability.toFixed(2),
    performance: avgPerformance.toFixed(2),
    quality: avgQuality.toFixed(2),
    oee: avgOEE.toFixed(2),
    runtime: (totalRuntime / totalMetrics).toFixed(2),
    idletime: (totalIdletime / totalMetrics).toFixed(2),
    offtime: (totalOfftime / totalMetrics).toFixed(2),
    badparts: totalBadparts.toFixed(2),
  };
});

// Update metrics method
const updateMetrics = () => {
  store.selectedMetrics = selectedMachine.value; // Set selected machine in store
  store.selectedShift = selectedShift.value; // Set selected shift in store
  store.selectedDate = selectedDate.value; // Set selected date in store

  if (selectedDate.value) {
    store.calculateAverages(); // Calculate averages based on updated selections
  }
};

// Method to dynamically set background color based on metric value
const getMetricClass = (metric) => {
  switch (metric) {
    case 'availability':
      return 'metric-blue';
    case 'performance':
      return 'metric-orange';
    case 'quality':
      return 'metric-yellow';
    case 'oee':
      return 'metric-light-green'; // New class for light green OEE
    case 'runtime':
      return 'metric-dark-green'; // New class for runtime
    case 'idletime':
      return 'metric-orange'; // Orange color for idle time
    case 'offtime':
      return 'metric-gray'; // Gray color for off time
    case 'badparts':
      return 'metric-red'; // Red color for bad parts
    default:
      return '';
  }
};
</script>

<style scoped>
/* Ensure body and main page utilize full width */
body, html {
  width: 100%;
  margin: 0;
  padding: 0;

}

.metrics-page {
 
  flex-direction: column;
  gap: 20px;
  margin: 10px;

  width: 200%; /* Ensure full page width */
  justify-content: flex-start; /* Align content to start */
  position: relative;
  right: 300px;
}

.controls-row {
  display: flex;
  gap: 30px;
  flex-wrap: wrap; /* Allow wrapping to next line on small screens */
  justify-content: flex-start; /* Align content to start */

}

.metrics-chart-row {
 
  align-items: flex-start; /* Align items to the start */
  justify-content: flex-start; /* Align content to start */
  gap: 20px;
  width: 100%; /* Ensure full width */
  overflow: auto; /* Enable scrolling if content overflows */
}

.metrics-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: flex-start; /* Align items to start */
}

.metrics-box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 25px;
}

.metric {
  border-radius: 5px;
  padding: 10px; /* Reduce padding to decrease height */
  text-align: center;
  color: white;
  width: 130px; /* Set a consistent width for all metric boxes */
  height: 100px; /* Set a fixed height */
  position: relative;
  left: 0; /* Align to the left */
}

.chart-container {
  flex: 1; /* Allow the chart container to grow */
  max-width: 400px; /* Adjust max-width for the chart */
  height: 300px;
  margin: 0; /* Remove auto margin to align left */
 border: black solid 2px;

 justify-content: center;
  overflow:auto;
  align-items:center;
  
}

.styled-select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Metric background colors */
.metric-blue {
  background-color: #4285F4;
}

.metric-orange {
  background-color: #FBBC05;
}

.metric-yellow {
  background-color: #F4B400;
}

.metric-light-green {
  background-color: #34A853;
}

.metric-dark-green {
  background-color: #0F9D58;
}

.metric-gray {
  background-color: #9E9E9E;
}

.metric-red {
  background-color: #EA4335;
}

.additional-charts-row {
  display: flex;
  gap: 20px;
  justify-content: start; /* Center the charts horizontally */
  margin-top: 0px; /* Adjust margin as needed */
}

.additional-charts-row .chart-container {
  flex: 1; /* Allow charts to grow */
  max-width: 500px; /* Adjust max-width for individual chart containers */
  position: relative;
  
}

/* Responsive styling */
@media (max-width: 768px) {
  .metrics-chart-row {
    flex-direction: column; /* Change to column layout on smaller screens */
    align-items: center; /* Center items in column layout */
  }

  .metric {
    width: 100%; /* Full width for metrics on smaller screens */
  }

  .chart-container {
    max-width: 100%; /* Full width for chart on smaller screens */
  }
  .additional-charts-row .chart-container {
    max-width: 100%; /* Full width for charts on smaller screens */
  }
}

</style>
