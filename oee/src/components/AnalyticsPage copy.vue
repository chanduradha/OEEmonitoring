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
      <!-- Metrics container -->
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
        </div>
        <div class="metrics-box">
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
      </div>

      <!-- Pie Chart display -->
      <div class="chart-container">
        <PieChart :data="metricsData"></PieChart>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import { useAnalyticsStore } from '@/stores/Analyticstore';
import PieChart from '@/components/PieChart.vue';

const store = useAnalyticsStore();

// Reactive variables
const selectedDate = ref('');
const selectedShift = ref('shift1'); // Default to shift 1
const selectedMachine = ref(Object.keys(store.machines)[0]); // Default to the first machine

// Computed property for metrics data
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

// Method to update metrics data based on selection changes
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
.metrics-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 10px;
}

.controls-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap; /* Allow wrapping to next line on small screens */
}

.metrics-chart-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap; /* Wrap elements if they exceed width */
  justify-content: flex-start; /* Align items to the left */
  align-items: flex-start; /* Align items to the top */
}

.metrics-container {
  display: flex;
  flex-direction: column; /* Align metrics vertically */
  gap: 10px;
  flex: 1;
  min-width: 300px; /* Minimum width for metrics box */
  max-width: 50%; /* Limit max width to 50% of container */
}

.metrics-box {
  display: flex;
  flex-direction: row; /* Align metrics horizontally */
  gap: 10px;
  flex-wrap: wrap; /* Allow wrapping to next line if needed */
}

.chart-container {
  flex: 1; /* Allow chart container to take remaining space */
  min-width: 300px; /* Minimum width for chart */
  max-width: 50%; /* Limit max width to 50% of container */
  position: relative; /* Relative positioning for chart */
}

.metric {
  padding: 20px;
  text-align: center;
  border-radius: 5px;
  color: white;
  flex: 1;
}

.metric h3 {
  margin: 0;
}

.metric-value {
  font-size: 1.5em;
}

/* Metric background colors */
.metric-blue {
  background-color: #2196f3;
}

.metric-orange {
  background-color: #ff9800;
}

.metric-yellow {
  background-color: #ffeb3b;
}

.metric-light-green {
  background-color: #8bc34a;
}

.metric-dark-green {
  background-color: #388e3c;
}

.metric-red {
  background-color: #f44336;
}

.metric-gray {
  background-color: #9e9e9e;
}

/* Responsive styles */
@media (min-width: 768px) {
  .metrics-container,
  .chart-container {
    max-width: 40%; /* Adjust max width for larger screens */
  }
}
</style>
