import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false;

Vue.filter('CHF', function (value) {
  return value == 0 ? '' : Number.parseFloat(value).toFixed(2) + ' CHF';
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
