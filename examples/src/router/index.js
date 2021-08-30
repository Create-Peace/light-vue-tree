import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from '../views/base/index.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Base
    }
]

const router = new VueRouter({
    routes
  })

export default router