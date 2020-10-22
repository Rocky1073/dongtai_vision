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

Date.prototype.format = function(fmt) {
  const item = {
    'M+': this.getMonth() + 1, //月份
    'D+': this.getDate(), //日
    'H+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (const key in item)
    if (new RegExp('(' + key + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? item[key] : ('00' + item[key]).substr(('' + item[key]).length));
  return fmt;
};

Date.prototype.getYearWeek = function() {
  const date2 = new Date(this.getFullYear(), 0, 1);
  let day1 = this.getDay();
  if (day1 === 0) day1 = 7;
  let day2 = date2.getDay();
  if (day2 === 0) day2 = 7;
  const d = Math.round((this.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000);
  return Math.ceil(d / 7) + 1;
};
