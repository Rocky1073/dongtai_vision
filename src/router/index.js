import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // { path: "/", name: "Home", component: Home },
  {
    path: '/intelligent-analytics',
    name: 'IntelligentAnalytics',
    component: () => import('../views/IntelligentAnalytics/IntelligentAnalytics.vue'),
  },
];

const router = new VueRouter({ routes });

export default router;
