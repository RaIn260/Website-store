<template>
  <div class="search-page">

    <!-- Поиск -->
    <div class="search-box">
      <input
        v-model="search"
        type="text"
        placeholder="Поиск товара..."
        class="search-input"
      />
    </div>

    <!-- Если ничего не найдено -->
    <p
      v-if="filteredProducts.length === 0 && search.length > 0"
      class="empty"
    >
      Ничего не найдено
    </p>

    <!-- Товары -->
    <div class="catalog">

      <div class="grid">

        <div
          class="card"
          v-for="product in filteredProducts"
          :key="product.id"
          @click="goToProduct(product.id)"
        >
          <img :src="product.image_url" alt="" />

          <h3>{{ product.name }}</h3>

          <p class="artist">
            {{ product.artist }}
          </p>

          <p class="price">
            {{ product.price }} $
          </p>

          <button
            class="add-btn"
            @click.stop="addToCart(product)"
          >
            +
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'

const productsStore = useProductsStore()
const cartStore = useCartStore()

const search = ref('')

onMounted(async () => {
  await productsStore.fetchProducts()
})

const filteredProducts = computed(() => {
  return productsStore.products.filter(product =>
    product.name
      .toLowerCase()
      .includes(search.value.toLowerCase())
  )
})

const goToProduct = (id) => {
  console.log('Открыть товар:', id)
}

const addToCart = async (product) => {
  try {
    await cartStore.addToCart(product.id)
    console.log('Товар добавлен')
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>

.search-page {
  padding-top: 40px;
}

/* Поиск */

.search-box {
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
}

.search-input {
  width: 100%;
  max-width: 650px;

  padding: 16px 24px;

  background: rgba(17, 17, 17, 0.95);

  color: white;
  font-size: 16px;

  border: 1px solid rgba(255, 0, 21, 0.25);
  border-radius: 15px;

  outline: none;

  transition: 0.3s;

  box-shadow:
    0 0 20px rgba(255, 0, 21, 0.05),
    inset 0 0 10px rgba(255,255,255,0.03);
}

.search-input::placeholder {
  color: rgba(255,255,255,0.45);
}

.search-input:focus {
  border-color: #ff0015;

  box-shadow:
    0 0 20px rgba(255, 0, 21, 0.35),
    0 0 50px rgba(255, 0, 21, 0.15);
}

/* Каталог */

.catalog {
  padding: 0 40px 40px;
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

.add-btn {
  width: 40px;
  height: 40px;

  border-radius: 50%;
  border: none;

  background: #ff0015;
  color: white;

  font-size: 20px;
  cursor: pointer;

  transition: 0.3s;
}

.add-btn:hover {
  background: #b80312d2;
  transform: scale(1.1);
}

.empty {
  text-align: center;
  margin-bottom: 40px;
  color: #999;
  font-size: 18px;
}

</style>