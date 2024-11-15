import styled from 'styled-components'

export const MainContainer = styled.main`
  width: 100%;
  height: 100%;
  padding: 0;

  background-color: rgb(242, 245, 247);

  flex: 1;

  position: relative;

  display: flex;
  flex-flow: row nowrap;
`

interface NavContainerProps {
  themecolor: string
  media?: string
  display?: string
  position?: 'relative' | 'absolute' | 'fixed'
  positiontop?: string
  positionrigth?: string
  positionbottom?: string
  positionleft?: string
}

export const NavContainer = styled.nav<NavContainerProps>`
  min-height: 100%;
  background: ${(props) => props.themecolor || '#fff'};

  z-index: 999;

  padding: 10px 0;

  @media screen and (max-width: ${(props) => props.media}) {
    ${(props) => `display: ${props.display};`}
    ${(props) => `position: ${props.position};`}
    ${(props) => `top: ${props.positiontop};`}
    ${(props) => `rigth: ${props.positionrigth};`}
    ${(props) => `bottom: ${props.positionbottom};`}
    ${(props) => `left: ${props.positionleft};`}
  }
`
