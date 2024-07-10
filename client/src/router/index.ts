import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import RecipesView from '@/views/RecipesView.vue'
import ProductsView from '@/views/ProductsView.vue'
import CalenderView from '@/views/CalendarView.vue'
import SettingsView from '@/views/SettingsView.vue'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
import ItemReview from '@/views/ItemReview.vue'
import RecipeCreator from '@/views/RecipeCreator/RecipeCreator.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
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
    path: '/calendar',
    name: 'calendar',
    component: CalenderView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
  {
    path: '/itemreview',
    name: 'itemreview',
    component: ItemReview
  },
  {
    path: '/recipecreator',
    name: 'recipecreator',
    component: RecipeCreator
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
