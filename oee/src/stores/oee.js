// src/store/metrics.js
import { defineStore } from 'pinia';

export const useMetricsStore = defineStore('metrics', {
  state: () => ({
    oee: {
      availability: 80,
      performance: 90,
      quality: 95
    },
    performance: {
      performance: 85,
      otherMetrics: 15
    },
    quality: {
      quality: 92,
      defects: 8
    },
    availability: {
      availability: 88,
      downtime: 12
    }
  }),
  actions: {
    async fetchOeeData() {
      // Simulate asynchronous operation
      return new Promise((resolve) => {
        setTimeout(() => {
          // Update state with dummy data
          this.oee.availability = 80;
          this.oee.performance = 90;
          this.oee.quality = 95;
          resolve();
        }, 1000); // Simulate 1 second delay
      });
    },
    async fetchPerformanceData() {
      // Simulate asynchronous operation
      return new Promise((resolve) => {
        setTimeout(() => {
          // Update state with dummy data
          this.performance.performance = 85;
          this.performance.otherMetrics = 15;
          resolve();
        }, 1000); // Simulate 1 second delay
      });
    },
    async fetchQualityData() {
      // Simulate asynchronous operation
      return new Promise((resolve) => {
        setTimeout(() => {
          // Update state with dummy data
          this.quality.quality = 92;
          this.quality.defects = 8;
          resolve();
        }, 1000); // Simulate 1 second delay
      });
    },
    async fetchAvailabilityData() {
      // Simulate asynchronous operation
      return new Promise((resolve) => {
        setTimeout(() => {
          // Update state with dummy data
          this.availability.availability = 88;
          this.availability.downtime = 12;
          resolve();
        }, 1000); // Simulate 1 second delay
      });
    }
  }
});
