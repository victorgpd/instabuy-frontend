import { Input } from 'antd'
import { FlexContainer } from '../../flexcontainer/flexcontainer.style'
import { KeyboardEventHandler } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

interface InputInsertProps {
  name: string
  value: string
  title: string
  width?: string
  focus?: boolean
  disabled?: boolean
  status?: statusType
  onEnter?: KeyboardEventHandler<HTMLInputElement>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type statusType = '' | 'warning' | 'error'

export const InputPassword = (props: InputInsertProps) => {
  return (
    <FlexContainer height="55px" width={props.width} gap="5px" background="#" directionwrap="column nowrap">
      <span>{props.title}</span>
      <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} autoFocus={props.focus} onChange={props.onChange} name={props.name} status={props.status} disabled={props.disabled} value={props.value} onPressEnter={props.onEnter} />
    </FlexContainer>
  )
}
