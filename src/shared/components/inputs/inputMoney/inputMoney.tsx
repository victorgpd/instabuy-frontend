import { Checkbox, Input } from 'antd'
import { FlexContainer } from '../../flexcontainer/flexcontainer.style'
import { KeyboardEventHandler, useEffect, useState } from 'react'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

export interface InputMoneyProps {
  name: string
  value: number
  title: string
  width?: string
  focus?: boolean
  checkbox?: string
  disabled?: boolean
  status?: statusType
  valueCheck?: boolean
  onEnter?: KeyboardEventHandler<HTMLInputElement>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeCheck?: (e: CheckboxChangeEvent) => void
}

export type statusType = '' | 'warning' | 'error'

const InputMoney = (props: InputMoneyProps) => {
  const [currentValue, setCurrentValue] = useState<string>(`${props.value}`)

  useEffect(() => {
    const valueString = `${props.value}`

    if (!/\D/.test(valueString.replace('.', ''))) {
      setCurrentValue(props.value.toFixed(2).toString().replace('.', ','))
    }
  }, [props.value])

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueWithoutComma = event.target.value.replace(',', '')
    const sizeSlice = valueWithoutComma.length - 2 // Localiza o ponto decimal
    const formattedValue = [
      valueWithoutComma.slice(0, sizeSlice),
      '.',
      valueWithoutComma.slice(sizeSlice),
    ].join('')

    props.onChange({
      ...event,
      target: {
        ...event.target,
        name: props.name,
        value: formattedValue,
      },
    })
  }

  return (
    <FlexContainer
      width={props.width}
      gap="5px"
      background="#"
      directionwrap="column nowrap"
    >
      <span>{props.title}</span>
      <Input
        autoFocus={props.focus}
        addonBefore="R$"
        onChange={handleOnChange}
        name={props.name}
        status={props.status}
        disabled={props.disabled}
        value={currentValue}
        onPressEnter={props.onEnter}
      />
      {props.checkbox && (
        <Checkbox
          name={props.name}
          onChange={props.onChangeCheck}
          checked={props.valueCheck}
        >
          {props.checkbox}
        </Checkbox>
      )}
    </FlexContainer>
  )
}

export default InputMoney
