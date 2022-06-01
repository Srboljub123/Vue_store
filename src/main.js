import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import moment from 'moment'
import axios from 'axios';
import './assets/css/global.css';




moment.locale('it');


const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}


Vue.component('font-awesome-icon', FontAwesomeIcon)


// Date Filter
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})


//remove from dash vertical

Vue.filter('formatProductName', function(value) {
  if (value) {
    return value.replace(/\|.*/,'');
  }
})


Vue.filter('priceFilter', function (value) {
  value = parseFloat(value);
  if (typeof value !== "number") {
      return value;
  }
  var formatter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
  });
  return formatter.format(value);
});

Vue.filter('removeDash', function(value) {
  if (value) {
    return value.replace(/-/g, " ");
  }
})



Vue.config.productionTip = false



new Vue({
  router,
  store: store,
  render: function (h) { return h(App) }
}).$mount('#app')
