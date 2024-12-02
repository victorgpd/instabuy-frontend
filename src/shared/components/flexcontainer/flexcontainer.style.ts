import styled from 'styled-components'

interface FlexContainerProps {
  width?: string
  maxwidthcontainer?: string
  maxheightcontainer?: string
  height?: string
  padding?: string
  background?: string
  overflow?: string

  flexcontainer?: string
  gap?: string
  directionwrap?: 'row nowrap' | 'row wrap' | 'column nowrap' | 'column wrap'
  align?: 'flex-start' | 'center' | 'flex-end'
  justify?: 'flex-start' | 'space-around' | 'space-between' | 'space-evenly' | 'center' | 'flex-end'
}

export const FlexContainer = styled.div<FlexContainerProps>`
  width: ${(props) => props.width || '100%'};
  ${(props) => `max-width: ${props.maxwidthcontainer};`}
  ${(props) => `max-height: ${props.maxheightcontainer};`}
  height: ${(props) => props.height || '100%'};
  padding: ${(props) => props.padding || '0px'};
  background: ${(props) => props.background || 'white'};

  ${(props) => `overflow: ${props.overflow};`}
  gap: ${(props) => props.gap || '0px'};

  ${(props) => `flex: ${props.flexcontainer};`}
  display: flex;
  flex-flow: ${(props) => props.directionwrap || 'row nowrap'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align || 'flex-start'};
`

interface FlexResponsiveProps extends FlexContainerProps {
  media: string
  maxmin: string
}

export const FlexContainerResponsive = styled(FlexContainer)<FlexResponsiveProps>`
  @media screen and (${(props) => props.maxmin}-width: ${(props) => props.media}) {
    display: none;
  }
`
