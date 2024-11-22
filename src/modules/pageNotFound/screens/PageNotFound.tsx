import { Button, Result } from 'antd'
import Screen from '../../../shared/components/screen/screen'
import { useNavigate } from 'react-router-dom'
import { FlexContainer } from '../../../shared/components/flexcontainer/flexcontainer.style'

export const PageNotFound = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/') // Redireciona para a página inicial
  }

  return (
    <Screen>
      <FlexContainer background="#" justify="center" height="100%">
        <Result
          status="404"
          title="Página não encontrada (404)"
          subTitle="Desculpe, a página que você está procurando não existe."
          extra={
            <Button type="primary" onClick={goHome}>
              Voltar para a Página Inicial
            </Button>
          }
        />
      </FlexContainer>
    </Screen>
  )
}

export default PageNotFound
