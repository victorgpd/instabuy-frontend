import { THEME_KEY } from '../constants'
import { getItemStorage, setItemStorage } from './storageProxy'

export const convertYearForSeconds = (year: number) => {
  return Number(year * 31557600)
}

export const getThemeGlobal = () => {
  getItemStorage(THEME_KEY)
}

export const setThemeGlobal = (theme: string) => {
  setItemStorage(THEME_KEY, theme, convertYearForSeconds(9999))
}
