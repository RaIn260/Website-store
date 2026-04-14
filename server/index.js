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

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
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
  const { data, error } = await supabase
  .from('products')
  .select('*')
  .order('created_at', {ascending: false})  // сортировка по дате создания и убыванию

  if(error) return res.status(400).json(error)

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
