import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { CategoriesType } from '../../../shared/types/CategoriesType'
import { setCategoriesAction, setSubCategoriesAction } from '.'
import {
  fetchCategories,
  fetchSubCategories,
} from '../../../shared/functions/connectionAPI'
import { SubCategoriesType } from '../../../shared/types/SubCategoriesType'

export const useCategoriesReducer = () => {
  const dispatch = useDispatch()
  const { categories, subCategories } = useAppSelector(
    (state) => state.categoriesReducer
  )

  const setCategories = (
    update: CategoriesType[] | ((prev: CategoriesType[]) => CategoriesType[])
  ) => {
    if (typeof update === 'function') {
      dispatch(setCategoriesAction(update(categories)))
    } else {
      dispatch(setCategoriesAction(update))
    }
  }

  const setSubCategories = (
    update:
      | SubCategoriesType[]
      | ((prev: SubCategoriesType[]) => SubCategoriesType[])
  ) => {
    if (typeof update === 'function') {
      dispatch(setSubCategoriesAction(update(subCategories)))
    } else {
      dispatch(setSubCategoriesAction(update))
    }
  }

  const searchCategories = async () => {
    const fetchedCategories = await fetchCategories()
    setCategories(fetchedCategories)
  }

  const searchSubCategories = async () => {
    const fetchedSubCategories = await fetchSubCategories()
    setSubCategories(fetchedSubCategories)
  }
  

  return {
    categories,
    setCategories,
    searchCategories,

    subCategories,
    setSubCategories,
    searchSubCategories,
  }
}
