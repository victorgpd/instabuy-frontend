import { useEffect, useState } from 'react'
import { Card } from '../../../shared/components/card/card'
import { FlexContainer } from '../../../shared/components/flexcontainer/flexcontainer.style'
import Screen from '../../../shared/components/screen/screen'
import { SearchBar } from '../../../shared/components/search/search'
import { convertNumberToMoney } from '../../../shared/functions/money'
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer'
import { Spin } from 'antd'
import { fetchProducts } from '../../../shared/functions/connectionAPI'
import useTitle from '../../../shared/hooks/useTitle'

const Home = () => {
  const { products, setProducts } = useProductReducer()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [buscar, setBuscar] = useState(true)

  useTitle('Home')

  useEffect(() => {
    loadProducts()
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

  const loadProducts = async () => {
    if (buscar) {
      setLoading(true)
      const fetchedProducts = await fetchProducts()

      const allItemsPresent = fetchedProducts.filter(
        (productor) => !products.some((product) => product.id === productor.id)
      )

      if (allItemsPresent.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...allItemsPresent])
      } else {
        setBuscar(false)
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
          <FlexContainer
            background="#"
            gap="15px 0"
            justify="center"
            directionwrap="row wrap"
            style={{ maxWidth: '930px', minWidth: '280px' }}
          >
            <SearchBar />
            <FlexContainer
              background="#"
              gap="15px 10px"
              justify="center"
              directionwrap="row wrap"
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
                  cupom={item.cupom}
                  storeImage="src/images/mercadolivre.png"
                />
              ))}
              <FlexContainer
                id="sentinela"
                width="100%"
                background="#"
              ></FlexContainer>
            </FlexContainer>
            {loading && <Spin size="large" />}
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </Screen>
  )
}

export default Home
