import { Menu } from 'antd'
import styled from 'styled-components'

export const StyledMenuDark = styled(Menu)`
  background-color: #1d1d1d !important;
  color: white !important;

  .ant-menu-item-selected {
    background-color: #4a4a4a !important; /* Fundo do item selecionado */
    color: #80d8ff !important;
  }

  .ant-menu-item {
    color: white;
  }

  .ant-menu-item-active {
    color: #1677ff !important;
  }

  .ant-menu-item:hover {
    background-color: white !important;
  }

  .ant-menu-submenu-active > .ant-menu-submenu-title {
    background: white !important;
    color: #1677ff;
  }

  .ant-menu-submenu-title {
    color: white;
  }
`

export const StyledMenuLight = styled(Menu)`
  background-color: #f5f5f5 !important;
  color: #4a4a4a !important;

  .ant-menu-item-selected {
    background-color: #e0e0e0 !important;
    color: #1677ff !important;
  }

  .ant-menu-item {
    color: #4a4a4a;
  }

  .ant-menu-item-active {
    color: #1677ff !important;
  }

  .ant-menu-item:hover {
    background-color: #d9d9d9 !important;
  }

  .ant-menu-submenu-active > .ant-menu-submenu-title {
    background: #d9d9d9 !important;
    color: #1677ff;
  }

  .ant-menu-submenu-title {
    color: #4a4a4a;
  }
`
