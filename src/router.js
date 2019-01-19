import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './components/Home.vue'
import Feature1 from './components/Feature1.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        },
        {
            path: '/feature1',
            name: 'feature1',
            component: Feature1
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
});

export default router
