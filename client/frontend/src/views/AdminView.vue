<template>
  <div class="admin">

    <!-- ШАПКА -->
    <header class="admin-header">
      <h1>M-DROP Admin</h1>

      <div class="role">
        Admin
      </div>
    </header>

    <!-- КНОПКА ДОБАВИТЬ -->
    <button class="add-btn" @click="openCreate">
      + Добавить товар
    </button>

    <!-- ТАБЛИЦА -->
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Исполнитель</th>
          <th>Категория</th>
          <th>Цена</th>
          <th>Stock</th>
          <th>Действия</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.name }}</td>
          <td>{{ p.artist }}</td>
          <td>{{ p.category }}</td>
          <td>{{ p.price }}</td>
          <td>{{ p.stock }}</td>

          <td>
            <button @click="editProduct(p)">Редактировать</button>
            <button @click="deleteProduct(p.id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ФОРМА -->
    <div v-if="showForm" class="modal">

      <div class="modal-content">

        <h2>{{ editMode ? 'Редактировать' : 'Добавить' }}</h2>

        <input v-model="form.name" placeholder="Название" />
        <input v-model="form.artist" placeholder="Исполнитель" />
        <input v-model="form.category" placeholder="Категория" />
        <input v-model.number="form.price" placeholder="Цена" />
        <input v-model.number="form.stock" placeholder="Stock" />
        <input v-model="form.image_url" placeholder="Image URL" />

        <button @click="saveProduct">
          Сохранить
        </button>

        <button @click="closeForm">
          Отмена
        </button>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'

const products = ref([])

const showForm = ref(false)
const editMode = ref(false)

const form = ref({
  name: '',
  artist: '',
  category: '',
  price: 0,
  stock: 0,
  image_url: ''
})

const fetchProducts = async () => {
  const res = await api.get('/api/products')
  products.value = res.data
}

onMounted(fetchProducts)

const openCreate = () => {
  editMode.value = false
  form.value = {}
  showForm.value = true
}

const editProduct = (p) => {
  editMode.value = true
  form.value = { ...p }
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
}

const saveProduct = async () => {
  if (editMode.value) {
    await api.patch(`/api/products/${form.value.id}`, form.value)
  } else {
    await api.post('/api/products', form.value)
  }

  showForm.value = false
  fetchProducts()
}

const deleteProduct = async (id) => {
  await api.delete(`/api/products/${id}`)
  fetchProducts()
}
</script>

<style scoped>
.admin {
  padding: 40px;
  color: white;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.role {
  padding: 2px 5px;
  border-radius: 1px;
}

.add-btn {
  margin-bottom: 20px;
  padding: 10px;
  background: #ff0015;
  color: white;
  border: none;
  cursor: pointer;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 10px;
  border-bottom: 1px solid #333;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #111;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
}

input {
  padding: 8px;
  background: #222;
  border: 1px solid #444;
  color: white;
}
</style>