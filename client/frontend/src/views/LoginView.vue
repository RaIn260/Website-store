<template>
  <div class="container">

    <div class="card">
      <h1>Вход</h1>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        @input="clearError"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Пароль"
        @input="clearError"
      />

      <button class="btn" @click="login">
        Войти
      </button>

      
      <p v-if="error" class="error">
        {{ error }}
      </p>

      <p class="link" @click="$router.push('/auth/register')">
        Нет аккаунта? Зарегистрироваться
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

const clearError = () => {
  error.value = ''
}

const login = async () => {

  try {

    await authStore.login(
      email.value,
      password.value
    )

    router.push('/profile')

  } catch {

    error.value = '❌ Пользователь не найден или неверный пароль'
  }
}

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
  width: 320px;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 15px 15px 15px rgba(0,0,0,0.3);
  text-align: center;
}

input {
  width: 90%;
  padding: 10px;
  margin: 8px 0px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.btn {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background: #b91c1c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn:hover {
  background: #a50707;
}

h1 {
  font-family: 'Сans-serif', sans-serif;
  color: #111827;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 3px;
  margin-bottom: 20px;
}

.link {
  margin-top: 10px;
  font-size: 13px;
  color: #150000a0;
  cursor: pointer;
}

.error {
  margin-top: 10px;
  color: #dc2626;
  font-size: 13px;
}
</style>