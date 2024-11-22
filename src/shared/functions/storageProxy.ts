function getCookie(name: string) {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim()
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length)
    }
  }
  return null
}

export const setItemStorage = (key: string, value: string, time: number) =>
  (document.cookie = `${key}=${value}; path=/; max-age=${time}`)

export const removeItemStorage = (key: string) =>
  (document.cookie = `${key}=; path=/; max-age=0`)

export const getItemStorage = (key: string) => getCookie(key)
