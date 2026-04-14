<template>
  <div class="container">
    <div class="card">
      <h1>Регистрация</h1>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        @input="clearMessage"
      />
 
      <input
        v-model="password"
        type="password"
        placeholder="Пароль"
        @input="clearMessage"
      />

      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Повторите пароль"
        @input="clearMessage"
      />

      <button class="btn" @click="register">
        Зарегистрироваться
      </button>


      <p v-if="success" class="success">
        ✅ Вы успешно зарегистрировались
      </p>

      <p v-if="error" class="error">
        {{ error }}
      </p>

      <p class="link" @click="$router.push('/')">
        Уже есть аккаунт? Войти
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const success = ref(false)
const error = ref('')

const clearMessage = () => {
  error.value = ''
  success.value = false
}

const register = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = '❌ Пароли не совпадают'
    return
  }

  try {
    await axios.post('/api/auth/register', {
      email: email.value,
      password: password.value
    })

    success.value = true
    error.value = ''

    
    email.value = ''
    password.value = ''
    confirmPassword.value = ''

    // переход на login
    setTimeout(() => {
      router.push('/')
    }, 1000)

  } catch (err) {
  const message = err.response?.data?.message

  console.log('REGISTER ERROR:', message)

  if (message?.toLowerCase().includes('already')) {
    error.value = '❌ Такой аккаунт уже существует'
  } else {
    error.value = message || '❌ Ошибка регистрации'
  }
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
  background: #05c887;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn:hover {
  background: #04875e;
}

h1 {
  font-family: 'Сans-serif', sans-serif;
  color: #111827;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.link {
  margin-top: 10px;
  font-size: 13px;
  color: #150000a0;
  cursor: pointer;
}

.success {
  margin-top: 10px;
  color:  #08c505;
  font-size: 13px;
}

.error {
  margin-top: 10px;
  color: #dc2626;
  font-size: 13px;
}
</style>