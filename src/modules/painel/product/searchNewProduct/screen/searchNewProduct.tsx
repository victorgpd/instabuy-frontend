import { useEffect, useState } from 'react'
import { FlexContainer } from '../../../../../shared/components/flexcontainer/flexcontainer.style'
import Screen from '../../../../../shared/components/screen/screen'
import Menu from '../../../../../shared/components/menu/menu'
import Table, { DataSourceType } from '../../../../../shared/components/table/table'
import { fetchNewProducts, fetchProducts, searchProductsMlQ } from '../../../../../shared/functions/connectionAPI'
import { convertNumberToMoney } from '../../../../../shared/functions/money'
import { useProductReducer } from '../../../../../store/reducers/productReducer/useProductReducer'
import { Button, Select, Spin } from 'antd'
import type { SelectProps } from 'antd'
import { useCategoriesReducer } from '../../../../../store/reducers/categoriesReducer/useCategoryReducer'
import { LoadingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { insertRoutesEnum } from '../../insertProduct/routes'
import { useGlobalReducer } from '../../../../../store/reducers/globalReducer/useGlobalReducer'
import { InputInsert } from '../../../../../shared/components/inputs/inputInsert/inputInsert'
import useTitle from '../../../../../shared/hooks/useTitle'

const SearchNewProduct = () => {
  useTitle('Buscar Produtos')

  const navigate = useNavigate()
  const { setNotification } = useGlobalReducer()
  const { products, setProducts } = useProductReducer()
  const { categories, searchCategories, subCategories, searchSubCategories } = useCategoriesReducer()

  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [display, setDisplay] = useState('none')
  const [dataSource, setDataSource] = useState<DataSourceType[]>([])
  const [productSelected, setProductSelected] = useState<DataSourceType[]>()

  const [options, setOptions] = useState<SelectProps['options']>([])

  const columns = [
    {
      title: 'ID do Produto',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      render: (text: string) => <span style={{ color: '#1677ff' }}>{text}</span>,
    },
    {
      title: 'Nome do Produto',
      dataIndex: 'name',
      key: 'name',
      width: 450,
      ellipsis: true,
    },
    {
      title: 'Categoria',
      dataIndex: 'category',
      key: 'category',
      width: 250,
      render: (text: string) => <span>{convertCategoryId(text)}</span>,
    },
    {
      title: 'Preço Original',
      dataIndex: 'priceOld',
      key: 'priceOld',
      width: 150,
      render: (text: string) => (
        <span
          style={{
            color: 'rgb(118, 122, 124)',
            textDecoration: 'line-through',
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
      width: 130,
      render: (text: string) => (
        <span
          style={{
            color: '#e0a800',
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Link Original',
      dataIndex: 'linkOriginal',
      key: 'linkOriginal',
      ellipsis: true,
      render: (text: string) => (
        <a href={text} target="_blank">
          {text}
        </a>
      ),
    },
    // {
    //   title: 'Link de Afiliado',
    //   dataIndex: 'linkAffiliate',
    //   key: 'linkAffiliate',
    //   ellipsis: true,
    //   render: (text: string) => (
    //     <a href={text} target="_blank">
    //       {text}
    //     </a>
    //   ),
    // },
  ]

  useEffect(() => {
    loadProducts()
    searchCategories()
    searchSubCategories()
  }, [])

  useEffect(() => {
    const updatedOptions = categories.map((category) => ({
      label: category.name,
      value: category.id,
    }))
    updatedOptions.push({ label: 'Todas', value: 'all' })
    setOptions(updatedOptions)

    categories.forEach((category) => loadNewProducts(category.id))
  }, [categories])

  const loadProducts = async () => {
    setLoading(true)
    const fetchedProducts = await fetchProducts()

    const allItemsPresent = fetchedProducts.filter((productor) => !products.some((product) => product.id === productor.id))

    if (allItemsPresent.length > 0) {
      setProducts((prevProducts) => [...prevProducts, ...allItemsPresent])
    }
    setLoading(false)
  }

  const loadNewProducts = async (category: string) => {
    setLoading(true)
    const fetchedProducts = await fetchNewProducts(category)

    const allItemsPresent = fetchedProducts.filter((productor) => !products.some((product) => product.id === productor.id))

    if (allItemsPresent.length > 0) {
      const newData: DataSourceType[] = allItemsPresent.map((product) => ({
        key: product.id,
        id: product.id,
        image: product.image,
        name: product.name,
        category: convertCategoryIdSomeCategory(product.category),
        linkOriginal: product.linkOriginal,
        linkAffiliate: '',
        price: `R$ ${convertNumberToMoney(product.price)}`,
        priceOld: product.priceOld ? `R$ ${convertNumberToMoney(product.priceOld)}` : '',
        cupom: '',
      }))

      setDataSource((prevDataSource) => [...prevDataSource, ...newData])
    }
    setLoading(false)
  }

  const convertCategoryId = (categoryId: string) => {
    for (let category of categories) {
      if (category.id === categoryId) {
        return category.name
      }
    }

    return 'Mais categorias'
  }

  const convertCategoryIdSomeCategory = (categoryId: string) => {
    for (let category of categories) {
      for (let subCategory of subCategories) {
        if (subCategory.id == categoryId && category.id == subCategory.category_id) {
          return category.id
        }
      }
    }

    return 'MLB1953'
  }

  const navigateInsertProduct = () => {
    if (productSelected) {
      window.open(productSelected[0].linkOriginal)
      navigate(insertRoutesEnum.INSERT_URL, { state: { productSelected } })
    } else {
      setNotification('Nenhum produto selecionado...', 'error', 'Selecione um produto para continuar para tela de cadastrar!')
    }
  }

  const handleChange = (value: string[]) => {
    console.log(`${value}`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setSearch(value)
  }

  const handleSearch = async () => {
    if (search != '') {
      setLoading(true)
      setDataSource([])

      const fetchedProducts = await searchProductsMlQ(search)

      const allItemsPresent = fetchedProducts.filter((productor) => !products.some((product) => product.id === productor.id))

      if (allItemsPresent.length > 0) {
        const newData: DataSourceType[] = allItemsPresent.map((product) => ({
          key: product.id,
          id: product.id,
          image: product.image,
          name: product.name,
          category: convertCategoryIdSomeCategory(product.category),
          linkOriginal: product.linkOriginal,
          linkAffiliate: '',
          price: `R$ ${convertNumberToMoney(product.price)}`,
          priceOld: product.priceOld ? `R$ ${convertNumberToMoney(product.priceOld)}` : '',
          cupom: '',
        }))
        setDataSource((prevDataSource) => [...prevDataSource, ...newData])
      }

      setLoading(false)
    } else {
      setNotification('Digite o nome do produto...', 'error')
    }
  }

  return (
    <Screen stateMenu={display} setStateMenu={setDisplay}>
      <Menu display={display} currentKey="product3" />
      <FlexContainer directionwrap="column nowrap" background="#" padding="15px" gap="15px" justify="center" align="center">
        {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />}
        <FlexContainer directionwrap="row wrap" maxheightcontainer="130px" height="#" background="#" gap="10px">
          <FlexContainer width="400px" height="55px" background="#" gap="10px" align="flex-end">
            <FlexContainer maxwidthcontainer="300px" gap="10px" background="#">
              <InputInsert name="q" title="Nome do Produto" value={search} onChange={(e) => handleInputChange(e)} onEnter={handleSearch} />
            </FlexContainer>
            <Button onClick={handleSearch} color="primary" variant="outlined">
              Pesquisar
            </Button>
          </FlexContainer>
          <FlexContainer width="400px" background="#" height="55px" gap="10px" align="flex-end">
            <FlexContainer maxwidthcontainer="300px" directionwrap="column nowrap" gap="3px" background="#">
              <span>Selecionar a categoria:</span>
              <Select mode="multiple" allowClear style={{ width: '100%' }} placeholder="Selecione as categorias" defaultValue={['Todas']} onChange={handleChange} options={options} />
            </FlexContainer>
            <Button onClick={navigateInsertProduct} color="primary" variant="outlined">
              Adicionar
            </Button>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer overflow="scroll" directionwrap="column nowrap" align="center" padding="20px" gap="10px">
          <Table width="100%" height="100%" maxheight="720px" setProductSelected={setProductSelected} dataSource={dataSource} columns={columns} />
        </FlexContainer>
      </FlexContainer>
    </Screen>
  )
}

export default SearchNewProduct
