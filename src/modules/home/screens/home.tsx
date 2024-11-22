import { useEffect, useState } from 'react'
import { Card } from '../../../shared/components/card/card'
import { FlexContainer } from '../../../shared/components/flexcontainer/flexcontainer.style'
import Screen from '../../../shared/components/screen/screen'
import { convertNumberToMoney } from '../../../shared/functions/money'
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer'
import { fetchProducts } from '../../../shared/functions/connectionAPI'
import useTitle from '../../../shared/hooks/useTitle'
import { TitleCategory } from '../styles/home.style'
import { useCategoriesReducer } from '../../../store/reducers/categoriesReducer/useCategoryReducer'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import CarouselOriginal from '../../../shared/components/carouseloriginal/carouseloriginal'
import { SearchBar } from '../../../shared/components/search/search'

const Home = () => {
  useTitle('Home')

  const { products, setProducts } = useProductReducer()
  const { categories, searchCategories, subCategories, searchSubCategories } =
    useCategoriesReducer()
  const [buscar, setBuscar] = useState(true)
  const [loading, setLoading] = useState(false)

  const [slidesToShow, setSlidesToShow] = useState(6)

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  })

  const handleWindowSizeChange = () => {
    if (windowSize.width > 1200) {
      setSlidesToShow(6)
    } else if (windowSize.width <= 1180 && windowSize.width > 970) {
      setSlidesToShow(5)
    } else if (windowSize.width <= 970 && windowSize.width > 790) {
      setSlidesToShow(4)
    } else if (windowSize.width <= 790 && windowSize.width > 610) {
      setSlidesToShow(3)
    } else if (windowSize.width <= 610 && windowSize.width > 425) {
      setSlidesToShow(2)
    } else {
      setSlidesToShow(1)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    handleWindowSizeChange()
  }, [windowSize])

  useEffect(() => {
    searchCategories()
    searchSubCategories()
    loadProducts()
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

  const renderedProductIds = new Set()

  return (
    <Screen>
      <FlexContainer
        background="transparent"
        justify="center"
        padding="10px 15px"
      >
        <FlexContainer
          background="#"
          align="center"
          gap="35px"
          directionwrap="column nowrap"
        >
          <FlexContainer
            background="#"
            maxwidthcontainer="1200px"
            directionwrap="column nowrap"
            gap="5px"
          >
            <SearchBar />
          </FlexContainer>
          {loading && (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
          )}
          {categories.map((category) => (
            <FlexContainer
              key={category.id}
              background="#"
              maxwidthcontainer="1200px"
              directionwrap="column nowrap"
              gap="5px"
            >
              <FlexContainer background="#" maxwidthcontainer="1200px">
                <TitleCategory>{category.name}</TitleCategory>
              </FlexContainer>
              <CarouselOriginal slidesToShow={slidesToShow}>
                {/* Renderizar produtos pela subcategoria */}
                {subCategories
                  .filter(
                    (subcategory) => subcategory.category_id === category.id
                  )
                  .flatMap((subcategory) =>
                    products
                      .filter((item) => item.category === subcategory.id)
                      .filter((item) => {
                        if (renderedProductIds.has(item.id)) {
                          return false
                        }
                        renderedProductIds.add(item.id)
                        return true
                      })
                      .map((item) => (
                        <Card
                          key={item.id}
                          title={item.name}
                          image={item.image}
                          store={item.store}
                          link={item.linkAffiliate}
                          price={convertNumberToMoney(item.price)}
                          priceOld={convertNumberToMoney(item.priceOld)}
                          cupom={item.cupom}
                          storeImage="assets/mercadolivre.png"
                        />
                      ))
                  )}

                {/* Renderizar produtos pela categoria diretamente */}
                {products
                  .filter((item) => item.category === category.id)
                  .filter((item) => {
                    if (renderedProductIds.has(item.id)) {
                      return false
                    }
                    renderedProductIds.add(item.id)
                    return true
                  })
                  .map((item) => (
                    <Card
                      key={item.id}
                      title={item.name}
                      image={item.image}
                      store={item.store}
                      link={item.linkAffiliate}
                      price={convertNumberToMoney(item.price)}
                      priceOld={convertNumberToMoney(item.priceOld)}
                      cupom={item.cupom}
                      storeImage="assets/mercadolivre.png"
                    />
                  ))}
              </CarouselOriginal>
            </FlexContainer>
          ))}
        </FlexContainer>
      </FlexContainer>
    </Screen>
  )
}

export default Home
