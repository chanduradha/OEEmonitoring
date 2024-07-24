<template>
  <div class="header flex items-center justify-between px-4 py-2">
    <div class="flex items-center">
      <img src="../assets/kk.png" alt="Logo" class="logo">
      <font-awesome-icon icon="cog" class="settings-symbol" />
    </div>
    <h1 class="text-xl font-bold text-white ">Machine OEE Monitoring</h1>
  

  </div>
</template>

<script setup>

</script>

<style scoped>
.header {
  background-color: #12156b;
  color: white;
  width: 100%;
  height: 65px;
  border: 1px solid black;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
  z-index: 1000;
}

.logo {
  width: 80px;
  height: 60px;
}

.settings-symbol {
  font-size: 48px;
  color: white;
  margin-left: 10px;
  animation: spin 5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

h1 {
  color: white;
}




/* Media query for smaller screens */
@media (max-width: 1024px) {
  .logo {
    width: 120px;
    height: 40px; /* Maintain aspect ratio */
  }

  .settings-symbol {
    font-size: 36px;
  }

  h1 {
    font-size: 1rem; /* Adjust font size for smaller screens */
  }
}

@media (max-width: 768px) {
  .logo {
    width: 100px;
    height: 30px; /* Maintain aspect ratio */
  }

  .settings-symbol {
    font-size: 24px;
  }

  h1 {
    font-size: 0.875rem; /* Adjust font size for smaller screens */
  }
}

@media (max-width: 480px) {
  .logo {
    width: 80px;
    height: 25px; /* Maintain aspect ratio */
  }

  .settings-symbol {
    font-size: 18px;
  }

  h1 {
    font-size: 0.75rem; /* Adjust font size for very small screens */
  }

}


</style>
