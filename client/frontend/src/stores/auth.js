import { defineStore } from 'pinia'
import api from '../api/axios'

export const useAuthStore = defineStore('auth', {

  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null,
    isAuthenticated: !!localStorage.getItem('token')
  }),

  getters: {
    isAdmin: (state) => state.user?.email === 'inna260607@gmail.com'
  },

  actions: {

    async register(email, password) {

      const res = await api.post('/api/auth/register', {
        email,
        password
      })

      return res.data
    },

    async login(email, password) {

      const res = await api.post('/api/auth/login', {
        email,
        password
      })

      const token = res.data.session.access_token

      this.token = token
      this.isAuthenticated = true

      localStorage.setItem('token', token)

      await this.getMe()

       return this.user
    },

    async getMe() {

      try {

        const res = await api.get('/api/users/me')

        this.user = res.data

      } catch (err) {

        this.logout()
      }
    },

    async updateProfile(data) {

      const res = await api.patch('/api/users/me', data)

      this.user = res.data
    },

    logout() {

      this.token = ''
      this.user = null
      this.isAuthenticated = false

      localStorage.removeItem('token')
    }
  }
})