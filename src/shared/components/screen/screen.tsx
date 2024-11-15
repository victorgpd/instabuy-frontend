import Header from '../header/header'
import { Main } from '../main/main'

interface ScreenProps {
  children: React.ReactNode
  stateMenu?: string
  setStateMenu?: React.Dispatch<React.SetStateAction<string>>
}

export const Screen = (props: ScreenProps) => {
  return (
    <>
      <Header stateMenu={props.stateMenu} setStateMenu={props.setStateMenu} />
      <Main>{props.children}</Main>
    </>
  )
}

export default Screen
