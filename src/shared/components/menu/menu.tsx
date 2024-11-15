import { useState } from 'react'
import {
  PieChartOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import type { MenuProps as MenuPropsAntd, MenuTheme } from 'antd'
import { Menu as MenuAntd, Switch } from 'antd'
import { FlexContainer } from '../flexcontainer/flexcontainer.style'
import { NavContainer } from '../main/main.style'
import { useNavigate } from 'react-router-dom'
import { insertRoutesEnum } from '../../../modules/painel/product/insertProduct/routes'
import { dashboardRoutesEnum } from '../../../modules/painel/dashboard/routes'

type MenuItem = Required<MenuPropsAntd>['items'][number]

interface MenuProps {
  openDefault: string
  currentKey: string
  display: string
}

const Menu = (props: MenuProps) => {
  const navigate = useNavigate()
  const [theme, setTheme] = useState<MenuTheme>('dark')
  const [themeColor, setThemeColor] = useState('#001529')
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
        { key: 'product1', label: 'Produtos cadastrados' },
        {
          key: 'product2',
          label: 'Cadastrar novo produto',
          onClick: () => navigate(insertRoutesEnum.INSERT_URL),
        },
        {
          key: 'product3',
          label: 'Buscar novos produtos',
          onClick: () => navigate(insertRoutesEnum.INSERT_URL),
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
  ]

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light')
    if (value == true) {
      setThemeColor('#001529')
    } else {
      setThemeColor('#FFFFFF')
    }
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
        padding="15px 0"
      >
        <FlexContainer
          background="#"
          padding="0 10px"
          height="25px"
          justify="flex-end"
        >
          <Switch
            checked={theme === 'dark'}
            onChange={changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </FlexContainer>
        <MenuAntd
          theme={theme}
          onClick={onClick}
          style={{ width: '256px', height: '100%' }}
          defaultOpenKeys={[props.openDefault]}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </FlexContainer>
    </NavContainer>
  )
}

export default Menu
