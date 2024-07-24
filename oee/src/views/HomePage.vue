<template>
  <div class="home min-h-screen flex">
   
    <div class="sidebar w-1/4 p-4">
      <AppHeader />
    </div>

    <div class="content flex-1 p-4">
      <NavigationMenu />
    </div>
 
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue';
import NavigationMenu from '../components/NavigationMenu.vue';

</script>

<style scoped>
/* Set background color for .home */
.home {
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.bg-dark-blue {
  background-color: #c1c1c5; /* Dark Blue background */
}

/* Media query for smaller screens */
@media (max-width: 1024px) {
  .home {
    flex-direction: column;
    background-color: #b0b0b5; /* Light Gray background */
  }
  .sidebar {
    width: 30%;
  }
}

@media (max-width: 768px) {
  .home {
    flex-direction: column;
    background-color: #a0a0a5; /* Light Gray background */
  }
  .sidebar {
    width: 40%;
  }
}

@media (max-width: 480px) {
  .home {
    flex-direction: column;
    background-color: #909095; /* Light Gray background */
  }
  .sidebar {
    width: 100%;
    order: 2;
  }
  .content {
    width: 100%;
    order: 1;
  }
}
</style>
