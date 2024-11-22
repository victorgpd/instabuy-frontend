import { useEffect, useState } from 'react'
import {
  LogoutOutlined,
  PieChartOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import type { MenuProps as MenuPropsAntd } from 'antd'
import { Switch } from 'antd'
import { FlexContainer } from '../flexcontainer/flexcontainer.style'
import { NavContainer } from '../main/main.style'
import { useNavigate } from 'react-router-dom'
import { insertRoutesEnum } from '../../../modules/painel/product/insertProduct/routes'
import { dashboardRoutesEnum } from '../../../modules/painel/dashboard/routes'
import { registeredProductsRoutesEnum } from '../../../modules/painel/product/registeredProducts/routes'
import { StyledMenuDark, StyledMenuLight } from './menu.style'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'
import { searchNewProductRoutesEnum } from '../../../modules/painel/product/searchNewProduct/routes'

type MenuItem = Required<MenuPropsAntd>['items'][number]

interface MenuProps {
  currentKey: string
  display: string
}

const Menu = (props: MenuProps) => {
  const navigate = useNavigate()
  const { themeReducer, setThemeReducer } = useGlobalReducer()
  const [themeColor, setThemeColor] = useState('#1d1d1d')
  const [current, setCurrent] = useState(props.currentKey)

  const items: MenuItem[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <PieChartOutlined />,
      onClick: () => navigate(dashboardRoutesEnum.DASHBOARD_URL),
    },
    {
      key: 'products',
      label: 'Produtos',
      icon: <ShoppingCartOutlined />,
      children: [
        {
          key: 'product1',
          label: 'Produtos cadastrados',
          onClick: () =>
            navigate(registeredProductsRoutesEnum.REGISTERED_PRODUCT_URL),
        },
        {
          key: 'product2',
          label: 'Cadastrar novo produto',
          onClick: () => navigate(insertRoutesEnum.INSERT_URL),
        },
        {
          key: 'product3',
          label: 'Buscar novos produtos',
          onClick: () =>
            navigate(searchNewProductRoutesEnum.SEARCH_NEW_PRODUCT_URL),
        },
      ],
    },
    {
      key: 'category',
      label: 'Categorias',
      icon: <TagsOutlined />,
      children: [
        { key: 'category1', label: 'Categorias cadastradas' },
        { key: 'category2', label: 'Cadastrar nova categoria' },
      ],
    },
    {
      key: 'configuration',
      label: 'Configurações',
      icon: <SettingOutlined />,
    },
    {
      key: 'logout',
      label: 'Sair',
      icon: <LogoutOutlined />,
    },
  ]

  useEffect(() => {
    verifiedTheme()
  }, [themeReducer])

  const verifiedTheme = () => {
    if (themeReducer == 'dark') {
      setThemeColor('#1d1d1d')
    } else {
      setThemeColor('#FFFFFF')
    }
  }

  const changeTheme = (value: boolean) => {
    setThemeReducer(value ? 'dark' : 'light')
  }

  const onClick: MenuPropsAntd['onClick'] = (e) => {
    setCurrent(e.key)
  }

  return (
    <NavContainer
      media="742px"
      display={props.display}
      position="absolute"
      themecolor={themeColor}
    >
      <FlexContainer
        directionwrap="column nowrap"
        background="transparent"
        gap="10px"
        padding="15px 0"
      >
        <FlexContainer
          background="#"
          padding="0 10px"
          height="25px"
          justify="flex-end"
        >
          <Switch
            checked={themeReducer === 'dark'}
            onChange={changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </FlexContainer>
        {themeReducer == 'dark' ? (
          <StyledMenuDark
            theme={themeReducer}
            onClick={onClick}
            style={{ width: '256px', height: '100%' }}
            selectedKeys={[current]}
            items={items}
          />
        ) : (
          <StyledMenuLight
            theme={themeReducer}
            onClick={onClick}
            style={{ width: '256px', height: '100%' }}
            selectedKeys={[current]}
            items={items}
          />
        )}
      </FlexContainer>
    </NavContainer>
  )
}

export default Menu
