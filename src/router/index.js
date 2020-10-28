import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/city-analytics' },
  {
    path: '/city-analytics',
    name: 'CityAnalytics',
    component: () => import('../views/CityAnalytics/CityAnalytics.vue'),
  },
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

const router = new VueRouter({ base: '/dongtai_vision/', routes });

export default router;
