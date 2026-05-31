<template>
  <div class="catalog-page">

    <!-- ФИЛЬТРЫ -->
    <aside class="sidebar">

      <div class="filter-block">

        <label>Поиск товара</label>
        <input
        v-model="search"
        type="text"
        placeholder="Введите название..."
        />
      </div>

      <h2>Фильтры</h2>

      <!-- Артист -->
      <div class="filter-block">
        <label>Артист</label>

        <select v-model="selectedArtist">
          <option value="">Все артисты</option>

          <option
            v-for="artist in artists"
            :key="artist"
            :value="artist"
          >
            {{ artist }}
          </option>
        </select>
      </div>

      <!-- Категория -->
      <div class="filter-block">
        <label>Категория</label>

        <select v-model="selectedCategory">
          <option value="">Все категории</option>

          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <!-- Цена -->
      <div class="filter-block">
        <label>Цена от</label>
        <input
          v-model.number="minPrice"
          type="number"
          min="0"
        />
      </div>

      <div class="filter-block">
        <label>Цена до</label>
        <input
          v-model.number="maxPrice"
          type="number"
          min="0"
        />
      </div>

      <!-- Сортировка -->
      <div class="filter-block">
        <label>Сортировка</label>

        <select v-model="sortType">
          <option value="">Без сортировки</option>
          <option value="asc">Цена ↑</option>
          <option value="desc">Цена ↓</option>
        </select>
      </div>

      <button class="reset-btn" @click="resetFilters">
        Сбросить Фильтры
      </button>


    </aside>

    <!-- ТОВАРЫ -->
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
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'

const productsStore = useProductsStore()
const cartStore = useCartStore()

const route = useRoute()
const router = useRouter()

const search = ref('')
const selectedArtist = ref('')
const selectedCategory = ref('')
const minPrice = ref(0)
const maxPrice = ref(100000)
const sortType = ref('')

onMounted(async () => {
  await productsStore.fetchProducts()
})

const artists = computed(() => {
  return [...new Set(
    productsStore.products.map(product => product.artist)
  )]
})

const categories = computed(() => {
  return [...new Set(
    productsStore.products.map(product => product.category)
  )]
})

const filteredProducts = computed(() => {

  let result = [...productsStore.products]

  // Если поле пустое → берём значения по умолчанию
  const min = minPrice.value || 0
  const max = maxPrice.value || 10000000000

  if (search.value) {
    result = result.filter(product =>
      product.name
        .toLowerCase()
        .includes(search.value.toLowerCase())
    )
  } 

  // Фильтр по артисту
  if (selectedArtist.value) {
    result = result.filter(product =>
      product.artist === selectedArtist.value
    )
  }

  // Фильтр по категории
  if (selectedCategory.value) {
    result = result.filter(product =>
      product.category === selectedCategory.value
    )
  }

  // Фильтр по цене
  result = result.filter(product =>
    product.price >= min &&
    product.price <= max
  )

  // Сортировка
  if (sortType.value === 'asc') {
    result.sort((a, b) => a.price - b.price)
  }

  if (sortType.value === 'desc') {
    result.sort((a, b) => b.price - a.price)
  }

  return result
})

const resetFilters = () => {
  selectedArtist.value = ''
  selectedCategory.value = ''
  minPrice.value = 0
  maxPrice.value = 10000000000
  sortType.value = ''
}

const goToProduct = (id) => {
  router.push(`/product/${id}`)
}

const addToCart = async (product) => {
  try {
    await cartStore.addToCart(product.id)
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>

.catalog-page {
  display: flex;
  gap: 30px;
  padding: 40px;
}

/* SIDEBAR */

.sidebar {
  width: 250px;
  flex-shrink: 0;

  background: #111;

  padding: 20px;

  border-radius: 15px;

  height: fit-content;

  border: 1px solid rgba(255, 0, 21, 0.2);
}

.sidebar h2 {
  margin-bottom: 25px;
}

.filter-block {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.filter-block label {
  margin-bottom: 8px;
  color: #aaa;
}

.filter-block select,
.filter-block input {
  padding: 10px;

  background: #1b1b1b;

  color: white;

  border: 1px solid #333;

  border-radius: 10px;
}

/* КАТАЛОГ */

.catalog {
  flex: 1;
}

.grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fill, minmax(200px, 1fr));

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

.reset-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: #2b2b2b;
  color: white;
  cursor: pointer;
  transition: .3s;
}

.reset-btn:hover {
  background: #ff0015;
}
</style>