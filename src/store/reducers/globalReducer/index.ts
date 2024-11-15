import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NotificationType } from '../../../shared/types/NotificationType'
import { UserType } from '../../../shared/types/UserType'

interface GlobalState {
  notification?: NotificationType
  userReducer?: UserType
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
}

export const counterSlice = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setNotificationAction: (state, action: PayloadAction<NotificationType>) => {
      state.notification = action.payload
    },
    setUserAction: (state, action: PayloadAction<UserType>) => {
      state.userReducer = action.payload
    },
  },
})

export const { setNotificationAction, setUserAction } = counterSlice.actions
export default counterSlice.reducer
