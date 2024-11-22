import { useEffect, useState } from 'react'
import useTitle from '../../../../../shared/hooks/useTitle'
import Screen from '../../../../../shared/components/screen/screen'
import Menu from '../../../../../shared/components/menu/menu'
import { FlexContainer } from '../../../../../shared/components/flexcontainer/flexcontainer.style'
import Table, {
  DataSourceType,
} from '../../../../../shared/components/table/table'
import {
  fetchDeleteProducts,
  fetchProducts,
} from '../../../../../shared/functions/connectionAPI'
import { useProductReducer } from '../../../../../store/reducers/productReducer/useProductReducer'
import { Button, Spin } from 'antd'
import { convertNumberToMoney } from '../../../../../shared/functions/money'
import { LoadingOutlined } from '@ant-design/icons'

const RegisteredProducts = () => {
  useTitle('Produtos Cadastrados')
  const { setProducts } = useProductReducer()

  const [loading, setLoading] = useState(false)
  const [display, setDisplay] = useState('none')
  const [dataSource, setDataSource] = useState<DataSourceType[]>([])
  const [productSelected, setProductSelected] = useState<DataSourceType[]>()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      // Obtém os produtos do backend
      const fetchedProducts = await fetchProducts()

      // Atualiza o estado diretamente removendo duplicatas
      setDataSource((prevDataSource) => {
        const existingIds = new Set(prevDataSource.map((product) => product.id))
        const newProducts = fetchedProducts.filter(
          (product) => !existingIds.has(product.id)
        )

        // Mapeia os novos produtos para o formato esperado pelo `dataSource`
        const newDataSource = newProducts.map((product) => ({
          key: product.id,
          id: product.id,
          name: product.name,
          image: product.image,
          category: product.category,
          linkOriginal: product.linkOriginal,
          linkAffiliate: product.linkAffiliate,
          price: `R$ ${convertNumberToMoney(product.price)}`,
          priceOld:
            product.priceOld && product.priceOld > 0
              ? `R$ ${convertNumberToMoney(product.priceOld)}`
              : '',
          cupom: product.cupom,
        }))

        // Combina os produtos existentes com os novos (sem duplicatas)
        return [...prevDataSource, ...newDataSource]
      })

      // Opcional: Atualiza o estado global `products`, se necessário
      setProducts((prevProducts) => {
        const existingIds = new Set(prevProducts.map((product) => product.id))
        const newProducts = fetchedProducts.filter(
          (product) => !existingIds.has(product.id)
        )
        return [...prevProducts, ...newProducts]
      })
    } catch (error) {
      console.error('Erro ao carregar os produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      title: 'ID do Produto',
      dataIndex: 'id',
      key: 'id',
      width: 140,
      render: (text: string) => (
        <span style={{ color: '#1677ff' }}>{text}</span>
      ),
    },
    {
      title: 'Nome do Produto',
      dataIndex: 'name',
      key: 'name',
      width: 500,
      ellipsis: true,
    },
    {
      title: 'Categoria',
      dataIndex: 'category',
      key: 'category',
      width: 135,
    },
    {
      title: 'Preço Original',
      dataIndex: 'priceOld',
      key: 'priceOld',
      width: 150,
      render: (text: string) => (
        <span
          style={{
            color: 'rgb(148, 153, 156)',
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
    {
      title: 'Link de Afiliado',
      dataIndex: 'linkAffiliate',
      key: 'linkAffiliate',
      ellipsis: true,
      render: (text: string) => (
        <a href={text} target="_blank">
          {text}
        </a>
      ),
    },
  ]

  const deleteProducts = async () => {
    if (productSelected && productSelected.length > 0) {
      setLoading(true)
      try {
        await fetchDeleteProducts(productSelected[0].id)

        setDataSource((prevDataSource) =>
          prevDataSource.filter(
            (product) => product.id !== productSelected[0].id
          )
        )

        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productSelected[0].id)
        )
      } catch (error) {
        console.error('Erro ao excluir o produto:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Screen stateMenu={display} setStateMenu={setDisplay}>
      <Menu display={display} currentKey="product1" />
      <FlexContainer
        directionwrap="column nowrap"
        background="#"
        padding="15px"
        gap="15px"
        justify="center"
        align="center"
      >
        {loading && (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        )}
        <FlexContainer background="#" gap="10px">
          <Button color="primary" variant="outlined">
            Novo
          </Button>
          <Button color="primary" variant="outlined">
            Editar
          </Button>
          <Button color="primary" onClick={loadProducts} variant="outlined">
            Atualizar
          </Button>
          <Button color="danger" onClick={deleteProducts} variant="outlined">
            Excluir
          </Button>
          <Button color="danger" variant="outlined">
            Excluir Tudo
          </Button>
        </FlexContainer>
        <FlexContainer overflow="scroll" padding="20px">
          <Table
            width="100%"
            height="100%"
            maxheight="750px"
            setProductSelected={setProductSelected}
            dataSource={dataSource} // Usa o estado atualizado corretamente
            columns={columns}
          />
        </FlexContainer>
      </FlexContainer>
    </Screen>
  )
}

export default RegisteredProducts
