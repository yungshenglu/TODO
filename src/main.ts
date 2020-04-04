import Vue from 'vue';
import App from './App.vue';
import store from './store';

// Import Ant-design as UI components
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
