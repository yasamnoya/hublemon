import Vue from 'vue';
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'taipei-sans-tc';
import 'taipei-sans-tc/dist/Light/TaipeiSansTCBeta-Light.css';
import 'taipei-sans-tc/dist/Bold/TaipeiSansTCBeta-Bold.css';
import 'typeface-noto-sans-tc';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
