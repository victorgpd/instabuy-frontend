import { configureStore } from '@reduxjs/toolkit'
import productReducer from './reducers/productReducer'
import globalReducer from './reducers/globalReducer'

export const store = configureStore({
  reducer: {
    productReducer,
    globalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
