import Vue from 'vue'
import App from './App.vue'
import store from './store'

import styles from './scss/main.scss'

Vue.config.productionTip = false;

Vue.filter('CHF', function (value) {
  const val = Number.parseFloat(value).toFixed(2);
  return value === 0 ? '' : val + ' CHF';
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
