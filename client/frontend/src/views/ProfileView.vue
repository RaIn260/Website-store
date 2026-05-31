<template>
  <div class="page">

    <main class="content">

      <div class="profile-layout">

        <!-- Аватар -->
        <div class="avatar-placeholder">
          <span>
            {{
              user.name
                ? user.name[0].toUpperCase()
                : user.email
                  ? user.email[0].toUpperCase()
                  : '?'
            }}
          </span>
        </div>

        <!-- Информация -->
        <div class="form-block">

          <div class="field">
            <label>Имя</label>
            <input
              v-model="user.name"
              type="text"
              placeholder="Введите имя"
            />
          </div>

          <div class="field">
            <label>Email</label>
            <input
              :value="user.email"
              type="email"
              readonly
            />
          </div>

          <div class="field">
            <label>Телефон</label>
            <input
              v-model="user.phone"
              type="text"
              placeholder="+375..."
            />
          </div>

          <div class="actions">
            <button
              class="save-btn"
              @click="save"
            >
              Сохранить
            </button>

            <button
              class="logout-btn"
              @click="logout"
            >
              Выйти
            </button>
          </div>

        </div>

      </div>

    </main>

    <footer class="footer"></footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const user = ref({
  name: '',
  email: '',
  phone: ''
})

onMounted(async () => {
  try {
    await authStore.getMe()

    user.value = {
      ...authStore.user
    }

  } catch {
    router.push('/')
  }
})

const logout = () => {
  authStore.logout()
  router.push('/')
}

const save = async () => {
  try {
    await authStore.updateProfile({
      name: user.value.name,
      phone: user.value.phone
    })

    user.value = {
      ...authStore.user
    }

    console.log('Сохранено')

  } catch (err) {
    console.log(err)
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

.footer {
  height: 70px;
  border-top: 1px solid #e5e7eb;
  margin-top: auto;
}

.profile-layout {
  display: flex;
  gap: 60px;
  justify-content: center;
  align-items: flex-start;
  margin-top: 120px;
}

/* Аватар */
.avatar-placeholder {
  width: 150px;
  height: 150px;
  margin-top: 50px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
    135deg,
    #ff0015,
    #7a000b
  );

  color: white;

  font-size: 60px;
  font-weight: bold;

  box-shadow:
    0 0 25px rgba(255, 0, 21, 0.4);

  user-select: none;
}

/* Форма */
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
  color: rgba(255,255,255,.7);
}

input {
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

/* Кнопки */
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