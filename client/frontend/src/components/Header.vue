<template>
  <header class="header">
    <div class="header-inner">

      <!-- Логотип -->
      <div class="logo" @click="$router.push('/home')">
        <span class="logo-main">M</span>-DROP
      </div>

      <!-- Меню -->
      <nav class="nav">
        <span @click="$router.push('/catalog')">Каталог</span>
        <span @click="$router.push('/search')">Поиск</span>
      </nav>

      <!-- ПРАВАЯ ЧАСТЬ -->
      <div class="actions">

        <!-- Корзина -->
        <div class="cart" @click="$router.push('/cart')">
          🛒
          <span v-if="cartCount > 0" class="cart-count">
            {{ cartCount }}
          </span>
        </div>

        <!-- Кнопка войти(пока профиль) -->
        <button class="login-btn" @click="goToLogin">
          Профиль
        </button>

      </div>

    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Проверка авторизован ли пользователь
const isAuth = computed(() => !!localStorage.getItem('token'))

const goToLogin = () => {
  if (isAuth.value) {
    router.push('/profile')
  } else {
    router.push('/')
  }
}
</script>

<style scoped>

.header {
  background: linear-gradient(
    to right,
    rgba(82, 2, 7, 0.3),
    rgba(0, 0, 0, 0.8),
    rgba(82, 2, 7, 0.3)
  );

  border-bottom: 1px solid rgb(82, 2, 7, 0.5);
  box-shadow: 0 10px 40px rgba(146, 0, 0, 0.26);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 30px;
  font-weight: 200;
  letter-spacing: 3px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.logo::before {
  content: "";
  width: 10px;
  height: 10px;
  background: #fd0015;
  border-radius: 80%;
  box-shadow: 0 0 10px #fe0015;
}

.logo-main {
  color: #ff0015;
}

.nav {
  display: flex;
  gap: 40px;
}

.nav span {
  color: #fff;
  cursor: pointer;
  transition: 0.5s;
}

.nav span:hover {
  color: #ff0015;
}

.actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.cart {
  position: relative;
  font-size: 20px;
  cursor: pointer;
  color: #fff;
}

.login-btn {
  padding: 8px 16px;

  background: transparent;
  color: #fff;

  border: 1px solid #ff00156d;
  border-radius: 8px;

  cursor: pointer;
  transition: 0.5s;
}

.login-btn:hover {
  background: #ff0015;
}
</style>