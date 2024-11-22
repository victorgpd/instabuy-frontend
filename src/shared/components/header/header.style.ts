import { Button } from 'antd'
import styled from 'styled-components'

export const HeaderContainer = styled.header`
  width: 100%;
  padding: 7px 15px;
  z-index: 999;

  background: #1d1d1d;
  box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(222, 224, 224, 0.5);

  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`

export const LogoHeader = styled.img`
  height: 100%;
  border-radius: 50%;
`

export const NameLogo = styled.span`
  color: white;
  font-size: 20px;
  font-weight: 500;
`

export const ButtonMenu = styled(Button)`
  color: white;
  background: transparent;
  border: none;

  @media screen and (min-width: 743px) {
    display: none;
  }
`

export const ButtonUser = styled(Button)`
  color: white;
  background: transparent;
  border-radius: 50%;
  padding: 15px;
`

export const LinkLogin = styled.a`
  font-size: 14px;
  text-decoration: none;
`
