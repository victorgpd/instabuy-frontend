import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NotificationType } from '../../../shared/types/NotificationType'

interface GlobalState {
  notification?: NotificationType
}

const initialState: GlobalState = {
  notification: undefined,
}

export const counterSlice = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setNotificationAction: (state, action: PayloadAction<NotificationType>) => {
      state.notification = action.payload
    },
  },
})

export const { setNotificationAction } = counterSlice.actions

export default counterSlice.reducer
