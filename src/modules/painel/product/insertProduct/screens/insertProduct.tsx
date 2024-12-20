import { Button, Checkbox, CheckboxProps, Select, Space } from 'antd'
import type { SelectProps } from 'antd'
import { FlexContainer } from '../../../../../shared/components/flexcontainer/flexcontainer.style'
import Screen from '../../../../../shared/components/screen/screen'
import { CloseOutlined, SaveFilled, SearchOutlined } from '@ant-design/icons'
import { InputInsert } from '../../../../../shared/components/inputs/inputInsert/inputInsert'
import { useEffect, useState } from 'react'
import { statusType } from '../../../../../shared/components/inputs/inputInsert/inputInsert'
import { ProductType } from '../../../../../shared/types/ProductType'
import { useGlobalReducer } from '../../../../../store/reducers/globalReducer/useGlobalReducer'
import InputMoney from '../../../../../shared/components/inputs/inputMoney/inputMoney'
import Menu from '../../../../../shared/components/menu/menu'
import useTitle from '../../../../../shared/hooks/useTitle'
import { useLocation, useNavigate } from 'react-router-dom'
import { searchNewProductRoutesEnum } from '../../searchNewProduct/routes'
import { useCategoriesReducer } from '../../../../../store/reducers/categoriesReducer/useCategoryReducer'
import {
  fetchInsertProduct,
  fetchProductMlId,
} from '../../../../../shared/functions/connectionAPI'
import { registeredProductsRoutesEnum } from '../../registeredProducts/routes'

const InsertProductScreen = () => {
  useTitle('Inserir Produto')

  const location = useLocation()
  const navigate = useNavigate()

  const { setNotification } = useGlobalReducer()
  const { productSelected = [] } = location.state || {}

  const { categories, searchCategories, searchSubCategories } =
    useCategoriesReducer()
  const [options, setOptions] = useState<SelectProps['options']>([])

  const [display, setDisplay] = useState('none')
  const [loading, setLoading] = useState(false)
  const [loadingInsert, setLoadingInsert] = useState(false)
  const [disabledButton, setDisabledButton] = useState(true)
  const [focusedInput] = useState<number>(1)

  const [statusId, setStatusId] = useState<statusType>('')
  const [statusName] = useState<statusType>('')
  const [statusImage] = useState<statusType>('')
  const [statusLink] = useState<statusType>('')
  const [statusLinkAffiliate] = useState<statusType>('')
  const [statusCategory] = useState<statusType>('')
  const [statusPriceOld] = useState<statusType>('')

  const [product, setProduct] = useState<ProductType>({
    id: '',
    category: '',
    store: '',
    name: '',
    cupom: '',
    image: '',
    linkOriginal: '',
    linkAffiliate: '',
    priceOld: 0.0,
    price: 0.0,
  })

  const [disabledInputs, setDisabledInputs] = useState({
    disabledName: true,
    disabledImage: true,
    disabledLink: true,
    disabledLinkAffiliate: false,
    disabledCategory: true,
    disabledPriceOld: true,
    disabledCupom: true,
  })

  const [isChecked, setIsChecked] = useState({
    cupom: false,
    priceOld: false,
    category: false,
  })

  useEffect(() => {
    if (productSelected.length > 0) {
      for (let productSelect of productSelected) {
        if (formatToNumber(productSelect.priceOld) != 0) {
          setIsChecked((prevChecked) => ({
            ...prevChecked,
            priceOld: true,
          }))
        }

        if (productSelect.cupom != '') {
          setIsChecked((prevChecked) => ({
            ...prevChecked,
            cupom: true,
          }))
        }

        setProduct({
          id: productSelect.id,
          category: productSelect.category,
          store: 'Mercado Livre',
          name: productSelect.name,
          image: productSelect.image,
          price: formatToNumber(productSelect.price),
          priceOld: formatToNumber(productSelect.priceOld),
          cupom: productSelect.cupom,
          linkOriginal: productSelect.linkOriginal,
          linkAffiliate: productSelect.linkAffiliate,
        })
      }
    }
  }, [productSelected])

  useEffect(() => {
    let emptyFields = Object.keys(product).filter(
      (key) => product[key as keyof ProductType] === ''
    )

    if (!isChecked.cupom && product.cupom) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        cupom: '',
      }))
    } else if (isChecked.cupom && !product.cupom) {
      emptyFields.push('priceOld')
    } else if (!isChecked.cupom) {
      emptyFields = emptyFields.filter((field) => field !== 'cupom')
    }

    if (!isChecked.priceOld && product.priceOld > 0) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        priceOld: 0,
      }))
    } else if (isChecked.priceOld && product.priceOld == 0) {
      emptyFields.push('priceOld')
    } else if (!isChecked.priceOld) {
      emptyFields = emptyFields.filter((field) => field !== 'priceOld')
    }

    if (product.price <= 0) {
      emptyFields.push('price')
    }

    if (emptyFields.length > 0) {
      setDisabledButton(true)
    } else {
      setDisabledButton(false)
    }
  }, [product, isChecked])

  useEffect(() => {
    setDisabledInputs((prev) => ({
      ...prev,
      disabledCupom: !isChecked.cupom,
      disabledPriceOld: !isChecked.priceOld,
      disabledCategory: !isChecked.category,
    }))
  }, [isChecked])

  useEffect(() => {
    searchCategories()
    searchSubCategories()
  }, [])

  useEffect(() => {
    const updatedOptions = categories.map((category) => ({
      label: category.name,
      value: category.id,
    }))
    setOptions(updatedOptions)
  }, [categories])

  const formatToNumber = (value: string | undefined): number => {
    if (!value) return 0

    const cleanedValue = value
      .replace('R$', '')
      .replace(/\./g, '')
      .replace(',', '.')
      .trim()

    const numberValue = parseFloat(cleanedValue)

    return isNaN(numberValue) ? 0 : numberValue
  }

  const handleCheckboxChange: CheckboxProps['onChange'] = (e) => {
    const { name, checked } = e.target

    if (name) {
      setIsChecked((prevChecked) => ({
        ...prevChecked,
        [name]: checked,
      }))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'price' || name === 'priceOld') {
      const formattedValue = value.replace(',', '.')
      const numericValue = parseFloat(formattedValue)

      setProduct((prevState) => ({
        ...prevState,
        [name]: isNaN(numericValue) ? 0 : numericValue,
      }))
    } else {
      setProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const resetProduct = (idAtual?: string) => {
    if (!idAtual) {
      idAtual = ''
    }

    setProduct({
      id: idAtual,
      category: '',
      store: '',
      name: '',
      image: '',
      cupom: '',
      linkOriginal: '',
      linkAffiliate: '',
      priceOld: 0.0,
      price: 0.0,
    })
  }

  const handleSearch = async (idProduct: string) => {
    setLoading(true)
    setStatusId('')
    resetProduct(product.id)

    try {
      const dados = await fetchProductMlId(idProduct)

      setProduct((prevProduct) => ({
        ...prevProduct,
        id: dados.id,
        name: dados.title,
        category: dados.category_id,
        image: dados.pictures[0].url,
        store: 'Mercado Livre',
        linkOriginal: dados.permalink,
      }))
    } catch (error) {
      setStatusId('error')
    }
    setLoading(false)
  }

  const handleEnterPress: React.KeyboardEventHandler<HTMLInputElement> = () => {
    handleSearch(product.id)
  }

  const handleInsertProduct = async () => {
    setLoadingInsert(true)
    try {
      const response = await fetchInsertProduct(product)

      setNotification(response?.data.message, 'success')
      window.location.href = searchNewProductRoutesEnum.SEARCH_NEW_PRODUCT_URL
    } catch {
      setNotification('Falha ao inserir o produto...', 'error')
    }
    resetProduct()
    setLoadingInsert(false)
  }

  const handleCategory = (category: string) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: category,
    }))
  }

  return (
    <Screen stateMenu={display} setStateMenu={setDisplay}>
      <Menu display={display} currentKey="product2" />
      <FlexContainer background="#" justify="center">
        <FlexContainer
          background="#"
          padding="40px 20px"
          width="100%"
          height="100%"
          directionwrap="column nowrap"
          gap="15px"
          justify="center"
          style={{ maxWidth: '500px' }}
        >
          <FlexContainer
            background="#"
            gap="15px"
            directionwrap="column nowrap"
          >
            <FlexContainer
              gap="5px"
              background="#"
              align="flex-start"
              directionwrap="row wrap"
            >
              <Space.Compact
                style={{ flex: '1 1 197.5px', alignItems: 'flex-end' }}
              >
                <InputInsert
                  name="id"
                  status={statusId}
                  focus={focusedInput === 1}
                  onChange={(e) => handleInputChange(e)}
                  title="ID do Produto"
                  value={product.id}
                  onEnter={handleEnterPress}
                />
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={() => handleSearch(product.id)}
                  loading={loading}
                />
              </Space.Compact>
              <FlexContainer
                width="100%"
                flexcontainer="1 1 244.5px"
                gap="5px"
                background="#"
                directionwrap="column nowrap"
              >
                <span>Selecionar Categoria</span>
                <Select
                  value={product.category}
                  defaultValue={product.category}
                  disabled={disabledInputs.disabledCategory}
                  options={options}
                  onChange={handleCategory}
                  style={{ width: '100%' }}
                />

                <Checkbox
                  name="category"
                  onChange={handleCheckboxChange}
                  checked={isChecked.category}
                >
                  Selecionar Categoria?
                </Checkbox>
              </FlexContainer>
            </FlexContainer>
            <InputInsert
              name="name"
              onChange={(e) => handleInputChange(e)}
              title="Nome do Produto"
              value={product.name}
              status={statusName}
              disabled={disabledInputs.disabledName}
            />
            <InputInsert
              name="image"
              onChange={(e) => handleInputChange(e)}
              title="Imagem do Produto"
              value={product.image}
              status={statusImage}
              disabled={disabledInputs.disabledImage}
            />
            <InputInsert
              name="linkOriginal"
              onChange={(e) => handleInputChange(e)}
              title="Link do Produto"
              value={product.linkOriginal}
              status={statusLink}
              disabled={disabledInputs.disabledLink}
            />
            <InputInsert
              name="linkAffiliate"
              onChange={(e) => handleInputChange(e)}
              focus={focusedInput === 3}
              title="Link de Afiliado"
              value={product.linkAffiliate}
              status={statusLinkAffiliate}
              disabled={disabledInputs.disabledLinkAffiliate}
            />
            <FlexContainer background="#" gap="5px" directionwrap="row wrap">
              <InputInsert
                flexContainer="1 1 153px"
                width="100%"
                name="cupom"
                onChange={(e) => handleInputChange(e)}
                title="Cupom"
                value={product.cupom}
                disabled={disabledInputs.disabledCupom}
                checkbox="Adicionar Cupom?"
                onChangeCheck={handleCheckboxChange}
                valueCheck={isChecked.cupom}
              />
              <InputMoney
                flexContainer="1 1 143px"
                width="100%"
                name="priceOld"
                onChange={(e) => handleInputChange(e)}
                title="Preço Original"
                value={product.priceOld}
                status={statusPriceOld}
                disabled={disabledInputs.disabledPriceOld}
                checkbox="Adicionar Preço?"
                onChangeCheck={handleCheckboxChange}
                valueCheck={isChecked.priceOld}
              />
              <InputMoney
                flexContainer="1 1 143px"
                width="100%"
                name="price"
                onChange={(e) => handleInputChange(e)}
                title="Preço do Produto"
                focus={focusedInput === 4}
                value={product.price}
              />
            </FlexContainer>
          </FlexContainer>
          <FlexContainer background="#" justify="flex-end" gap="10px">
            <Button
              type="primary"
              icon={<SaveFilled />}
              onClick={handleInsertProduct}
              disabled={disabledButton}
              loading={loadingInsert}
            >
              Inserir Produto
            </Button>
            <Button
              color="danger"
              variant="outlined"
              icon={<CloseOutlined />}
              onClick={() =>
                navigate(registeredProductsRoutesEnum.REGISTERED_PRODUCT_URL)
              }
            >
              Cancelar
            </Button>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </Screen>
  )
}

export default InsertProductScreen
