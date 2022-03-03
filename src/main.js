import Vue from 'vue'
import App from './App.vue'
import './utils/registerServiceWorker'
import router from './router'
import store from './store'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import './styles/index.css'
import lodash from 'lodash'
import moment from 'moment'
import http from './utils/request'
import storage from './utils/local'
storage.source = localStorage
let local = new storage()

Vue.config.productionTip = false

Vue.prototype.$moment = moment;
Vue.prototype.$local = local
Vue.prototype.$http = http
Vue.use(antd)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
