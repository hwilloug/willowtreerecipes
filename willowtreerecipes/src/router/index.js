import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
	path:'/register',
	name: 'Register',
	component: () => import ('@/components/Register.vue')
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: () => import('@/views/Recipes.vue')
  },
  {
    path: '/recipes/:recipeID',
    name: 'RecipePage',
    props: true,
    component: () => import('@/views/RecipePage.vue')
  },
  {
    path: '/new-recipe',
    name: 'AddRecipe',
    component: () => import('@/views/NewRecipe.vue')
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
