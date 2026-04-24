import { createRouter, createWebHistory } from 'vue-router'

import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import CatalogView from '../views/CatalogView.vue'

const routes = [
  { path: '/home', component: MainView },
  { path: '/', component: LoginView },
  { path: '/auth/register', component: RegisterView },
  { path: '/profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/catalog', component: CatalogView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

import axios from 'axios'

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth) {
    if (!token) return next('/')

    try {
      await axios.get('http://localhost:3000/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      next()
    } catch {
      localStorage.removeItem('token') 
      next('/')   
     }
  } else {
    next()
  }
})

export default router