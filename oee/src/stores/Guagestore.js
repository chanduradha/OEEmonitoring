import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    oeeData: 85,
    performanceData: 90,
    availabilityData: 80,
    qualityData: 95
    // Add other state properties as needed
  }),
  getters: {
    oeeData: state => state.oeeData,
    performanceData: state => state.performanceData,
    availabilityData: state => state.availabilityData,
    qualityData: state => state.qualityData
    // Add other getters as needed
  },
  actions: {
    // Define actions if needed
  }
});
