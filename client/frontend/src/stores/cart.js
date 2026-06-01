import { defineStore } from 'pinia'
import api from '../api/axios'

export const useCartStore = defineStore('cart', {

  state: () => ({
    cart: []
  }),

  getters: {

    totalPrice: (state) => {

      return state.cart.reduce((sum, item) => {
        return sum + item.price * item.quantity
      }, 0)
    },

    cartCount: (state) => {
     return state.cart.reduce((sum, item) => {
      return sum + item.quantity
      }, 0)
    }
  },

  actions: {

    async fetchCart() {

      const res = await api.get('/api/cart')

      this.cart = res.data.map(item => ({
        cart_id: item.id,
        quantity: item.quantity,
        ...item.products
      }))
    },

    async addToCart(productId) {

      await api.post('/api/cart', {
        product_id: productId
      })

      await this.fetchCart()
    },

    async removeFromCart(id) {

      await api.delete(`/api/cart/${id}`)

      this.cart = this.cart.filter(item => item.cart_id !== id)
    }

    
  }
})