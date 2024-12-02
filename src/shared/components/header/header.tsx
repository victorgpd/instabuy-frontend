import { Dropdown, MenuProps } from 'antd'
import Logo from '../../../images/logo.png'
import { FlexContainer } from '../flexcontainer/flexcontainer.style'
import { ButtonMenu, ButtonUser, HeaderContainer, LogoHeader, NameLogo } from './header.style'
import { AppstoreOutlined, CloseOutlined, LoginOutlined, LogoutOutlined, MenuOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'
import { useNavigate } from 'react-router-dom'
import { unsetAuthorizationToken, verified } from '../../functions/auth'
import { loginRoutesEnum } from '../../../modules/login/routes'
import Nav from '../nav/nav'

interface HeaderProps {
  stateMenu?: string
  setStateMenu?: React.Dispatch<React.SetStateAction<string>>
}

export const Header = (props: HeaderProps) => {
  const navigate = useNavigate()
  const { userReducer, setUserReducer } = useGlobalReducer()
  const [menuOpen, setMenuOpen] = useState(true)
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    const verifiedFunction = async () => {
      const isLogged = await verified(setUserReducer)
      setLogged(isLogged)
    }

    verifiedFunction()
  }, [])

  const handleMenu = () => {
    if (props.setStateMenu) {
      if (props.stateMenu == 'none') {
        props.setStateMenu('block')
      } else {
        props.setStateMenu('none')
      }
      setMenuOpen(!menuOpen)
    }
  }

  const logout = () => {
    unsetAuthorizationToken()
    setLogged(false)
    window.location.reload()
  }

  const items1: MenuProps['items'] = [
    {
      key: '1',
      label: <span style={{ color: '#1677ff', fontSize: '26px' }}>{`Olá, ${userReducer?.name}!`}</span>,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      icon: <AppstoreOutlined />,
      label: <span>Painel</span>,
      onClick: () => navigate('/painel/dashboard'),
    },
    {
      key: '3',
      icon: <SettingOutlined />,
      label: <span>Configurações</span>,
    },
    {
      type: 'divider',
    },
    {
      key: '4',
      icon: <LogoutOutlined />,
      label: <span>Sair</span>,
      onClick: logout,
    },
  ]

  const items2: MenuProps['items'] = [
    {
      key: '1',
      label: <span style={{ fontSize: '18px' }}>Olá, seja bem-vindo!</span>,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Login',
      icon: <LoginOutlined />,
      onClick: () => navigate(`${loginRoutesEnum.LOGIN_URL}?from=${encodeURIComponent(location.pathname)}`),
    },
  ]

  return (
    <HeaderContainer>
      <FlexContainer background="#" height="#" align="center" style={{ maxWidth: '1216px' }}>
        <FlexContainer background="#" width="100%" align="center" justify="space-between" gap="20px">
          <FlexContainer background="#" height="50px" align="center" gap="10px">
            {props.stateMenu && <ButtonMenu variant="outlined" onClick={handleMenu} icon={menuOpen ? <MenuOutlined /> : <CloseOutlined />} />}
            <LogoHeader src={Logo} />
            <NameLogo>InstaBuy</NameLogo>
          </FlexContainer>
          <FlexContainer background="#" height="50px" justify="flex-end" align="center" gap="10px">
            <Nav media="500px" maxmin="max" />
            {logged ? (
              <Dropdown menu={{ items: items1 }} placement="bottom">
                <FlexContainer align="center" gap="8px" background="#" width="32px">
                  <ButtonUser iconPosition="end" icon={<UserOutlined style={{ fontSize: '20px' }} />} />
                </FlexContainer>
              </Dropdown>
            ) : (
              <Dropdown menu={{ items: items2 }} placement="bottom">
                <FlexContainer align="center" gap="8px" background="#" width="32px">
                  <ButtonUser iconPosition="end" icon={<UserOutlined style={{ fontSize: '20px' }} />} />
                </FlexContainer>
              </Dropdown>
            )}
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      <Nav media="501px" maxmin="min" />
    </HeaderContainer>
  )
}

export default Header
