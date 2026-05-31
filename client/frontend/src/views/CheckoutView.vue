<template>
  <div class="checkout-page">

    <h1>Оформление заказа</h1>

    <div class="checkout-layout">

      <!-- Левая часть -->
      <div class="checkout-form">

        <div class="field">
          <label>Имя получателя</label>
          <input
            v-model="name"
            type="text"
            placeholder="Введите имя"
          >
        </div>

        <div class="field">
          <label>Телефон</label>
          <input
            v-model="phone"
            type="text"
            placeholder="+375..."
          >
        </div>

        <div class="field">
          <label>Адрес доставки</label>
          <input
            v-model="address"
            type="text"
            placeholder="Город, улица, дом"
          >
        </div>

        <div class="field">
          <label>Способ оплаты</label>

          <select v-model="paymentMethod">
            <option value="online">
              Картой онлайн
            </option>

            <option value="cash">
              При получении
            </option>
          </select>
        </div>

        <div
          v-if="paymentMethod === 'online'"
          class="field"
        >
          <label>Номер карты</label>

          <input
            v-model="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
          >
        </div>

        <div class="field">
          <label>Комментарий к заказу</label>
            <textarea
                v-model="comment"
                placeholder="Дополнительная информация"
>           </textarea>
        </div>

      </div>

      <!-- Правая часть -->
      <div class="order-summary">

        <h2>Ваш заказ</h2>

        <div
          v-for="item in cart"
          :key="item.id"
          class="summary-item"
        >
          <span>
            {{ item.name }}
            × {{ item.quantity }}
          </span>

          <span>
            {{ item.price * item.quantity }} $
          </span>
        </div>

        <div class="total">
          Итого: {{ totalPrice }} $
        </div>

        <button
          class="confirm-btn"
          @click="confirmOrder"
        >
          Подтвердить заказ
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

const authStore = useAuthStore()
const cartStore = useCartStore()

const name = ref('')
const phone = ref('')
const address = ref('')
const comment = ref('')
const paymentMethod = ref('online')
const cardNumber = ref('')

const cart = computed(() => cartStore.cart)
const totalPrice = computed(() => cartStore.totalPrice)

onMounted(async () => {

  if (!authStore.user) {
    await authStore.getMe()
  }

  if (cartStore.cart.length === 0) {
    await cartStore.fetchCart()
  }

  name.value = authStore.user?.name || ''
  phone.value = authStore.user?.phone || ''
})

const confirmOrder = () => {

  if (!address.value.trim()) {
    alert('Введите адрес доставки')
    return
  }

  if (paymentMethod.value === 'online' && !cardNumber.value.trim()) {
    alert('Введите номер карты')
    return
  }

  const orderData = {
    name: name.value,
    phone: phone.value,
    address: address.value,
    comment: comment.value,

    paymentMethod:
      paymentMethod.value === 'online' ? 'Картой онлайн' : 'При получении',

    cardNumber:
      paymentMethod.value === 'online' ? cardNumber.value : null,

    products: cart.value,
    total: totalPrice.value
}

  console.log('ЗАКАЗ:', orderData)

  alert('Заказ успешно оформлен!')
}
</script>

<style scoped>
.checkout-page {
  max-width: 1300px;
  margin: 0 auto;
  padding: 40px;
}

.checkout-page h1 {
  margin-bottom: 40px;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

.checkout-form,
.order-summary {
  background: #111;
  padding: 25px;
  border-radius: 15px;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
}

.field label {
  margin-bottom: 8px;
}

.field input,
.field textarea,
.field select {
  padding: 12px;
  border: 1px solid #333;
  border-radius: 10px;

  background: #1a1a1a;
  color: white;
}

.field textarea {
  resize: none;
  min-height: 120px;
}

.order-summary h2 {
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.total {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #333;

  font-size: 22px;
  font-weight: bold;
}

.confirm-btn {
  width: 100%;
  margin-top: 25px;

  padding: 14px;

  background: #ff0015;
  color: white;

  border: none;
  border-radius: 12px;

  cursor: pointer;
  font-size: 16px;

  transition: .3s;
}

.confirm-btn:hover {
  background: #c40011;
}
</style>