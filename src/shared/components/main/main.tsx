import { MainContainer } from './main.style'

interface MainProps {
  children?: React.ReactNode
}

export const Main = (props: MainProps) => {
  return (
    <>
      <MainContainer>{props.children}</MainContainer>
    </>
  )
}
