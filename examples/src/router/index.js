import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from '../views/base/index.vue'
const Check = () => import('../views/check/index.vue')
const CheckStrictly = () => import('../views/checkStrictly/index.vue')
const LoadLazy = () => import('../views/loadLazy/index.vue')
const Custom = () => import('../views/custom/index.vue')
const VirtualTree = () => import('../views/virtualTree/index.vue')


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Base
    },
    {
        path: '/check',
        name: 'check',
        component: Check
    },
    {
        path: '/checkStrictly',
        name: 'checkStrictly',
        component: CheckStrictly
    },
    {
        path: '/loadLazy',
        name: 'loadLazy',
        component: LoadLazy
    },
    {
        path: '/custom',
        name: 'custom',
        component: Custom
    },
    {
        path: '/virtualTree',
        name: 'virtualTree',
        component: VirtualTree
    }
]

const router = new VueRouter({
    routes
  })

export default router