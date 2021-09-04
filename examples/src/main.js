import Vue from 'vue'
import App from './App.vue'
// import VueTree from '../../lib'
// import '../../lib/style/index.css'
import VueTree from '../../src/components/Tree/Tree.js'
import '../../src/components/Tree/styles/index.less'
import router from './router'

Vue.component(VueTree.name, VueTree)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
