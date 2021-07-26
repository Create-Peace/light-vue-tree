import Vue from 'vue'
import App from './App.vue'
// import shscUI from 'shsc-ui'

Vue.config.productionTip = false
// Vue.use(shscUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
