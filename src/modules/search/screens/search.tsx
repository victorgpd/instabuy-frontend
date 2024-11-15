import { useEffect, useState } from 'react'
import { Card } from '../../../shared/components/card/card'
import { Filter } from '../../../shared/components/filter/filter'
import { FlexContainer } from '../../../shared/components/flexcontainer/flexcontainer.style'
import Screen from '../../../shared/components/screen/screen'
import { SearchBar } from '../../../shared/components/search/search'
import { Spin } from 'antd'
import { searchProductsDB } from '../../../shared/functions/connectionAPI'
import { convertNumberToMoney } from '../../../shared/functions/money'
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer'
import { useLocation, useNavigate } from 'react-router-dom'
import { homeRoutesEnum } from '../../home/routes'
import { LoadingOutlined } from '@ant-design/icons'
import useTitle from '../../../shared/hooks/useTitle'

export const SearchPage = () => {
  useTitle('Pesquisar')
  const navigate = useNavigate()
  const { products, setProducts } = useProductReducer()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [buscar, setBuscar] = useState(true)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const q = queryParams.get('q')

  useEffect(() => {
    if (!q) {
      return navigate(homeRoutesEnum.HOME_URL)
    }
  }, [])

  useEffect(() => {
    loadProducts(page)
  }, [page])

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

  const loadProducts = async (page: number) => {
    if (buscar) {
      setLoading(true)
      if (q) {
        const fetchedProducts = await searchProductsDB(q, page)

        const allItemsPresent = fetchedProducts.filter(
          (productor) =>
            !products.some((product) => product.id === productor.id)
        )

        if (allItemsPresent.length > 0) {
          setProducts((prevProducts) => [...prevProducts, ...allItemsPresent])
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
        <FlexContainer
          padding="15px 0px"
          gap="36px"
          background="#"
          style={{ maxWidth: '1216px' }}
        >
          <Filter />
          <FlexContainer
            background="#"
            width="100%"
            gap="15px 0"
            justify="center"
            directionwrap="row wrap"
            style={{ maxWidth: '930px', minWidth: '280px' }}
          >
            <SearchBar />
            <FlexContainer
              background="#"
              width="100%"
              gap="15px 10px"
              directionwrap="row wrap"
              justify="center"
            >
              {products.map((item) => (
                <Card
                  key={item.id}
                  title={item.name}
                  image={item.image}
                  store={item.store}
                  link={item.linkAffiliate}
                  price={convertNumberToMoney(item.price)}
                  priceOld={convertNumberToMoney(item.priceOld)}
                  cupom="ESPECIAL40"
                  storeImage="src/images/mercadolivre.png"
                />
              ))}
              <FlexContainer
                id="sentinela"
                width="100%"
                background="#"
              ></FlexContainer>
            </FlexContainer>
            {loading && (
              <Spin indicator={<LoadingOutlined spin />} size="large" />
            )}
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </Screen>
  )
}

export default SearchPage
