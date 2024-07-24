// // src/stores/oeestore.js
// import { defineStore } from 'pinia';

// export const useOEEStore = defineStore('oeestore', {
//   state: () => ({
//     metricsData: {
//       machine1: { quality: 90, availability: 85, performance: 80 },
//       machine2: { quality: 91, availability: 87, performance: 82 },
//       machine3: { quality: 89, availability: 86, performance: 81 },
//       machine4: { quality: 92, availability: 88, performance: 84 },
//       machine5: { quality: 93, availability: 89, performance: 83 },
//       machine6: { quality: 88, availability: 84, performance: 79 },
//       machine7: { quality: 90, availability: 86, performance: 81 },
//       machine8: { quality: 92, availability: 88, performance: 85 }
//     },
//     selectedMetrics: 'overall'
//   }),
//   getters: {
//     calculateOverallMetrics: (state) => {
//       const metrics = Object.values(state.metricsData);
//       const total = metrics.length;

//       const overallQuality = metrics.reduce((sum, metric) => sum + metric.quality, 0) / total;
//       const overallAvailability = metrics.reduce((sum, metric) => sum + metric.availability, 0) / total;
//       const overallPerformance = metrics.reduce((sum, metric) => sum + metric.performance, 0) / total;

//       return {
//         quality: overallQuality,
//         availability: overallAvailability,
//         performance: overallPerformance
//       };
//     },
//     selectedMetricsData: (state) => {
//       return state.selectedMetrics === 'overall'
//         ? state.calculateOverallMetrics
//         : state.metricsData[state.selectedMetrics];
//     }
//   },
//   actions: {
//     setSelectedMetrics(metrics) {
//       this.selectedMetrics = metrics;
//     }
//   }
// });



// """""""""""""""""""""""""  Initiall working code """"""""""""""""""""""""""""""""""""""""""""""""""

// src/stores/oeestore.js
// import { defineStore } from 'pinia';

// export const useOEEStore = defineStore('oeestore', {
//   state: () => ({
//     metricsData: {
//       machine1: { quality: 90, availability: 85, performance: 80 },
//       machine2: { quality: 91, availability: 87, performance: 82 },
//       machine3: { quality: 89, availability: 86, performance: 81 },
//       machine4: { quality: 92, availability: 88, performance: 84 },
//       machine5: { quality: 93, availability: 89, performance: 83 },
//       machine6: { quality: 88, availability: 84, performance: 79 },
//       machine7: { quality: 90, availability: 86, performance: 81 },
//       machine8: { quality: 92, availability: 88, performance: 85 }
//     },
//     selectedMetrics: 'overall'
//   }),
//   getters: {
//     calculateOverallMetrics: (state) => {
//       const metrics = Object.values(state.metricsData);
//       const total = metrics.length;

//       const overallQuality = metrics.reduce((sum, metric) => sum + metric.quality, 0) / total;
//       const overallAvailability = metrics.reduce((sum, metric) => sum + metric.availability, 0) / total;
//       const overallPerformance = metrics.reduce((sum, metric) => sum + metric.performance, 0) / total;

//       return {
//         quality: overallQuality,
//         availability: overallAvailability,
//         performance: overallPerformance
//       };
//     },
//     selectedMetricsData: (state) => {
//       return state.selectedMetrics === 'overall'
//         ? state.calculateOverallMetrics
//         : state.metricsData[state.selectedMetrics];
//     }
//   },
//   actions: {
//     setSelectedMetrics(metrics) {
//       this.selectedMetrics = metrics;
//     }
//   }
// });


// """""""""""""""""""""" Updated Working code """""""""""""""""""""""""""""

import { defineStore } from 'pinia';

export const useOEEStore = defineStore('oeestore', {
  state: () => ({
    machines: {
      machine1: {
        metrics: [
          { timestamp: '2024-06-01', quality: 90, availability: 85, performance: 80 },
          { timestamp: '2024-06-02', quality: 91.36, availability: 87, performance: 82 },
          { timestamp: '2024-06-02', quality: 95, availability: 85, performance: 80 },
          { timestamp: '2024-06-02', quality: 92.85, availability: 97, performance: 98 },

          { timestamp: '2024-06-01', quality: 93.45, availability: 80.25, performance: 80 },
          { timestamp: '2024-06-02', quality: 94.36, availability: 83.41, performance: 82 },
          { timestamp: '2024-06-02', quality: 91, availability: 85, performance: 83.23 },
          { timestamp: '2024-06-02', quality: 92.85, availability: 97, performance: 98.444 },

          // Add more timestamped data as needed
        ]
      },
      machine2: {
        metrics: [
          { timestamp: '2024-06-01', quality: 91, availability: 87, performance: 82 },
          { timestamp: '2024-06-02', quality: 92, availability: 88, performance: 83 },
          { timestamp: '2024-06-02', quality: 96.78, availability: 87, performance: 80 },
          { timestamp: '2024-06-02', quality: 93.45, availability: 79.56, performance: 93.56 },

          { timestamp: '2024-06-01', quality: 93.45, availability: 80.25, performance: 80 },
          { timestamp: '2024-06-02', quality: 94.36, availability: 83.41, performance: 82 },
          { timestamp: '2024-06-02', quality: 91, availability: 85, performance: 83.23 },
          { timestamp: '2024-06-02', quality: 92.85, availability: 97, performance: 98.444 },

  
          // Add more timestamped data as needed
        ]
      },
      machine3: {
        metrics: [
          { timestamp: '2024-06-01', quality: 89, availability: 86, performance: 81 },
          { timestamp: '2024-06-02', quality: 90, availability: 87, performance: 80 },
          { timestamp: '2024-06-02', quality: 95, availability: 87, performance: 80 },
          { timestamp: '2024-06-02', quality: 92, availability: 77, performance: 90 },

          { timestamp: '2024-06-01', quality: 93.45, availability: 80.25, performance: 80 },
          { timestamp: '2024-06-02', quality: 94.36, availability: 83.41, performance: 82 },
          { timestamp: '2024-06-02', quality: 91, availability: 85, performance: 83.23 },
          { timestamp: '2024-06-02', quality: 92.85, availability: 97, performance: 98.444 },

          // Add more timestamped data as needed
        ]
      },
      machine4: {
        metrics: [
          { timestamp: '2024-06-01', quality: 92, availability: 88, performance: 84 },
          { timestamp: '2024-06-02', quality: 93, availability: 89, performance: 83 },
          { timestamp: '2024-06-02', quality: 85, availability: 87.6, performance: 80.44 },
          { timestamp: '2024-06-02', quality: 92, availability: 77.56, performance: 90.56 },
          // Add more timestamped data as needed
          { timestamp: '2024-06-01', quality: 93.45, availability: 80.25, performance: 80 },
          { timestamp: '2024-06-02', quality: 94.36, availability: 83.41, performance: 82 },
          { timestamp: '2024-06-02', quality: 91, availability: 85, performance: 83.23 },
          { timestamp: '2024-06-02', quality: 92.85, availability: 97, performance: 98.444 },

        

        ]
      },
      machine5: {
        metrics: [
          { timestamp: '2024-06-01', quality: 93, availability: 89, performance: 83 },
          { timestamp: '2024-06-02', quality: 94, availability: 90, performance: 84 },
          { timestamp: '2024-06-02', quality: 85, availability: 87.6, performance: 80.44 },
          { timestamp: '2024-06-02', quality: 92, availability: 77.56, performance: 90.56 },
          // Add more timestamped data as needed
          { timestamp: '2024-06-01', quality: 93.45, availability: 80.25, performance: 80 },
          { timestamp: '2024-06-02', quality: 94.36, availability: 83.41, performance: 82 },
          { timestamp: '2024-06-02', quality: 91, availability: 85, performance: 83.23 },
          { timestamp: '2024-06-02', quality: 92.85, availability: 97, performance: 98.444 },

        ]
      },
      machine6: {
        metrics: [
          { timestamp: '2024-06-01', quality: 88, availability: 84, performance: 79 },
          { timestamp: '2024-06-02', quality: 89, availability: 85, performance: 80 },
          { timestamp: '2024-06-02', quality: 85, availability: 87.6, performance: 80.44 },
          { timestamp: '2024-06-02', quality: 92, availability: 77.56, performance: 90.56 },
          // Add more timestamped data as needed
          { timestamp: '2024-06-01', quality: 93.45, availability: 80.25, performance: 80 },
          { timestamp: '2024-06-02', quality: 94.36, availability: 83.41, performance: 82 },
          { timestamp: '2024-06-02', quality: 91, availability: 85, performance: 83.23 },
          { timestamp: '2024-06-02', quality: 92.85, availability: 97, performance: 98.444 },


        ]
      },
      machine7: {
        metrics: [
          { timestamp: '2024-06-01', quality: 90, availability: 86, performance: 81 },
          { timestamp: '2024-06-02', quality: 91, availability: 87, performance: 82 },
          { timestamp: '2024-06-02', quality: 85, availability: 87.6, performance: 80.44 },
          { timestamp: '2024-06-02', quality: 92, availability: 77.56, performance: 90.56 },
          // Add more timestamped data as needed
          { timestamp: '2024-06-01', quality: 93.45, availability: 80.25, performance: 80 },
          { timestamp: '2024-06-02', quality: 94.36, availability: 83.41, performance: 82 },
          { timestamp: '2024-06-02', quality: 91, availability: 85, performance: 83.23 },
          { timestamp: '2024-06-02', quality: 92.85, availability: 97, performance: 98.444 },

        ]
      },
      machine8: {
        metrics: [
          { timestamp: '2024-06-01', quality: 92, availability: 88, performance: 85 },
          { timestamp: '2024-06-02', quality: 93, availability: 89, performance: 86 },
          { timestamp: '2024-06-02', quality: 85, availability: 87.6, performance: 80.44 },
          { timestamp: '2024-06-02', quality: 92, availability: 77.56, performance: 90.56 },
          // Add more timestamped data as needed
          { timestamp: '2024-06-01', quality: 93.45, availability: 80.25, performance: 80 },
          { timestamp: '2024-06-02', quality: 94.36, availability: 83.41, performance: 82 },
          { timestamp: '2024-06-02', quality: 91, availability: 85, performance: 83.23 },
          { timestamp: '2024-06-02', quality: 92.85, availability: 97, performance: 98.444 },

     
        ]
      },
    },
    selectedMetrics: 'overall'
  }),
  getters: {

    
    calculateMachineMetrics: (state) => (machineId) => {
      const metrics = state.machines[machineId].metrics;
      const total = metrics.length;

      const quality = metrics.reduce((sum, metric) => sum + metric.quality, 0) / total;
      const availability = metrics.reduce((sum, metric) => sum + metric.availability, 0) / total;
      const performance = metrics.reduce((sum, metric) => sum + metric.performance, 0) / total;

      return {
        quality,
        availability,
        performance
      };
    },
    calculateOverallMetrics: (state) => {
      const machines = Object.values(state.machines);
      const totalMachines = machines.length;

      const overallQuality = machines.reduce((sum, machine) => {
        return sum + machine.metrics.reduce((acc, metric) => acc + metric.quality, 0);
      }, 0) / (totalMachines * machines[0].metrics.length);

      const overallAvailability = machines.reduce((sum, machine) => {
        return sum + machine.metrics.reduce((acc, metric) => acc + metric.availability, 0);
      }, 0) / (totalMachines * machines[0].metrics.length);

      const overallPerformance = machines.reduce((sum, machine) => {
        return sum + machine.metrics.reduce((acc, metric) => acc + metric.performance, 0);
      }, 0) / (totalMachines * machines[0].metrics.length);

      return {
        quality: overallQuality,
        availability: overallAvailability,
        performance: overallPerformance
      };
    },
   
    selectedMetricsData: (state) => {
      return state.selectedMetrics === 'overall'
        ? state.calculateOverallMetrics
        : state.calculateMachineMetrics(state.selectedMetrics);
    },
    getLineChartData: (state) => (machineId) => {
      if (!machineId || !state.machines[machineId] || !state.machines[machineId].metrics) {
        console.error(`Machine with id ${machineId} does not exist or does not have metrics.`);
        return [];
      }
      const metrics = state.machines[machineId].metrics;
      return metrics.map(metric => ({
        time: metric.timestamp,
        quality: metric.quality,
        availability: metric.availability,
        performance: metric.performance,
        oee: (metric.quality / 100) * (metric.availability / 100) * (metric.performance / 100) * 100
        
      }));
      
    }
  },
  actions: {
    setSelectedMetrics(metrics) {
      this.selectedMetrics = metrics;
    },
    getMachineMetrics(machineId) {
      return this.machines[machineId].metrics;
    }
  }
});
