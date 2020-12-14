import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router'
import store from './store/'
import {Lazyload} from 'vant';
Vue.use(Lazyload);
import api from './utils/api.js';
Vue.prototype.$api = api;

import img from './utils/img.js'
Vue.prototype.$img = img 
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
