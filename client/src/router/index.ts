import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import RecipesView from '@/views/RecipesView.vue'
import ProductsView from '@/views/ProductsView.vue'
import CalenderView from '@/views/CalenderView.vue'
import SettingsView from '@/views/SettingsView.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: RecipesView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  },
  {
    path: '/calender',
    name: 'calender',
    component: CalenderView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
