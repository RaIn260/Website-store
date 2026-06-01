<template>
  <div class="login-page">

    <div class="overlay"></div>

    <div class="login-wrapper">

      <!-- бренд -->
      <div class="brand">
        <span class="brand-dot"></span>
        M-DROP
      </div>

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
          ✔ Вы успешно зарегистрировались
        </p>

        <p v-if="error" class="error">
          {{ error }}
        </p>

        <p class="link" @click="$router.push('/auth/login')">
          Уже есть аккаунт? Войти
        </p>

      </div>

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
    await authStore.register(
    email.value,
    password.value
    )

    success.value = true
    error.value = ''

    
    email.value = ''
    password.value = ''
    confirmPassword.value = ''

    // переход на login
    setTimeout(() => {
      router.push('/auth/login')
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

.login-page {
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  background: url("https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=2000&q=80")
    center/cover no-repeat;
}

.overlay {
  position: absolute;
  inset: 0;

  background:
    radial-gradient(circle at top,
      rgba(255, 0, 21, 0.30),
      transparent 45%),
    rgba(0, 0, 0, 0.80);
}

.login-wrapper {
  position: relative;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

/* бренд */
.brand {
  font-size: 42px;
  letter-spacing: 10px;
  font-weight: 200;

  color: white;

  display: flex;
  align-items: center;
  gap: 14px;

  margin-bottom: 10px;

  text-shadow:
    0 0 10px rgba(255, 0, 21, 0.4),
    0 0 30px rgba(255, 0, 21, 0.2);
}

.brand-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff0015;
  box-shadow: 0 0 12px #ff0015;
}

/* карточка */
.card {
  width: 340px;

  padding: 30px;

  background: rgba(17, 17, 17, 0.85);
  border: 1px solid rgba(255, 0, 21, 0.25);

  border-radius: 14px;

  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);

  text-align: center;
}

h1 {
  color: white;
  margin-bottom: 20px;
  font-size: 26px;
}

/* inputs */
input {
  width: 100%;
  padding: 12px;
  margin: 8px 0;

  background: #1b1b1b;
  border: 1px solid #333;
  border-radius: 10px;

  color: white;
  outline: none;
}

input:focus {
  border-color: #ff0015;
  box-shadow: 0 0 10px rgba(255, 0, 21, 0.2);
}

.btn {
  width: 100%;
  padding: 12px;

  margin-top: 10px;

  background: linear-gradient(135deg, #ff0015, #7a000b);
  color: white;

  border: none;
  border-radius: 10px;

  cursor: pointer;

  transition: 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 0, 21, 0.2);
}

.success {
  margin-top: 10px;
  color: #ff0015;
  font-size: 13px;
}

/* error */
.error {
  margin-top: 10px;
  color: #ff3b3b;
  font-size: 13px;
}

/* link */
.link {
  margin-top: 12px;
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  cursor: pointer;
}

.link:hover {
  color: #ff0015;
}

/* mobile */
@media (max-width: 480px) {

  .brand {
    font-size: 28px;
    letter-spacing: 6px;
  }

  .card {
    width: 90%;
    padding: 20px;
  }
}

</style>