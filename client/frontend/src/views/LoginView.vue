<template>
  <div class="login-page">

    <div class="overlay"></div>

    <div class="login-wrapper">

      <!-- БРЕНД (подняли + увеличили) -->
      <div class="brand">
        <span class="brand-dot"></span>
        M-DROP
      </div>

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

    const user = authStore.user

    if (user?.email === 'inna260607@gmail.com') {
      router.push('/admin')
    } else {
      router.push('/profile')
    }

  } catch {

    error.value = '❌ Пользователь не найден или неверный пароль'
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

  background: url("https://images.openai.com/static-rsc-4/4-a4pEc-Zk3nENCsE97UZeLNDYEs33jHQUgBgHa99mRxScuzkVw2j5oMsDOVOQYco1t4T0Y8cax4ezzsURdOHwHGLks2KCI1BRWRtWPb1ExZkAW0T2twdJv_b3dI2Gf6PvaehuySGT2H6cph51_8xra-XuQCGxAISUu1_aV2gUWUTMRc2kcLpkHZEunKx_Ne?purpose=inline")
    center/cover no-repeat;
}

.overlay {
  position: absolute;
  inset: 0;

  background:
    radial-gradient(circle at top,
      rgba(255, 0, 21, 0.25),
      transparent 60%),
    rgba(0, 0, 0, 0.55);
}

.login-wrapper {
  position: relative;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.brand {
  font-size: 42px;       /* ↑ больше */
  letter-spacing: 10px;  /* стильнее */
  font-weight: 200;

  color: white;

  display: flex;
  align-items: center;
  gap: 14px;

  margin-bottom: 10px;   /* ↑ выше от карточки */

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

/* button */
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