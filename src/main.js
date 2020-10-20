import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './Global.less';

Vue.config.productionTip = false;

import './assets/js/TweenMax.min.js';

import { HappyScroll } from 'vue-happy-scroll';
import 'vue-happy-scroll/docs/happy-scroll.css';
Vue.component('happy-scroll', HappyScroll);

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);

new Vue({ router, store, render: h => h(App) }).$mount('#app');
