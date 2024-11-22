import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CategoriesType } from '../../../shared/types/CategoriesType'
import { SubCategoriesType } from '../../../shared/types/SubCategoriesType'

interface ProductState {
  categories: CategoriesType[]
  subCategories: SubCategoriesType[]
}

const initialState: ProductState = {
  categories: [],
  subCategories: [],
}

export const counterSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategoriesAction: (state, action: PayloadAction<CategoriesType[]>) => {
      state.categories = action.payload
    },
    setSubCategoriesAction: (
      state,
      action: PayloadAction<SubCategoriesType[]>
    ) => {
      state.subCategories = action.payload
    },
  },
})

export const { setCategoriesAction, setSubCategoriesAction } =
  counterSlice.actions
export default counterSlice.reducer
