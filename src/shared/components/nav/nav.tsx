import { FlexContainerResponsive } from '../flexcontainer/flexcontainer.style'
import { NavHeaderContainer, StyledHeaderLink } from './nav.style'

interface NavProps {
  media: string
  maxmin: string
}

const Nav = (props: NavProps) => {
  return (
    <FlexContainerResponsive
      width="233px"
      align="center"
      background="#"
      maxmin={props.maxmin}
      media={props.media}
    >
      <NavHeaderContainer>
        <StyledHeaderLink href="/">Home</StyledHeaderLink>
        <StyledHeaderLink href="/">Cupons</StyledHeaderLink>
        <StyledHeaderLink href="/">Sobre</StyledHeaderLink>
      </NavHeaderContainer>
    </FlexContainerResponsive>
  )
}

export default Nav
