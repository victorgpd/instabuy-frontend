import { configureStore } from '@reduxjs/toolkit'
import productReducer from './reducers/productReducer'
import globalReducer from './reducers/globalReducer'
import categoriesReducer from './reducers/categoriesReducer'

export const store = configureStore({
  reducer: {
    productReducer,
    globalReducer,
    categoriesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
