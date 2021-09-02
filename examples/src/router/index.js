import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from '../views/base/index.vue'
import Check from '../views/check/index.vue'
import CheckStrictly from '../views/checkStrictly/index.vue'
import LoadLazy from '../views/loadLazy/index.vue'
import Custom from '../views/custom/index.vue'
import VirtualTree from '../views/virtualTree/index.vue'


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