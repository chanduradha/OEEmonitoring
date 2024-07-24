<template>
  <div>
   
    <div class="button-container">

       <!-- Dummy data display boxes -->
      
      <!-- this is day month machineStateChartRef -->
      <div class="button-container">
        <div class="state-container" @click="displayMachineState('Machine State')">
          <div class="state-box" :style="{ backgroundColor: stateColors['Machine State'] || 'gray' }">
            Machine State ({{ machineStateData['Machine State'] || 0 }} min)
          </div>
        </div>
        <div class="state-container" @click="displayMachineState('Run Time')">
          <div class="state-box" :style="{ backgroundColor: stateColors['Run Time'] || 'gray' }">
            Run Time ({{ machineStateData['Run Time'] || 0 }} min)
          </div>
        </div>
        <div class="state-container" @click="displayMachineState('Idle Time')">
          <div class="state-box" :style="{ backgroundColor: stateColors['Idle Time'] || 'gray' }">
            Idle Time ({{ machineStateData['Idle Time'] || 0 }} min)
          </div>
        </div>
        <div class="state-container" @click="displayMachineState('Off Time')">
          <div class="state-box" :style="{ backgroundColor: stateColors['Off Time'] || 'gray' }">
            Off Time ({{ machineStateData['Off Time'] || 0 }} min)
          </div>
        </div>
      </div>
      <!--''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''  -->
      <!-- Button to add machines -->
      <button @click="addMachine">Add Machine</button>

      <!-- Input box for entering machine name -->
      <div v-if="showInput" class="machine-input">
        <input type="text" v-model="machineName" placeholder="Enter machine name">
        <button @click="saveMachine">Save</button>
      </div>

      <!-- Dropdown for selecting machine metrics -->
      <div class="dropdown-container">
        <label for="metricsSelect">Select Machines</label>
        <select id="metricsSelect" v-model="selectedMetrics" @change="updateSelectedMetrics">
          <option value="overall">Overall Metrics</option>
          <option value="machine1">Mazak H-400</option>
          <option value="machine2">HMT_STALLION-200</option>
          <option value="machine3">HMT VTC 800</option>
          <option value="machine4">SCHAUBLIN-33</option>
          <option value="machine5">AMS-VMC</option>
          <option value="machine6">Macpower-mono-200</option>
          <option value="machine7">Machine 7</option>
          <option value="machine8">Machine 8</option>
        </select>
      </div>
    </div>

    <div class="charts-and-image-container">
      <!-- Parts Production Component -->
      <div class="dummy-data-container">
        <div class="dummy-data-box total-parts">
          TotalParts: {{ dummyData.totalProduced || 0 }}
        </div>
        <div class="dummy-data-box good-parts">
          Good Parts: {{ dummyData.goodParts || 0 }}
        </div>
        <div class="dummy-data-box bad-parts">
          Bad Parts : {{ dummyData.badParts || 0 }}
        </div>
      </div>


     
      <div class="charts-row">
             <!-- Image container -->
           
           
         
        <!-- Chart containers -->
        <div class="chart-container">
          <div class="chart" ref="oeeChartRef"></div>
        </div>

        <div class="chart-container">
          <div class="chart" ref="performanceChartRef"></div>
        </div>

        <div class="chart-container">
          <div class="chart" ref="qualityChartRef"></div>
        </div>

        <div class="chart-container">
          <div class="chart" ref="availabilityChartRef"></div>
        </div>
     
        <div class="chart-container image-container"  >
          <img :src="selectedMachineImage" alt="Machine Image" class="machine-image">
        </div>
   
       
        
        <div class="chart-container">
          <div class="chart" ref="lineChartRef"></div>
        </div>
     
        <div class="chart-container">
          <div class="chart" ref="runtimeChartRef"></div>
        </div>
     <!-- Highcharts Machine State Chart -->
  <div class="chart-container">
    <div class="chart" ref="machineStateChartRef"></div>
  </div>
    
      </div>
    
    </div>
   
 

 
  </div>
</template>



<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useOEEStore } from '@/stores/oeestore';
import { useMachineStore } from '@/stores/machinestore';
import { updateRuntimeChart } from './runtimeChart';


import * as echarts from 'echarts';

// import Highcharts from 'highcharts';

const showInput = ref(false);
const machineName = ref('');
const machineStore = useMachineStore();

const oeeChartRef = ref(null);
const performanceChartRef = ref(null);
const qualityChartRef = ref(null);
const availabilityChartRef = ref(null);
const lineChartRef = ref(null);
const runtimeChartRef = ref(null);

const oeeStore = useOEEStore();
const selectedMetrics = ref('overall'); // Initialize selectedMetrics to 'overall'

// """"""""""""""""""""""""""""""""""""""""""""""//
const dummyData = {
  totalProduced: 100, // Example dummy data
  goodParts: 90, // Example dummy data
  badParts: 10 // Example dummy data
};

onMounted(() => {
  // onMounted function
});

//"""""""""""""""""""""""""""""""from here Hight chart related code"""""""""""""""""""""""""""""""""""""//
// Dummy data for machine state in minutes
import { updateMachineStateChart } from './highchartsMachineState';

const machineStateChartRef = ref(null);
const machineStateData = {
  dates: ['2024-06-01', '2024-06-02', '2024-06-03', '2024-06-04','2024-06-05'],
  onTime: [300, 350, 320,400,390],
  idleTime: [60, 40, 80,50,35],
  offTime: [120, 100, 80,180,50]
};

const stateColors = {
  'Machine State': ' lightBlue',
  'Run Time': 'green',
  'Idle Time': 'orange',
  'Off Time': 'red'
};

// Update machine state chart on component mount
onMounted(() => {
  updateMachineStateChart(machineStateChartRef.value, machineStateData);
  updateRuntimeChart(runtimeChartRef.value, machineStateData); // Update runtime chart on component mount
});

const displayMachineState = (type) => {
  console.log(`Displaying ${type}`);
};

//"""""""""""""""""""""""""""""""from here Hight chart related code"""""""""""""""""""""""""""""""""""""//
let qualityChart, availabilityChart, performanceChart, oeeChart, lineChart;

const addMachine = () => {
  showInput.value = true;
};

const saveMachine = () => {
  if (machineName.value.trim() !== '') {
    machineStore.addMachine({ id: Date.now(), name: machineName.value });
    console.log(machineStore.machines); // Check in console
    machineName.value = '';
    showInput.value = false;
  }
};

const updateCharts = () => {
  const { quality, availability, performance } = oeeStore.selectedMetricsData;
  const oee = (quality / 100) * (availability / 100) * (performance / 100) * 100;

  if (!qualityChart && qualityChartRef.value) {
    qualityChart = echarts.init(qualityChartRef.value);
  }
  if (!availabilityChart && availabilityChartRef.value) {
    availabilityChart = echarts.init(availabilityChartRef.value);
  }
  if (!performanceChart && performanceChartRef.value) {
    performanceChart = echarts.init(performanceChartRef.value);
  }
  if (!oeeChart && oeeChartRef.value) {
    oeeChart = echarts.init(oeeChartRef.value);
  }
  if (!lineChart && lineChartRef.value) {
    lineChart = echarts.init(lineChartRef.value); // Initialize line chart if not already initialized
  }

  const updateChart = (chart, data, name, color) => {
    chart.setOption({
      series: [{
        name,
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '60%'],
        startAngle: 180,
        endAngle: 360,
        data: [
          { value: data, name: `${name}: ${data.toFixed(2)}%`, itemStyle: { color: color } },
          { value: 100 - data, name: 'Other Metrics', itemStyle: { color: '#FF0000' } }
        ],
        label: {
          show: true,
          formatter: '{b}',
          position: 'center',
          offset: [0, 30],
          fontSize: 16,
          padding: [0, 0, 20, 0]
        },
        labelLine: { show: false },
        itemStyle: { emphasis: { color: 'gray' } }
      }]
    });
  };

  updateChart(qualityChart, quality, 'Quality', '#2196F3');
  updateChart(availabilityChart, availability, 'Availability', '#2196F3');
  updateChart(performanceChart, performance, 'Performance', '#2196F3');
  updateChart(oeeChart, Math.round(oee), 'OEE', '#4CAF50');
  

  // Update line chart based on selected machine
  if (lineChart && lineChartRef.value) {
    const lineChartData = oeeStore.getLineChartData(selectedMetrics.value);
    console.log('Line Chart Data:', lineChartData); // Check line chart data in console
    updateLineChart(lineChart, lineChartData);
  }
};

const updateLineChart = (chart, data) => {

  chart.setOption({
    xAxis: {
      type: 'category',
      data: data.map(item => item.time)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Quality',
        type: 'line',
        data: data.map(item => item.quality)
      },
      {
        name: 'Availability',
        type: 'line',
        data: data.map(item => item.availability)
      },
      {
        name: 'Performance',
        type: 'line',
        data: data.map(item => item.performance)
      },
      {
        name: 'OEE',
        type: 'line',
        data: data.map(item => item.oee) // Assuming 'oee' is included in each data item
      }
    ]
  });
};

const updateSelectedMetrics = () => {
  oeeStore.setSelectedMetrics(selectedMetrics.value);
};

onMounted(() => {
  updateCharts(); // Initial chart update
});

watch(() => oeeStore.selectedMetrics, updateCharts);
watch(() => oeeStore.selectedMetricsData, updateCharts);

const selectedMachineImage = computed(() => {
  switch (selectedMetrics.value) {
    case 'machine1':
      return require('@/assets/Mazak H-400.png');
    case 'machine2':
      return require('@/assets/HMT STALLION-200.png');
    case 'machine3':
      return require('@/assets/HMT VTC 800.png');
    case 'machine4':
      return require('@/assets/SCHAUBLIN-33.png');
    case 'machine5':
      return require('@/assets/AMS-VMC.png');
    case 'machine6':
      return require('@/assets/macpowermono-200.png');
    case 'machine7':
      return require('@/assets/mazak_img.png');
    case 'machine8':
      return require('@/assets/kk.png');
    default:
      return require('@/assets/overallequipment_img.png'); // Default image path if no match
  }
});
</script>



<style scoped>


.state-box {
  width: 150px; /* Reduced width */
  height: 40px; /* Increased height */
  display: flex;
  align-items: center;
  justify-content: left;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  bottom: 15px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); 
}

.state-container {
  flex: 1 1 calc(29% - 20px); /* Maintain existing flex properties */
  margin: 0 5px; /* Adjust margin to 0 horizontally and 5px vertically */
  display: flex;
  justify-content: left;
  align-items: center;
  
}
.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* Apply styles directly to the button */
.button-container button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Adjust hover effect for the button */
.button-container button:hover {
  background-color: #0056b3;
}

.charts-and-image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  

}

.charts-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 200%;
}

.chart-container {
  flex: 1 1 calc(25% - 20px);
  height: 300px;
  margin: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;

  min-width: 280px; /* Ensure a minimum width for each chart */
  position: relative; /* Make the image container position relative */
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  bottom: 33px;
  right: 200px;
  width: 70%;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); 
}

.chart {
  width: 100%;
  height: 100%;
  
}

.image-container {
  flex: 1 1 calc(25% - 20px); /* Adjust image container flex properties */
  margin: 10px; /* Adjust margin for spacing */
  max-width: 290px; /* Limit maximum width */
  position: relative; /* Ensure relative positioning for contained elements */
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); 
}

.machine-image {
  max-width: 100%;
  max-height: 100%; /* Ensure image doesn't exceed container */
  height: auto; /* Maintain aspect ratio */
}

.machine-input {
  display: flex;
  align-items: center;
  margin-left: 10px; /* Adjust margin for spacing */
}

.machine-input input {
  margin-right: 10px; /* Adjust margin for spacing */
  padding: 5px;
  width: 200px;
}

.machine-input button {
  padding: 5px 10px;
  cursor: pointer;
}

.dropdown-container {
  margin-bottom: 20px;
  text-align: center;
}

#metricsSelect {
  padding: 8px 12px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

#metricsSelect:hover {
  background-color: #e0e0e0;
}

@media (max-width: 1024px) {
  .charts-row {
    flex-direction: column;
    align-items: center;
  }

  .chart-container {
    width: 100%;
    margin-bottom: 20px;
  }

  .image-container {
    width: 100%; /* Ensure full width on smaller screens */
    margin-bottom: 20px; /* Adjust margin for spacing */
    max-width: 150px; /* Adjust maximum width */
  }
  .dummy-data-container {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}

.dummy-data-container {
  display: flex;
  justify-content: space-around;
  position: relative;
  bottom:50px;
  left: 10px;


}

.dummy-data-box {
  height: 40px;
  width: 180px;
  padding: 5px 20px;
  border-radius: 5px;
  font-size: 1.2em;
  
 
}

.total-parts {
  background-color: #4caf50;
  color: white;
}

.good-parts {
  background-color: #2196f3;
  color: white;
}

.bad-parts {
  background-color: #f44336;
  color: white;
}

</style>
