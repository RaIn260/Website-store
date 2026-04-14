<template>
  <div class="page">

    <!-- ОСНОВНОЙ КОНТЕНТ -->
    <main class="content">

      <div class="profile-layout">

        <!-- Аватарка -->
        <div class="avatar-block">
          <div class="avatar-placeholder">
            <span>Фото</span>
          </div>
        </div>

        <!-- Информация -->
        <div class="form-block">

          <div class="field">
            <label>Имя</label>
            <input v-model="user.name" type="text" placeholder="Введите имя" />
          </div>

          <div class="field">
            <label>Email</label>
            <input :value="user.email" type="email" readonly />
          </div>

          <div class="field">
            <label>Телефон</label>
            <input v-model="user.phone" type="text" placeholder="+375..." />
          </div>

          <div class="actions">
            <button class="save-btn" @click="save">
              Сохранить
            </button>

            <button class="logout-btn" @click="logout">
              Выйти
            </button>
          </div>

        </div>

      </div>
    </main>

    <!-- FOOTER (пока пусто) -->
    <footer class="footer"></footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref({
  name: '',
  email: '',
  phone: ''
})

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')

    const res = await axios.get('http://localhost:3000/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    user.value = res.data
  } catch {
    router.push('/')
  }
})

const logout = () => {
  localStorage.removeItem('token')
  router.push('/auth/login')
}

const save = async () => {
  try {
  const token = localStorage.getItem('token')

  const res = await axios.patch(
    'http://localhost:3000/api/users/me',
    {
      name: user.value.name,
      phone: user.value.phone
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  user.value = res.data

    console.log('Сохранено')
  } catch (err) {
    console.error(err)
    console.log('Ошибка сохранения ❌')
  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  justify-content: center;
}

/* HEADER / FOOTER */
.header {
  height: 70px;
  border-bottom: 1px solid #e5e7eb;
}

.footer {
  height: 70px;
  border-top: 1px solid #e5e7eb;
  margin-top: auto;
}

.profile-layout {
  display: flex;
  gap: 50px;
  align-items: flex-start;
  justify-content: center; /* центр по горизонтали */
  margin-top: 120px;
}

/* AVATAR */
.avatar-block {
  width: 150px;
  margin-top: 45px;
}

.avatar-placeholder {
  width: 150px;
  height: 150px;
  border: 2px dashed #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 15px;
}

/* FORM */
.form-block {
  flex: 1;
  max-width: 400px;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-size: 14px;
  margin-bottom: 5px;
  color: #ffffffb1;
}

input {
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

/* BUTTONS */
.actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.save-btn {
  padding: 10px 20px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.save-btn:hover {
  background: #132f6a;
}

.logout-btn {
  padding: 10px 20px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.logout-btn:hover {
  background: #711616;
}
</style>