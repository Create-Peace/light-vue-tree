import Vue from 'vue'
import App from './App.vue'
import VueTree from '../../lib'
import '../../lib/style/index.css'
import router from './router'

Vue.use(VueTree)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
