import { NavigateFunction, redirect } from 'react-router-dom'
import {
  getItemStorage,
  removeItemStorage,
  setItemStorage,
} from './storageProxy'
import axios from 'axios'
import { AUTHORIZATION_KEY, URL_API_TOKEN } from '../constants'
import { loginRoutesEnum } from '../../modules/login/routes'
import { insertRoutesEnum } from '../../modules/painel/product/insertProduct/routes'
import { UserType } from '../types/UserType'

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
    return redirect(loginRoutesEnum.LOGIN_URL)
  }

  const user = await axios
    .post(URL_API_TOKEN, { accessToken: token })
    .catch((error) => {
      if (error.response.data.message == 'Usuário não encontrado!') {
        unsetAuthorizationToken()
      }
    })

  if (!user) {
    return redirect(loginRoutesEnum.LOGIN_URL)
  }

  return null
}

export const verifyLoggedInLogin = async () => {
  const token = getAuthorizationToken()
  if (token) {
    await axios
      .post(URL_API_TOKEN, { accessToken: token })
      .then((response) => {
        if (response.data) {
          window.location.href = insertRoutesEnum.INSERT_URL
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

export const verified = async (setUserReducer: (user: UserType) => void) => {
  const token = getAuthorizationToken()

  if (token) {
    return await axios
      .post(URL_API_TOKEN, { accessToken: token })
      .then((response) => {
        if (response.data) {
          setUserReducer({
            name: response.data.name,
            user: response.data.user,
            password: '',
            accessToken: response.data.accessToken,
            ativo: response.data.ativo,
          })
          return true
        }
        return false
      })
      .catch(() => {
        unsetAuthorizationToken()
        return false
      })
  }

  return false
}

export const logout = (navigate: NavigateFunction) => {
  unsetAuthorizationToken()
  navigate(loginRoutesEnum.LOGIN_URL)
}
