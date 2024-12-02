import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FlexContainer } from '../flexcontainer/flexcontainer.style'
import { CoinText, ContainerCard, ContainerCupom, CupomProduct, ImageProduct, PriceOld, StoreImage, StoreText, TitleProduct, ValueText } from './card.style'
import { faTicket } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'antd'
import { LinkOutlined } from '@ant-design/icons'
import MercadoLivre from '../../../images/mercadolivre.png'

interface CardProps {
  id: string
  store: string
  image: string
  title: string
  price: string
  cupom?: string
  priceOld?: string
  storeImage: string
  link: string
}

export const Card = (props: CardProps) => {
  const redirectionFunction = () => {
    if (props.link) {
      window.open(props.link, '_blank')
    } else {
      console.error('Link inválido ou inexistente.')
    }
  }

  return (
    <ContainerCard>
      <FlexContainer padding="5px 12px" directionwrap="column nowrap" align="center" gap="15px">
        <a href={`/product/${props.id}`} rel="noopener noreferrer">
          <ImageProduct src={props.image} />
        </a>

        <FlexContainer directionwrap="column nowrap" gap="5px">
          <FlexContainer height="34px">
            <TitleProduct href={`/product/${props.id}`} rel="noopener noreferrer">
              {props.title}
            </TitleProduct>
          </FlexContainer>
          {props.cupom && (
            <ContainerCupom>
              <FontAwesomeIcon icon={faTicket} style={{ fontSize: '12px', color: '#a15e49' }} />
              <CupomProduct>{props.cupom.toUpperCase()}</CupomProduct>
            </ContainerCupom>
          )}

          <FlexContainer directionwrap="column nowrap" justify="flex-end" gap="8px">
            {props.priceOld && (
              <FlexContainer height="19px" gap="8px" align="flex-end">
                <PriceOld>R$ {props.priceOld}</PriceOld>
              </FlexContainer>
            )}

            <FlexContainer height="30px" gap="8px" align="flex-end" justify="space-between" padding="0 0 5px 0">
              <FlexContainer height="30px" gap="4px" align="center">
                <CoinText>R$</CoinText>
                <ValueText>{props.price}</ValueText>
              </FlexContainer>

              <Button onClick={redirectionFunction} icon={<LinkOutlined />} color="primary" variant="outlined" style={{ width: '45px', height: '30px' }}>
                Ir
              </Button>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>

      <FlexContainer height="54px" gap="5px" justify="center" align="center" padding="12px" style={{ borderTop: '2px solid rgb(242, 244, 246)' }}>
        <StoreImage src={MercadoLivre} />
        <StoreText>{props.store}</StoreText>
      </FlexContainer>
    </ContainerCard>
  )
}
