<template>
  <div class="navigation-container">
    <div class="buttons">
      <router-link to="/" exact-active-class="active" class="nav-button">
        <i class="fas fa-home"></i> Home
      </router-link>
      <router-link to="/analytics" exact-active-class="active" class="nav-button">
        Analytics
      </router-link>
      <router-link to="/daily" exact-active-class="active" class="nav-button">
        Daily
      </router-link>
      <router-link to="/weekly" exact-active-class="active" class="nav-button">
        Weekly
      </router-link>
      <router-link to="/monthly" exact-active-class="active" class="nav-button">
        Monthly
      </router-link>
      <router-link to="/download" exact-active-class="active" class="nav-button">
        Download
      </router-link>
    </div>
    <transition name="slide-fade" mode="out-in">
      <router-view class="page"></router-view>
    </transition>
  </div>
</template>

<script setup>
// No changes needed in script setup for this part
</script>

<style scoped>
.navigation-container {
  display: flex;
  flex-direction: column;
  padding: 70px;
}

.buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px 20px;
  cursor: pointer;
  text-decoration: none;
  color: black;
}

.nav-button.active {
  background-color: #007bff;
  color: white;
}

.page {
  margin-top: 20px;
  width: 100%;
}

@media (min-width: 600px) {
  .buttons {
    flex-wrap: nowrap;
  }
}

/* Transition styles */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
</style>
