import { useEffect, useState } from 'react'
import useTitle from '../../../../../shared/hooks/useTitle'
import Screen from '../../../../../shared/components/screen/screen'
import Menu from '../../../../../shared/components/menu/menu'
import { FlexContainer } from '../../../../../shared/components/flexcontainer/flexcontainer.style'
import Table, {
  DataSourceType,
} from '../../../../../shared/components/table/table'
import {
  fetchDeleteAllProducts,
  fetchDeleteProducts,
  fetchProducts,
} from '../../../../../shared/functions/connectionAPI'
import { useProductReducer } from '../../../../../store/reducers/productReducer/useProductReducer'
import { Button, Modal, Spin } from 'antd'
import { convertNumberToMoney } from '../../../../../shared/functions/money'
import { LoadingOutlined } from '@ant-design/icons'
import { useGlobalReducer } from '../../../../../store/reducers/globalReducer/useGlobalReducer'
import { useNavigate } from 'react-router-dom'
import { insertRoutesEnum } from '../../insertProduct/routes'
import { updateRoutesEnum } from '../../updateProduct/routes'
import { useCategoriesReducer } from '../../../../../store/reducers/categoriesReducer/useCategoryReducer'

const RegisteredProducts = () => {
  useTitle('Produtos Cadastrados')

  const navigate = useNavigate()
  const { setNotification } = useGlobalReducer()
  const { setProducts } = useProductReducer()
  const { categories, searchCategories } = useCategoriesReducer()

  const [loading, setLoading] = useState(false)
  const [display, setDisplay] = useState('none')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataSource, setDataSource] = useState<DataSourceType[]>([])
  const [productSelected, setProductSelected] = useState<DataSourceType[]>()

  const columns = [
    {
      title: 'ID do Produto',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      render: (text: string) => (
        <span style={{ color: '#1677ff' }}>{text}</span>
      ),
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
      width: 255,
      render: (text: string) => <span>{convertCategoryId(text)}</span>,
    },
    {
      title: 'Preço Original',
      dataIndex: 'priceOld',
      key: 'priceOld',
      width: 130,
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

  useEffect(() => {
    loadProducts()
    searchCategories()
  }, [])

  const handleUpdate = async () => {
    setDataSource([])
    loadProducts()
  }

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
        setNotification('Produto deletado com sucesso!', 'success')
      } catch (error) {
        setNotification('Erro ao deletar o produto...', 'error')
      } finally {
        setLoading(false)
      }
    }
  }

  const deleteAllProducts = () => {
    setIsModalOpen(true)
  }

  const handleModalOk = async () => {
    try {
      await fetchDeleteAllProducts()
      setDataSource([])

      loadProducts()
      setNotification(
        'Todos os produtos foram deletados com sucesso!',
        'success'
      )
    } catch (error) {
      setNotification('Erro ao deletar todos os produto...', 'error')
    } finally {
      setIsModalOpen(false)
    }
  }

  const handleModalCancel = () => {
    setIsModalOpen(false)
  }

  const handleUpdateProduct = () => {
    if (!productSelected) {
      setNotification('Selecione um produto para editar!', 'error')
    } else {
      navigate(`${updateRoutesEnum.UPDATE_URL}?id=${productSelected[0].id}`)
    }
  }

  const convertCategoryId = (categoryId: string) => {
    for (let category of categories) {
      if (category.id === categoryId) {
        return category.name
      }
    }

    return 'Mais categorias'
  }

  return (
    <Screen stateMenu={display} setStateMenu={setDisplay}>
      <Menu display={display} currentKey="product1" />
      <Modal
        title="Confirmação"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Tem certeza que deseja excluir tudo?</p>
      </Modal>

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
        <FlexContainer background="#" gap="10px 0" directionwrap="row wrap">
          <FlexContainer
            width="245px"
            gap="7px"
            background="#"
            directionwrap="row nowrap"
          >
            <Button color="primary" onClick={handleUpdate} variant="outlined">
              Atualizar
            </Button>
            <Button
              color="primary"
              onClick={() => navigate(insertRoutesEnum.INSERT_URL)}
              variant="outlined"
            >
              Novo
            </Button>
            <Button
              onClick={handleUpdateProduct}
              color="primary"
              variant="outlined"
            >
              Editar
            </Button>
          </FlexContainer>
          <FlexContainer
            width="190px"
            gap="7px"
            background="#"
            directionwrap="row nowrap"
          >
            <Button color="danger" onClick={deleteProducts} variant="outlined">
              Excluir
            </Button>
            <Button
              onClick={deleteAllProducts}
              color="danger"
              variant="outlined"
            >
              Excluir Tudo
            </Button>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer overflow="scroll" padding="20px">
          <Table
            width="100%"
            height="100%"
            maxheight="750px"
            setProductSelected={setProductSelected}
            dataSource={dataSource}
            columns={columns}
          />
        </FlexContainer>
      </FlexContainer>
    </Screen>
  )
}

export default RegisteredProducts
