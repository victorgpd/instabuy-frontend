import { Checkbox, Input } from 'antd'
import { FlexContainer } from '../../flexcontainer/flexcontainer.style'
import { KeyboardEventHandler } from 'react'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

export interface InputInsertProps {
  name: string
  value: string
  title: string
  width?: string
  focus?: boolean
  checkbox?: string
  disabled?: boolean
  status?: statusType
  valueCheck?: boolean
  flexContainer?: string
  onEnter?: KeyboardEventHandler<HTMLInputElement>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeCheck?: (e: CheckboxChangeEvent) => void
}

export type statusType = '' | 'warning' | 'error'

export const InputInsert = (props: InputInsertProps) => {
  return (
    <FlexContainer
      width={props.width}
      flexcontainer={props.flexContainer}
      gap="5px"
      background="#"
      directionwrap="column nowrap"
    >
      <span>{props.title}</span>
      <Input
        autoFocus={props.focus}
        onChange={props.onChange}
        name={props.name}
        status={props.status}
        disabled={props.disabled}
        value={props.value}
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
