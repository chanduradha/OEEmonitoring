import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/main.css'; // Import Tailwind CSS styles
import router from './router'; // Import your router configuration
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add all icons to the library so you can use them in your components
library.add(fas);

const app = createApp(App);
const pinia = createPinia();

app.component('font-awesome-icon', FontAwesomeIcon); // Register the FontAwesomeIcon component globally

app.use(pinia); // Use Pinia for state management
app.use(router); // Use router

app.mount('#app');
