import { Button, CheckboxProps, Space } from 'antd'
import { FlexContainer } from '../../../../../shared/components/flexcontainer/flexcontainer.style'
import Screen from '../../../../../shared/components/screen/screen'
import { SaveFilled, SearchOutlined } from '@ant-design/icons'
import { InputInsert } from '../../../../../shared/components/inputs/inputInsert/inputInsert'
import { useEffect, useState } from 'react'
import { statusType } from '../../../../../shared/components/inputs/inputInsert/inputInsert'
import axios from 'axios'
import { ProductType } from '../../../../../shared/types/ProductType'
import { useGlobalReducer } from '../../../../../store/reducers/globalReducer/useGlobalReducer'
import InputMoney from '../../../../../shared/components/inputs/inputMoney/inputMoney'
import Menu from '../../../../../shared/components/menu/menu'
import useTitle from '../../../../../shared/hooks/useTitle'

const InsertProductScreen = () => {
  useTitle('Inserir Produto')
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

  const { setNotification } = useGlobalReducer()

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
  })

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
    }))
  }, [isChecked])

  const handleCheckboxChange: CheckboxProps['onChange'] = (e) => {
    const { name, checked } = e.target
    setIsChecked((prevChecked) => ({
      ...prevChecked,
      [name]: checked,
    }))
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
      const response = await axios.get(
        `http://localhost:3000/api/products/searchml?id=${idProduct}`
      )
      const dados = response.data

      setProduct((prevProduct) => ({
        ...prevProduct,
        name: dados.name,
        image: dados.pictures[0].url,
        store: 'Mercado Livre',
        linkOriginal: dados.permalink,
      }))

      if (dados.buy_box_winner && dados.buy_box_winner.category_id != null) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          category: dados.buy_box_winner.category_id,
        }))

        setDisabledInputs((prevDisabledInputs) => ({
          ...prevDisabledInputs,
          category: true,
        }))
      } else {
        setDisabledInputs((prevDisabledInputs) => ({
          ...prevDisabledInputs,
          category: false,
        }))
      }
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
      const response = await axios.post(
        'http://localhost:3000/api/products/insert',
        { product }
      )

      setNotification(response.data.message, 'success')
    } catch {
      setNotification('Falha ao inserir o produto...', 'error')
    }
    resetProduct()
    setLoadingInsert(false)
  }

  return (
    <Screen stateMenu={display} setStateMenu={setDisplay}>
      <Menu display={display} openDefault="products" currentKey="product2" />
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
              align="center"
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
              <InputInsert
                flexContainer="1 1 244.5px"
                focus={focusedInput === 2}
                name="category"
                onChange={(e) => handleInputChange(e)}
                title="Categoria do Produto"
                value={product.category}
                status={statusCategory}
                disabled={disabledInputs.disabledCategory}
              />
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
            <FlexContainer background="#" gap="5px">
              <InputInsert
                width="107.5%"
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
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </Screen>
  )
}

export default InsertProductScreen
