export const ADMIN_EMAIL = 'inna260607@gmail.com'

export const isAdmin = (user) => {
  return user?.email === ADMIN_EMAIL
}