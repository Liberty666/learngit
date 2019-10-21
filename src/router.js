import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/find',
      component: () => import('./views/Find.vue')
    },
    {
      path: '/order',
      component: () => import('./views/Order.vue')
    },
    {
      path: '/me',
      component: () => import('./views/Me.vue')
    },
    {
      path: '/me/login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/msite',
      component: () => import('./views/Msite.vue')
    },
    {
      path: '/detail',
      component: () => import('./views/Detail.vue')
    },
  ]
})
