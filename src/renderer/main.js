/* eslint-disable no-unused-vars */
import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import 'bulma/css/bulma.css'
import '../../semantic/dist/semantic.min.css'
import '../../static/bulma-divider.css'

import AutoComplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'
import 'vue2-autocomplete-js/dist/style/vue2-autocomplete.css'
import '../print.html'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

Vue.use(AutoComplete)

export const eventBus = new Vue()
