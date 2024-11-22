import {
  FlexContainer,
  FlexContainerResponsive,
} from '../flexcontainer/flexcontainer.style'
import { Select, SelectProps, Slider } from 'antd'
import { PriceTitle, TitleFilter } from './filter.style'
import { useState } from 'react'

const options: SelectProps['options'] = [
  {
    value: 'Celulares e Smartphones',
    label: 'Celulares e Smartphones',
  },
  {
    value: 'Computadores e Desktops',
    label: 'Computadores e Desktops',
  },
]

export const Filter = () => {
  const [value, setValue] = useState([20, 9999])

  const handlePriceChange = (value: any) => {
    setValue(value)
  }

  return (
    <>
      <FlexContainerResponsive
        maxmin="max"
        media="781px"
        directionwrap="column nowrap"
        gap="25px"
        padding="10px"
        width="100%"
        height="300px"
        style={{ maxWidth: '250px', borderRadius: '9px' }}
      >
        <FlexContainer height="1" directionwrap="column nowrap" gap="7px">
          <TitleFilter>Categorias</TitleFilter>
          <Select
            mode="multiple"
            size="middle"
            placeholder="Selecione a categoria"
            style={{ width: '100%' }}
            options={options}
          />
        </FlexContainer>

        <FlexContainer directionwrap="column nowrap">
          <FlexContainer
            height="1"
            padding="0 10px 0 0"
            directionwrap="column nowrap"
          >
            <TitleFilter>Preço</TitleFilter>
            <Slider
              onChange={(event) => handlePriceChange(event)}
              range
              value={value}
              max={10000}
              style={{ width: '100%' }}
            />
          </FlexContainer>
          <FlexContainer justify="space-between">
            <PriceTitle>
              {value[0].toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </PriceTitle>
            <PriceTitle>
              {value[1].toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </PriceTitle>
          </FlexContainer>
        </FlexContainer>
      </FlexContainerResponsive>
    </>
  )
}
