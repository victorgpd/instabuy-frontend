import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { ProductType } from '../../../shared/types/ProductType'
import { setProductsAction } from '.'
import { fetchProducts } from '../../../shared/functions/connectionAPI'

export const useProductReducer = () => {
  const dispatch = useDispatch()
  const { products } = useAppSelector((state) => state.productReducer)

  const setProducts = (
    update: ProductType[] | ((prev: ProductType[]) => ProductType[])
  ) => {
    if (typeof update === 'function') {
      dispatch(setProductsAction(update(products)))
    } else {
      dispatch(setProductsAction(update))
    }
  }

  const searchProducts = async () => {
    const fetchedProducts = await fetchProducts()
    setProducts(fetchedProducts)
  }

  return {
    products,
    setProducts,
    searchProducts,
  }
}
