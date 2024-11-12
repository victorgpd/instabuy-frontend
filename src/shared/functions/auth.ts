import { NavigateFunction, redirect } from 'react-router-dom'
import {
  getItemStorage,
  removeItemStorage,
  setItemStorage,
} from './storageProxy'
import axios from 'axios'
import { AUTHORIZATION_KEY, URL_API_TOKEN } from '../constants'

export const unsetAuthorizationToken = () => {
  removeItemStorage(AUTHORIZATION_KEY)
}

export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token)
  }
}

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY)

export const verifyLoggedIn = async () => {
  const token = getAuthorizationToken()
  if (!token) {
    return redirect('/login')
  }

  const user = await axios
    .post(URL_API_TOKEN, { accessToken: token })
    .catch((error) => {
      if (error.response.data.message == 'Usuário não encontrado!') {
        unsetAuthorizationToken()
      }
    })

  if (!user) {
    return redirect('/login')
  }

  return null
}

export const verifyLoggedInLogin = async (navigate: NavigateFunction) => {
  const token = getAuthorizationToken()
  if (token) {
    await axios
      .post(URL_API_TOKEN, { accessToken: token })
      .then((response) => {
        if (response.data) {
          navigate('/dashboard/insert')
        }
      })
      .catch((error) => {
        if (error.response.data.message == 'Usuário não encontrado!') {
          unsetAuthorizationToken()
        }
      })
  }

  return null
}

export const logout = (navigate: NavigateFunction) => {
  unsetAuthorizationToken()
  navigate('/login')
}
