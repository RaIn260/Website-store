<template>
  <div class="product-page">

    <div v-if="product" class="product-container">

      <div class="image-block">
        <img :src="product.image_url" alt="">
      </div>

      <div class="info-block">

        <h1>{{ product.name }}</h1>

        <p class="artist">
          {{ product.artist }}
        </p>

        <p class="price">
          {{ product.price }} $
        </p>

        <p
          class="stock"
          :class="{ available: product.stock > 0 }"
        >
          {{ product.stock > 0
            ? 'В наличии'
            : 'Нет в наличии'
          }}
        </p>

        <div class="description">
          <h3>Описание</h3>

          <p>
            {{ product.description }}
          </p>

          <p>
            <strong>Категория:</strong>
            {{ product.category }}
          </p>

          <p>
            <strong>Артист:</strong>
            {{ product.artist }}
          </p>
        </div>

        <button
          class="cart-btn"
          @click="addToCart"
        >
          Добавить в корзину
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

const route = useRoute()

const authStore = useAuthStore()
const cartStore = useCartStore()

const product = ref(null)

onMounted(async () => {

  const response = await fetch(
    `http://localhost:3000/api/products/${route.params.id}`
  )

  product.value = await response.json()
})

const addToCart = async () => {

  if (!authStore.isAuthenticated) {
    alert('Для добавления товара в корзину необходимо войти в аккаунт')
    router.push('/auth/login')
    return
  }

  await cartStore.addToCart(product.value.id)
}
</script>

<style scoped>

.product-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
}

.product-container {
  display: grid;
  grid-template-columns: 500px 1fr;
  gap: 50px;
}

.image-block img {
  width: 100%;
  border-radius: 20px;
}

.artist {
  color: #aaa;
  margin-bottom: 15px;
}

.price {
  font-size: 32px;
  font-weight: bold;
  color: #ff0015;
}

.stock {
  margin-top: 15px;
  margin-bottom: 25px;
}

.available {
  color: #00c853;
}

.description {
  margin-top: 20px;
  line-height: 1.7;
}

.cart-btn {
  margin-top: 30px;

  padding: 15px 25px;

  background: #ff0015;
  color: white;

  border: none;
  border-radius: 12px;

  cursor: pointer;

  font-size: 16px;
}

.cart-btn:hover {
  background: #c40011;
}
</style>