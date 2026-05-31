<template>
  <div class="cart-page">

    <h1>Корзина</h1>

    <p v-if="cart.length === 0" class="empty">
      Корзина пуста...
    </p>

    <div v-else class="cart-list">

      <div
        class="cart-item"
        v-for="item in cart"
        :key="item.id"
      >

        <img :src="item.image_url" />

        <div class="info">
          <h3>{{ item.name }}</h3>
          <p>{{ item.artist }}</p>
          <p>{{ item.price }} $</p>
        </div>

        <div class="quantity">
          <button @click="decrease(item)">-</button>

          <span>{{ item.quantity }}</span>

          <button @click="increase(item)">+</button>
        </div>

        <button
          class="remove"
          @click="remove(item.cart_id)"
        >
          ✖
        </button>

      </div>

    </div>

    <div
      v-if="cart.length > 0"
      class="total"
    >
      <h2>К оформлению: {{ totalPrice }} $</h2>

      <button
        class="checkout-btn"
        @click="goToCheckout"
      >
        Оформить заказ
      </button>
    </div>

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cartStore = useCartStore()

const cart = computed(() => cartStore.cart)

const totalPrice = computed(() => cartStore.totalPrice)

onMounted(async () => {
  await cartStore.fetchCart()
})

const increase = (item) => {
  item.quantity++
}

const decrease = (item) => {
  if (item.quantity > 1) {
    item.quantity--
  } else {
    remove(item.cart_id)
  }
}

const remove = async (id) => {
  await cartStore.removeFromCart(id)
}

const goToCheckout = () => {
  router.push('/checkout')
}
</script>

<style scoped>
.cart-page {
  padding: 40px;
}

h1 {
  margin-bottom: 30px;
}

.empty {
  margin-top: 20px;
  color: #777;
}

.cart-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  background: #130000;
  padding: 20px;
  border-radius: 15px;
  gap: 30px;
}

.cart-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.info {
  flex: 1;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity button {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.remove {
  background: transparent;
  color: #ff0015;
  border: none;
  cursor: pointer;
  font-size: 30px;
  transition: 0.3s;
}

.remove:hover {
  color: #b80312d2;
}

.total {
  margin-top: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkout-btn {
  padding: 14px 28px;

  background: #ff0015;
  color: white;

  border: none;
  border-radius: 12px;

  font-size: 16px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.3s;
}

.checkout-btn:hover {
  background: #b80312d2;
  transform: translateY(-2px);
}
</style>