import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Agent from './views/Agent'
import Closers from './views/Closers'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
      {
          path: '/Agent',
          name: 'Agent',
          component: Agent
      },
      {
          path: '/Closers',
          name: 'Closers',
          component: Closers
      },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
