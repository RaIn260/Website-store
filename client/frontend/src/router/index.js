import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import CatalogView from '../views/CatalogView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import ProductView from '../views/ProductView.vue'
import { isAdmin } from '../utils/admin'

const routes = [
  { path: '/', component: MainView },
  { path: '/auth/login', component: LoginView },
  { path: '/auth/register', component: RegisterView },
  { path: '/profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/catalog', component: CatalogView },
  { path: '/cart', component: CartView },
  { path: '/checkout', component: CheckoutView},
  { path: '/product/:id', component: ProductView},
  {path: '/admin', name: 'admin', component: () => import('../views/AdminView.vue'), meta: { requiresAdmin: true }}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // 🔐 AUTH CHECK
  if (to.meta.requiresAuth) {
    if (!authStore.token) {
      return next('/')
    }

    if (!authStore.user) {
      await authStore.getMe()
    }
  }

  // 👑 ADMIN CHECK
  if (to.meta.requiresAdmin) {
    const user = authStore.user || JSON.parse(localStorage.getItem('user'))

    if (!user || !isAdmin(user)) {
      return next('/')
    }
  }

  next()
})

export default router