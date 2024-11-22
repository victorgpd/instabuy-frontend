import {
  FlexContainer,
  FlexContainerResponsive,
} from '../flexcontainer/flexcontainer.style'
import QRcode from '@/images/frame.png'
import { QRcodeImage } from './details.style'

const Details = () => {
  return (
    <FlexContainerResponsive
      maxmin="max"
      media="781px"
      directionwrap="column nowrap"
      gap="25px"
      padding="10px"
      width="100%"
      height="300px"
      style={{ maxWidth: '250px', borderRadius: '9px' }}
    >
      <FlexContainer height="130px" align="center" justify="flex-end">
        <span>Escanei o QrCode</span>
        <QRcodeImage src={QRcode} alt="link do instagram" />
      </FlexContainer>
    </FlexContainerResponsive>
  )
}

export default Details
