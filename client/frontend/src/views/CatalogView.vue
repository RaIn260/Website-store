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

      <button
        class="reset-btn"
        @click="resetFilters"
      >
        Сбросить фильтры
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
import {
  ref,
  computed,
  onMounted,
  watch
} from 'vue'

import { useRouter } from 'vue-router'

import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'

const router = useRouter()

const productsStore = useProductsStore()
const cartStore = useCartStore()

const search = ref('')
const selectedArtist = ref('')
const selectedCategory = ref('')
const minPrice = ref(0)
const maxPrice = ref(100000)
const sortType = ref('')

onMounted(async () => {
  await productsStore.fetchProducts()
})

watch(search, async (newValue) => {
  await productsStore.fetchProducts(newValue)
})

const artists = computed(() => {
  return [
    ...new Set(
      productsStore.products.map(
        product => product.artist
      )
    )
  ]
})

const categories = computed(() => {
  return [
    ...new Set(
      productsStore.products.map(
        product => product.category
      )
    )
  ]
})

const filteredProducts = computed(() => {

  let result = [...productsStore.products]

  const min = minPrice.value || 0
  const max = maxPrice.value || 100000000

  if (selectedArtist.value) {
    result = result.filter(product =>
      product.artist === selectedArtist.value
    )
  }

  if (selectedCategory.value) {
    result = result.filter(product =>
      product.category === selectedCategory.value
    )
  }

  result = result.filter(product =>
    product.price >= min &&
    product.price <= max
  )

  if (sortType.value === 'asc') {
    result.sort((a, b) =>
      a.price - b.price
    )
  }

  if (sortType.value === 'desc') {
    result.sort((a, b) =>
      b.price - a.price
    )
  }

  return result
})

const resetFilters = () => {
  search.value = ''
  selectedArtist.value = ''
  selectedCategory.value = ''
  minPrice.value = 0
  maxPrice.value = 100000
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
  transition: .4s;
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
  transition: .3s;
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

вот мой бэк:
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')  // чтобы считать req.body
const { createClient } = require('@supabase/supabase-js')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const supabase = createClient(
  'https://ebshahisftvdcmgkhgzp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVic2hhaGlzZnR2ZGNtZ2toZ3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNTkxMjEsImV4cCI6MjA5MDczNTEyMX0.PRnN6LGlZ7z9ZUG3DgCtT1h1B9jAIYTl75WeUy5nZ_s'
)

// Проверка авторизации пользователя
const authMiddleware = async (req, res, next) => {

  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data?.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  req.user = data.user
  next()
}

// Регистрация
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body

  console.log("REGISTER REQUEST:", email, password)

  // Валидация

  if(!email || !password){
    return res.status(400).json({message: 'Email и пароль обязательны!'})
  }

  if(password.length < 6){
    return res.status(400).json({message: 'Пароль должен быть не менее 6 символов!'}) 
  }

  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'Email введен некорректно!' })
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  console.log("REGISTER DATA:", data)
  console.log("REGISTER ERROR:", error)

  if (error) {
  return res.status(400).json({
    message: error.message
  })
}

const { data: insertData, error: insertError } = await supabase.from('users').insert([
  {
    id: data.user.id,
    email: data.user.email,
    name: '',
    phone: ''
  }
])

console.log('INSERT ERROR:', insertError)
console.log('INSERT DATA:', insertData)

  res.json(data)
})

// Вход
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return res.status(400).json({
      message: error.message
    })
  }

  res.json(data)
})

// Получение информации о текущем пользователе
app.get('/api/users/me', authMiddleware, async (req, res) => {
  const userId = req.user.id

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) return res.status(400).json(error)

  res.json(data)
})

// Обновление личной информации пользователя(защищен)
app.patch('/api/users/me', authMiddleware, async (req, res) => {
  const { name, phone} = req.body

  const userId = req.user.id
  console.log('USER ID:', req.user.id)

  const{data, error} = await supabase
  .from('users')
  .update({name, phone})
  .eq('id', userId)
  .select()

if (error) {
  console.log('SUPABASE ERROR FULL:', error)
  return res.status(400).json({
    message: error.message,
    details: error.details,
    hint: error.hint
  })
}

console.log('UPDATE RESULT:', data)
console.log('UPDATE ERROR:', error)

  res.json(data[0])
})


// Получение всех товаров с бд
app.get('/api/products', async (req, res) => {

  const { search } = req.query

  let query = supabase
    .from('products')
    .select('*')

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  const { data, error } = await query.order(
    'created_at',
    { ascending: false }
  )

  if (error) {
    return res.status(400).json(error)
  }

  res.json(data)
})

// Получение определенного товара(по id)
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params  // беру id из URL

  const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('id', id)
  .single()

  if(error) return res.status(400).json(error)

    res.json(data)
})

// Создание товара(защищен)
app.post('/api/products', authMiddleware, async (req, res) => {
  const { name, artist, price, category, image_url, stock, description } = req.body

  const { data, error} = await supabase
  .from('products')
  .insert([
    {
      name,
      artist,
      price,
      category,
      image_url,
      stock,
      description
    }
  ])
  .select()

  if(error) return res.status(400).json(error)

  res.json(data)
})

// Обновление товара(защищен)
app.patch('/api/products/:id', authMiddleware, async (req, res) => {
  const{ id } = req.params

  const{ data, error} = await supabase
  .from('products')
  .update(req.body)
  .eq('id', id)
  .select()

  if(error) return res.status(400).json(error)

  res.json(data)
})

// Удаление товара(защищен)
app.delete('/api/products/:id', authMiddleware, async (req, res) => {
  const{ id } = req.params

  const{data, error} = await supabase
  .from('products')
  .delete()
  .eq('id', id)

  if(error) return res.status(400).json(error)

  res.json(data)
})

// Добавление товара в корзину
app.post('/api/cart', authMiddleware, async (req, res) => {
  const userId = req.user.id
  const { product_id } = req.body

  const { data: existing, error } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', product_id)

  if (error) return res.status(400).json(error)

  if (existing.length > 0) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existing[0].quantity + 1 })
      .eq('id', existing[0].id)
      .select()

    return res.json(data)
  }

  const { data, error: insertError } = await supabase
    .from('cart_items')
    .insert([
      {
        user_id: userId,
        product_id,
        quantity: 1
      }
    ])
    .select()

  if (insertError) return res.status(400).json(insertError)

  res.json(data)
})

// Получение товаров из корзины
app.get('/api/cart', authMiddleware, async (req, res)=>{
  const userId = req.user.id

  const{ data, error} = await supabase
  .from('cart_items')
  .select(`
    id,
    quantity,
    products(*)
    `)
  .eq('user_id', userId)

  res.json(data)
})

// Удаление товара из корзины
app.delete('/api/cart/:id', authMiddleware, async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  // Проверка существует ли товар в корзине
  const { data: existing, error: checkError } = await supabase
    .from('cart_items')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)

  // Удаление
  const { data, error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)
    .select()

  if (error) {
    return res.status(400).json(error)
  }

  res.json({
    success: true,
    deleted: data
  })
})

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
})

вот мой продукт.джс:
import { defineStore } from 'pinia'
import api from '../api/axios'

export const useProductsStore = defineStore('products', {

  state: () => ({
    products: [],
    loading: false
  }),

  actions: {

    async fetchProducts(search = '') {

      try {

        this.loading = true

        const res = await api.get('/api/products',{params: {search}}
        )

        this.products = res.data
      } catch (err) {

        console.log(err)

      } finally {

        this.loading = false
      }
    }
  }
})
