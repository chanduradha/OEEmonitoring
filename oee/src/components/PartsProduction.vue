<template>
    <div class="parts-production-container">
      <div class="parts-box total-parts" :style="{ height: totalPartsHeight + 'px' }">
        Total Parts<br>{{ totalParts }}
      </div>
      <div class="parts-box good-parts" :style="{ height: goodPartsHeight + 'px' }">
        Good Parts<br>{{ goodParts }}
      </div>
      <div class="parts-box bad-parts" :style="{ height: badPartsHeight + 'px' }">
        Bad Parts<br>{{ badParts }}
      </div>
    </div>
  </template>
  
  <script setup>
  const totalParts = ref(1000); // Replace with actual data or dynamic calculation
  const goodParts = ref(800); // Replace with actual data or dynamic calculation
  const badParts = ref(200); // Replace with actual data or dynamic calculation
  
  const totalPartsHeight = computed(() => (totalParts.value / 10)); // Adjust height based on actual data range
  const goodPartsHeight = computed(() => (goodParts.value / 10)); // Adjust height based on actual data range
  const badPartsHeight = computed(() => (badParts.value / 10)); // Adjust height based on actual data range
  </script>
  
  <style scoped>
  .parts-production-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .parts-box {
    width: 150px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }
  
  .total-parts {
    background-color: #2196F3; /* Blue for total parts */
  }
  
  .good-parts {
    background-color: #4CAF50; /* Green for good parts */
  }
  
  .bad-parts {
    background-color: #F44336; /* Red for bad parts */
  }
  
  .parts-box {
    color: white;
    border-radius: 5px;
  }
  </style>
  