import { useEffect, useState } from 'react'
import { Card } from '../../../shared/components/card/card'
import { Filter } from '../../../shared/components/filter/filter'
import { FlexContainer } from '../../../shared/components/flexcontainer/flexcontainer.style'
import Screen from '../../../shared/components/screen/screen'
import { SearchBar } from '../../../shared/components/search/search'
import { SelectProps, Spin } from 'antd'
import { searchProductsDB } from '../../../shared/functions/connectionAPI'
import { convertNumberToMoney } from '../../../shared/functions/money'
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer'
import { useLocation, useNavigate } from 'react-router-dom'
import { homeRoutesEnum } from '../../home/routes'
import { LoadingOutlined } from '@ant-design/icons'
import useTitle from '../../../shared/hooks/useTitle'
import NoResults from '../../../shared/components/noresults/noresults'
import { useCategoriesReducer } from '../../../store/reducers/categoriesReducer/useCategoryReducer'
import { ProductType } from '../../../shared/types/ProductType'
import { ResultTitle } from '../styles/search.style'

export const SearchPage = () => {
  useTitle('Pesquisar')

  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const q = queryParams.get('q')

  const { products, setProducts } = useProductReducer()
  const { categories, searchCategories } = useCategoriesReducer()

  const [page, setPage] = useState(0)
  const [buscar, setBuscar] = useState(true)
  const [productFiltered, setProductFiltered] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!q) {
      return navigate(homeRoutesEnum.HOME_URL)
    }
    setProducts([])
  }, [])

  useEffect(() => {
    const item = document.querySelector('#sentinela')
    if (item) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPage((prevPage) => prevPage + 1)
        } else {
          setLoading(false)
        }
      })

      intersectionObserver.observe(item)

      return () => intersectionObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    loadProducts(page)
  }, [page])

  const loadProducts = async (page: number) => {
    if (buscar) {
      setLoading(true)
      if (q) {
        const fetchedProducts = await searchProductsDB(q, page)

        const allItemsPresent = fetchedProducts.filter((productor) => !products.some((product) => product.id === productor.id))

        if (allItemsPresent.length > 0) {
          setProducts((prevProducts) => {
            const newProducts = fetchedProducts.filter((product) => !prevProducts.some((prevProduct) => prevProduct.id === product.id))
            return [...prevProducts, ...newProducts]
          })

          setProductFiltered((prevFiltered) => {
            const newFiltered = fetchedProducts.filter((product) => !prevFiltered.some((prevProduct) => prevProduct.id === product.id))
            return [...prevFiltered, ...newFiltered]
          })
        } else {
          setBuscar(false)
        }
      }
      setLoading(false)
    }
  }

  return (
    <Screen>
      <FlexContainer background="transparent" justify="center" padding="0 15px">
        <FlexContainer padding="15px 0px" gap="30px" background="#" style={{ maxWidth: '1216px' }}>
          <Filter products={products} setprodctfiltered={setProductFiltered} />
          <FlexContainer background="#" width="100%" gap="15px 0" directionwrap="row wrap" style={{ maxWidth: '930px', minWidth: '280px' }}>
            <SearchBar />
            <ResultTitle>Resultados para a busca: {q?.toLocaleUpperCase()}</ResultTitle>
            <FlexContainer background="#" width="100%" gap="15px 5px" directionwrap="row wrap" justify="center">
              {productFiltered.length == 0 ? (
                <NoResults />
              ) : (
                productFiltered.map((item) => (
                  <Card key={item.id} id={item.id} title={item.name} image={item.image} store={item.store} link={item.linkAffiliate} price={convertNumberToMoney(item.price)} priceOld={convertNumberToMoney(item.priceOld)} cupom={item.cupom} storeImage="src/images/mercadolivre.png" />
                ))
              )}

              <FlexContainer height="10px" id="sentinela" width="100%" background="#"></FlexContainer>
            </FlexContainer>
            {loading && <Spin indicator={<LoadingOutlined spin />} size="large" />}
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </Screen>
  )
}

export default SearchPage
