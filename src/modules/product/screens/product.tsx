import { useParams } from 'react-router-dom'
import Screen from '../../../shared/components/screen/screen'
import { useEffect, useState } from 'react'
import { ProductType } from '../../../shared/types/ProductType'
import { fetchSearchProductId } from '../../../shared/functions/connectionAPI'
import { FlexContainer } from '../../../shared/components/flexcontainer/flexcontainer.style'
import { CifraProductText, DescriptionProductText, DescriptionTitleText, ImageProduct, NameProductText, PriceOldProductText, PriceProductText } from '../styles/product.style'
import { homeRoutesEnum } from '../../home/routes'
import { convertNumberToMoney } from '../../../shared/functions/money'
import { Button } from 'antd'
import { LinkOutlined } from '@ant-design/icons'

const Product = () => {
  const { id } = useParams()
  const [isExpanded, setIsExpanded] = useState(false)
  const [descriptionsParts, setDescriptionsParts] = useState<string[]>([])
  const [product, setProduct] = useState<ProductType>({
    id: '',
    name: '',
    price: 0,
    description: '',
    image: '',
    priceOld: 0,
    category: '',
    cupom: '',
    linkAffiliate: '',
    linkOriginal: '',
    store: '',
  })

  useEffect(() => {
    searchProductId()
  }, [])

  useEffect(() => {
    if (product.description) {
      setDescriptionsParts(product.description.split('\n'))
    }
  }, [product])

  const searchProductId = async () => {
    try {
      if (id) {
        const data = await fetchSearchProductId(id)
        if (data == undefined) {
          window.location.href = homeRoutesEnum.HOME_URL
        }
        setProduct(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const redirectionFunction = () => {
    if (product.linkAffiliate) {
      window.open(product.linkAffiliate, '_blank')
    } else {
      console.error('Link inválido ou inexistente.')
    }
  }

  const toggleDescription = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <Screen>
      <FlexContainer align="center" background="#" padding="20px" directionwrap="column nowrap" gap="30px">
        {/* Container de imagem, titulo e preço */}
        <FlexContainer style={{ borderRadius: '4px' }} height="#" gap="35px" justify="center" directionwrap="row wrap" maxwidthcontainer="870px" padding="15px">
          <ImageProduct src={product.image} />
          <FlexContainer width="300px" flexcontainer="1 1 auto" height="#" directionwrap="column nowrap" gap="25px">
            <NameProductText>{product.name}</NameProductText>
            <FlexContainer directionwrap="column nowrap">
              <PriceOldProductText>R$ {convertNumberToMoney(product.priceOld)}</PriceOldProductText>
              <FlexContainer gap="30px" align="center" justify="space-between">
                <FlexContainer width="#" gap="10px">
                  <CifraProductText>R$</CifraProductText>
                  <PriceProductText>{convertNumberToMoney(product.price)}</PriceProductText>
                </FlexContainer>
                <Button onClick={redirectionFunction} icon={<LinkOutlined />} color="primary" variant="outlined" style={{ width: '60px', height: '30px' }}>
                  Ir
                </Button>
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>

        {/* Container de descrição */}
        <FlexContainer style={{ borderRadius: '4px' }} align="center" height="#" gap="30px" maxwidthcontainer="870px" padding="15px" directionwrap="column nowrap">
          <DescriptionTitleText>Descrição do Produto</DescriptionTitleText>
          <FlexContainer directionwrap="column nowrap" gap="10px">
            {descriptionsParts.slice(0, isExpanded ? descriptionsParts.length : 6).map((item, index) => (
              <DescriptionProductText key={index}>{item}</DescriptionProductText>
            ))}
            {descriptionsParts.length > 6 && (
              <FlexContainer justify="center">
                <Button onClick={toggleDescription} type="link">
                  {isExpanded ? 'Mostrar menos' : 'Mostrar mais'}
                </Button>
              </FlexContainer>
            )}
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </Screen>
  )
}

export default Product
