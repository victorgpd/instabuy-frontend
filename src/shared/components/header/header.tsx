import Logo from "../../../images/logo.png";
import { FlexContainer } from "../flexcontainer/flexcontainer.style";
import { HeaderContainer, LogoHeader, NameLogo } from "./header.style";

export const Header = () => {
  return (
    <HeaderContainer>
      <FlexContainer
        background="#"
        align="center"
        style={{ maxWidth: "1216px" }}
      >
        <FlexContainer background="#" width="75%" align="center">
          <FlexContainer background="#" height="50px" align="center" gap="10px">
            <LogoHeader src={Logo} />
            <NameLogo>AchoShop</NameLogo>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </HeaderContainer>
  );
};

export default Header;
