<template>
  <div class="cart-page">

    <h1>Корзина</h1>

    <p v-if="cart.length === 0" class="empty">
      Корзина пуста...
    </p>

    <!-- Список товаров -->
    <div v-else class="cart-list">

      <div class="cart-item" v-for="item in cart" :key="item.id">

        <img :src="item.image_url" />

        <div class="info">
          <h3>{{ item.name }}</h3>
          <p>{{ item.artist }}</p>
          <p>{{ item.price }} $</p>
        </div>

        <!-- Количество товара -->
        <div class="quantity">
          <button @click="decrease(item)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="increase(item)">+</button>
        </div>

        <button class="remove" @click="remove(item.cart_id)">
          ✖
        </button>

      </div>

    </div>

    <!-- Общая стоимость -->
    <div v-if="cart.length > 0" class="total">
      <h2>К оформлению: {{ totalPrice }} $</h2>
    </div>

  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'

const cart = ref([])

onMounted(async () => {
  const token = localStorage.getItem('token')

  const res = await axios.get('http://localhost:3000/api/cart', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  cart.value = res.data.map(item => ({
  cart_id: item.id,        
  quantity: item.quantity,
  ...item.products 
 }))
})

const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)
})

const increase = (item) => {
  item.quantity++
}

const decrease = (item) => {
  if (item.quantity > 1) {
    item.quantity--
  } else {
    remove(item.id)
  }
}

const remove = async (id) => {
  const token = localStorage.getItem('token')

  await axios.delete(`http://localhost:3000/api/cart/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  cart.value = cart.value.filter(item => item.cart_id !== id)
}

</script>

<style scoped>
.cart-page {
  padding: 40px;
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
  display: flex;  /* в строку */ 
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
  margin-top: 30px;
  font-size: 20px;
}
</style>