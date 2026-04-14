<template>
  <div class="container">
    <div class="card">
      <h1>Добро пожаловать 👋</h1>

      <p v-if="email">
        Вы вошли как: <b>{{ email }}</b>
      </p>

      <p v-else>
        Пользователь не найден
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const email = ref('')

onMounted(() => {
  // берём email из localStorage (пока самый простой вариант)
  email.value = localStorage.getItem('email')
})
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f4f6;
}

.card {
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
}
</style>