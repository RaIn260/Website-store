<template>
  <div class="catalog">

    <div class="grid">
      <div
        class="card"
        v-for="product in products"
        :key="product.id"
        @click="goToProduct(product.id)"
      >
        <img :src="product.image_url" alt="" />

        <h3>{{ product.name }}</h3>
        <p class="artist">{{ product.artist }}</p>

        <p class="price">{{ product.price }} ₽</p>

        <button
          class="add-btn"
          @click.stop="addToCart(product)"
        >
           +
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const products = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/products')
    products.value = res.data
  } catch (err) {
    console.error('Ошибка загрузки товаров', err)
  }
})

// пока просто заглушка
const goToProduct = (id) => {
  console.log('Открыть товар:', id)
}

const addToCart = (product) => {
  console.log('Добавлено в корзину:', product)

  // пока просто заглушка
}

</script>

<style scoped>
.catalog {
  padding: 40px;
}

.title {
  font-size: 32px;
  margin-bottom: 30px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.card {
  background: #111;
  border-radius: 12px;
  padding: 15px;
  cursor: pointer;
  transition: 0.4s;
}

.card:hover {
  transform: translateY(-10px);
}

.card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
}

.artist {
  color: #aaa;
  font-size: 14px;
}

.price {
  margin-top: 10px;
  font-weight: bold;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.add-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: #22c55e;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s;
}

.add-btn:hover {
  background: #16a34a;
  transform: scale(1.1);
}
</style>