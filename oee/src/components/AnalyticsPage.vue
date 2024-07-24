<template>
  <div class="metrics-page">
    <!-- Controls row -->
    <div class="controls-row">
      <!-- Machine selection -->
      <div class="control">
        <label for="machineSelect" style="color:white;">Select Machine:</label>
        <select id="machineSelect" v-model="selectedMachine" @change="updateMetrics" class="styled-select">
          <option value="overall">Overall Metrics</option>
          <option v-for="machine in Object.keys(store.machines)" :key="machine" :value="machine">{{ machine }}</option>
        </select>
      </div>

      <!-- Date selection -->
      <div class="control">
        <label for="dateSelect" style="color:white;">Select Date:</label>
        <input type="date" id="dateSelect" v-model="selectedDate" @change="updateMetrics" class="styled-select" />
      </div>

      <!-- Shift selection -->
      <div class="control" v-if="selectedMachine !== 'overall'">
        <label for="shiftSelect" style="color:white;">Select Shift:</label>
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
      </div>

      <!-- Chart display -->
      <div class="chart-container pie-chart">
        <PieChart :data="metricsData"></PieChart>
      </div>
    </div>

    <div class="additional-charts-row">
      <div class="chart-container runtime-idle-chart">
        <RuntimeIdleChart />
      </div>
      <div class="chart-container oee-area-chart">
        <OeeAreaChart />
      </div>
      <div class="chart-container oee-chart">
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
      return 'metric-orange1';
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
body, html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.metrics-page {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 115%;
  padding: 10px;
  background-color: #f8f9fa;
  height: 820px;
  position:relative;
  right: 240px;
  bottom:20px;
}

.controls-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  background-color: #333;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.control {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
}

.styled-select {
  width: 200px;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #f1f1f1;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.metrics-chart-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
  
}

.metrics-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 350px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

.metrics-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  
}

.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  width: 22%;
  height: 80px;
  background-color: #f1f1f1;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.metric h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.metric-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.metric-blue {
  background-color: #3498db;
  color: white;
}
.metric-orange1 {
  background-color: #e67e22;
  color: white;
 
}
.metric-orange {
  background-color: white;
  color: white;
  border: 1px solid black;
}



.metric-yellow {
  background-color: #f1c40f;
  color: white;

}

.metric-light-green {
  background-color: #2ecc71;
  color: white;
}

.metric-dark-green {
  background-color: white;
  color: white;
  border: 1px solid black;
}

.metric-gray {
  background-color: white;
  color: white;
  border: 1px solid black;
}

.metric-red {
  background-color: white;
  color: white;
  border: 1px solid black;
}

.chart-container {
  width: 33%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  
 
}

.additional-charts-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  top:50px;
 
}

.pie-chart {
  height: 350px; /* Adjust height as needed */
}

.runtime-idle-chart {
  height: 300px; /* Adjust height as needed */
  
}

.oee-area-chart {
  height: 300px; /* Adjust height as needed */
}

.oee-chart {
  height: 300px; /* Adjust height as needed */
}

@media screen and (max-width: 768px) {
  .metrics-chart-row {
    flex-direction: column;
  }

  .metrics-container {
    width: 100%;
    margin-bottom: 20px;
  }

  .chart-container {
    width: 100%;
  }

  .additional-charts-row {
    flex-direction: column;
  }
}
</style>