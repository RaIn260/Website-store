import { defineStore } from 'pinia'
import api from '../api/axios'

export const useProductsStore = defineStore('products', {

  state: () => ({
    products: [],
    loading: false
  }),

  actions: {

    async fetchProducts() {

      try {

        this.loading = true

        const res = await api.get('/api/products')

        this.products = res.data

      } catch (err) {

        console.log(err)

      } finally {

        this.loading = false
      }
    }
  }
})