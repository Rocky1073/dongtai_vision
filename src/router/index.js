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
  {
    path: '/street-analysis',
    name: 'StreetAnalysis',
    component: () => import('../views/StreetAnalysis/StreetAnalysis.vue'),
  },
];

const router = new VueRouter({ routes });

export default router;
