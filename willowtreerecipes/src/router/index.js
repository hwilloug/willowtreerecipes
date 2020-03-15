import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
	path:'/register',
	name: 'Register',
	component: () => import ('@/components/Register.vue')
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: () => import('@/components/Recipes.vue')
  },
  {
    path: '/recipes/:recipeID',
    name: 'RecipeEntry',
    component: () => import('@/components/RecipeEntry.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/PageNotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
