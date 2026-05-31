<script setup>
import Header from './components/Header.vue'
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'

import { useAuthStore } from './stores/auth.js'
import { useCartStore } from './stores/cart.js'

const authStore = useAuthStore()
const cartStore = useCartStore()

const route = useRoute()

onMounted(async () => {

  if (authStore.token) {

    await authStore.getMe()

    await cartStore.fetchCart()
  }
})

const showHeader = computed(() => {
  return route.path !== '/' && route.path !== '/auth/register'
})
</script>

<template>
  <Header v-if="showHeader" />
  <router-view />
</template>