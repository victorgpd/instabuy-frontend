import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NotificationType } from '../../../shared/types/NotificationType'
import { UserType } from '../../../shared/types/UserType'

interface GlobalState {
  notification?: NotificationType
  userReducer?: UserType
  themeReducer?: 'light' | 'dark'
}

const initialState: GlobalState = {
  notification: undefined,
  userReducer: {
    name: '',
    user: '',
    password: '',
    accessToken: '',
    ativo: 'false',
  },
  themeReducer: 'dark',
}

export const globalSlice = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setNotificationAction: (state, action: PayloadAction<NotificationType>) => {
      state.notification = action.payload
    },
    setUserAction: (state, action: PayloadAction<UserType>) => {
      state.userReducer = action.payload
    },
    setThemeAction: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.themeReducer = action.payload
    },
  },
})

export const { setNotificationAction, setUserAction, setThemeAction } =
  globalSlice.actions
export default globalSlice.reducer
