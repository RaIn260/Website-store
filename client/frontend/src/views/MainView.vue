<template>
  <div class="home">

    <!-- HERO -->
    <section class="hero">

      <div class="hero-content">
        <h1>M-DROP</h1>

        <p>
          Эксклюзивный мерч любимых артистов.
          Ограниченные коллекции, мировая доставка
          и только оригинальная продукция.
        </p>

        <button
          class="catalog-btn"
          @click="$router.push('/catalog')"
        >
          Перейти в каталог
        </button>
      </div>

    </section>

    <!-- НОВЫЙ МЕРЧ -->
    <section class="new-merch">

      <h2>⚡ Последние добавления</h2>

      <div class="products-grid">

        <div
          v-for="product in latestProducts"
          :key="product.id"
          class="product-card"
          @click="goToProduct(product.id)"
        >
          <img
            :src="product.image_url"
            alt=""
          >

          <h3>{{ product.name }}</h3>

          <p class="artist">
            {{ product.artist }}
          </p>

          <p class="price">
            {{ product.price }} $
          </p>
        </div>

      </div>

    </section>

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../stores/products'

const router = useRouter()
const productsStore = useProductsStore()

onMounted(async () => {
  await productsStore.fetchProducts()
})

const latestProducts = computed(() => {
  return productsStore.products.slice(0, 5)
})

const goToProduct = (id) => {
  router.push(`/product/${id}`)
}
</script>

<style scoped>

.home {
  min-height: 100vh;
}

/* HERO */

.hero {
  height: 70vh;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  background:
    linear-gradient(
      rgba(0,0,0,.75),
      rgba(0,0,0,.85)
    ),
    url('https://images.openai.com/static-rsc-4/Ii-ov3WYPz9oqjgWJnKkO_BLo5kvVWL7g8wwi3iE7Z7Z_oNIiycL02Up0PzrzOmb47SlmBvSRzYDmkQGPKlp6iQdDvAUcq_pAOZtqTZdC2PJUXX2nGFFAfhIs8VDIsp7yRAhG6PXAxXHrdmz5Qor5xmIzn3PV7lHTN-cirGptSA?purpose=inline');

  background-size: cover;
  background-position: center;
}

.hero-content {
  max-width: 800px;
}

.hero h1 {
  font-size: 80px;
  letter-spacing: 10px;
  margin-bottom: 20px;

  color: #ff0015;
}

.hero p {
  font-size: 20px;
  color: #ddd;
  margin-bottom: 30px;
}

.catalog-btn {
  padding: 15px 35px;

  border: none;
  border-radius: 12px;

  background: #ff0015;
  color: white;

  font-size: 16px;
  cursor: pointer;

  transition: .3s;
}

.catalog-btn:hover {
  transform: scale(1.05);
}

/* НОВИНКИ */

.new-merch {
  max-width: 1400px;

  margin: 80px auto;
  padding: 0 20px;
}

.new-merch h2 {
  margin-bottom: 40px;
  font-size: 36px;
}

.products-grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(220px, 1fr));

  gap: 25px;
}

.product-card {
  background: #111;

  border-radius: 15px;

  overflow: hidden;

  cursor: pointer;

  transition: .3s;
}

.product-card:hover {
  transform: translateY(-10px);
}

.product-card img {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

.product-card h3 {
  padding: 15px 15px 0;
}

.artist {
  color: #aaa;
  padding: 0 15px;
}

.price {
  padding: 15px;
  color: #ff0015;
  font-weight: bold;
}

</style>