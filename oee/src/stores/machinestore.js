// machinestore.js
import { defineStore } from 'pinia';

export const useMachineStore = defineStore('machineStore', {
  state: () => ({
    machines: [],
  }),
  actions: {
    addMachine(machine) {
      this.machines.push(machine);
    },
  },
});
