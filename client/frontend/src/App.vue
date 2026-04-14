<script setup>
import Header from './components/Header.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const showHeader = computed(() => {
  return route.path !== '/' && route.path !== '/auth/register'
})
</script>

<template>
  <Header v-if="showHeader" />
  <router-view />
</template>