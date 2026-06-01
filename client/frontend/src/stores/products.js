import { defineStore } from 'pinia'
import api from '../api/axios'

export const useProductsStore = defineStore('products', {

  state: () => ({
    products: [],
    loading: false
  }),

  actions: {

    async fetchProducts(search = '') {

      try {

        this.loading = true

        console.log('Отправляю запрос:', search)

        const res = await api.get('/api/products',{params: {search}}
        )


        console.log('Ответ сервера:', res.data)
        
        this.products = res.data
      } catch (err) {

        console.log(err)

      } finally {

        this.loading = false
      }
    }
  }
})