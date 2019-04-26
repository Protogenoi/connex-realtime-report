import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://192.168.1.184/Wallboards/JSON';
//axios.defaults.headers.get['Accepts'] = 'application/json';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
