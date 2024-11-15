import { Dropdown, MenuProps } from 'antd'
import Logo from '../../../images/logo.png'
import { FlexContainer } from '../flexcontainer/flexcontainer.style'
import {
  ButtonMenu,
  ButtonUser,
  HeaderContainer,
  LinkLogin,
  LogoHeader,
  NameLogo,
  TextName,
} from './header.style'
import {
  AppstoreOutlined,
  CloseOutlined,
  LogoutOutlined,
  MenuOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'
import { useNavigate } from 'react-router-dom'
import { unsetAuthorizationToken, verified } from '../../functions/auth'
import { loginRoutesEnum } from '../../../modules/login/routes'

interface HeaderProps {
  stateMenu?: string
  setStateMenu?: React.Dispatch<React.SetStateAction<string>>
}

export const Header = (props: HeaderProps) => {
  const navigate = useNavigate()
  const { userReducer, setUserReducer } = useGlobalReducer()
  const [menuOpen, setMenuOpen] = useState(true)
  const [logged, setLogged] = useState(false)

  const [currentText, setCurrentText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (userReducer?.name) {
      const text = `Olá, ${userReducer.name}!`
      const interval = setInterval(() => {
        if (index < text.length) {
          setCurrentText((prev) => prev + text[index])
          setIndex((prev) => prev + 1)
        }
      }, 50)
      return () => clearInterval(interval)
    }
  }, [index, userReducer?.name])

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
    navigate(loginRoutesEnum.LOGIN_URL)
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <AppstoreOutlined />,
      label: <span>Painel</span>,
      onClick: () => navigate('/painel/dashboard'),
    },
    {
      key: '2',
      icon: <SettingOutlined />,
      label: <span>Configurações</span>,
    },

    {
      key: '3',
      icon: <LogoutOutlined />,
      label: <span>Sair</span>,
      onClick: logout,
    },
  ]

  return (
    <HeaderContainer>
      <FlexContainer
        background="#"
        align="center"
        style={{ maxWidth: '1216px' }}
      >
        <FlexContainer
          background="#"
          width="100%"
          align="center"
          justify="space-between"
        >
          <FlexContainer background="#" height="50px" align="center" gap="10px">
            {props.stateMenu && (
              <ButtonMenu
                variant="outlined"
                onClick={handleMenu}
                icon={menuOpen ? <MenuOutlined /> : <CloseOutlined />}
              />
            )}
            <LogoHeader src={Logo} />
            <NameLogo>InstaBuy</NameLogo>
          </FlexContainer>
          <FlexContainer
            background="#"
            height="50px"
            justify="flex-end"
            align="center"
            gap="10px"
          >
            {logged ? (
              <>
                <TextName>{currentText}</TextName>
                <Dropdown menu={{ items }} placement="bottom">
                  <FlexContainer
                    align="center"
                    gap="8px"
                    background="#"
                    width="32px"
                  >
                    <ButtonUser
                      iconPosition="end"
                      icon={<UserOutlined style={{ fontSize: '20px' }} />}
                    />
                  </FlexContainer>
                </Dropdown>
              </>
            ) : (
              <>
                <LinkLogin
                  href={loginRoutesEnum.LOGIN_URL}
                  style={{ color: 'white', fontSize: '14px' }}
                >
                  Login
                </LinkLogin>
                <UserOutlined style={{ color: 'white', fontSize: '20px' }} />
              </>
            )}
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </HeaderContainer>
  )
}

export default Header
