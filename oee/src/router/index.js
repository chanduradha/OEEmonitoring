// import { createRouter, createWebHistory } from 'vue-router';
// import HomePage from '../views/HomePage.vue';

// const routes = [
//   {
//     path: '/',
//     name: 'HomePage',
//     component: HomePage
//   },

// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// });

// export default router;
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue'; // Assuming this is your main layout
import AnalyticsPage from '../components/AnalyticsPage.vue';
import DailyPage from '../components/DailyPage.vue';
import WeeklyPage from '../components/WeeklyPage.vue';
import MonthlyPage from '../components/MonthlyPage.vue';
import DownloadPage from '../components/DownloadPage.vue';


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../components/MainPage.vue') // Assuming this is the home component
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: AnalyticsPage
      },
      {
        path: 'daily',
        name: 'Daily',
        component: DailyPage
      },
      {
        path: 'weekly',
        name: 'Weekly',
        component: WeeklyPage
      },
      {
        path: 'monthly',
        name: 'Monthly',
        component: MonthlyPage
      },
      {
        path: 'download',
        name: 'Download',
        component: DownloadPage
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
