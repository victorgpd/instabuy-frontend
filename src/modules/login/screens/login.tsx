import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getAuthorizationToken,
  setAuthorizationToken,
  verifyLoggedInLogin,
} from '../../../shared/functions/auth'
import Screen from '../../../shared/components/screen/screen'
import { FlexContainer } from '../../../shared/components/flexcontainer/flexcontainer.style'
import { InputInsert } from '../../../shared/components/inputs/inputInsert/inputInsert'
import { InputPassword } from '../../../shared/components/inputs/inputPassword/inputPassword'
import { Button } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import axios from 'axios'
import { URL_API_USER } from '../../../shared/constants'
import { UserType } from '../../../shared/types/UserType'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'

const Login = () => {
  const navigate = useNavigate()
  const { setNotification } = useGlobalReducer()
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = getAuthorizationToken()
    if (token) {
      verifyLoggedInLogin(navigate)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleLogin = async () => {
    setLoading(true)
    await axios
      .post(URL_API_USER, { username: user.username, password: user.password })
      .then((response) => {
        const data = response.data as UserType

        if (data.ativo == 'true') {
          setAuthorizationToken(data.accessToken)
          window.location.href = '/dashboard/insert'
        }
      })
      .catch(() => {
        setNotification(
          'Falha no login...',
          'error',
          'Usuário ou senha invalido!'
        )
      })
    setLoading(false)
  }

  const handleEnterPress: React.KeyboardEventHandler<HTMLInputElement> = () => {
    handleLogin()
  }

  return (
    <Screen>
      <FlexContainer
        background="#"
        padding="40px 20px"
        width="100%"
        height="100%"
        directionwrap="column nowrap"
        gap="15px"
        justify="center"
        style={{ maxWidth: '300px', minHeight: '400px' }}
      >
        <FlexContainer background="#" gap="15px" directionwrap="column nowrap">
          <InputInsert
            name="username"
            title="Nome de usuário"
            value={user.username}
            onChange={(e) => handleInputChange(e)}
            onEnter={handleEnterPress}
          />
          <InputPassword
            name="password"
            title="Senha"
            value={user.password}
            onChange={(e) => handleInputChange(e)}
            onEnter={handleEnterPress}
          />
        </FlexContainer>
        <Button
          loading={loading}
          type="primary"
          icon={<LoginOutlined />}
          style={{ width: '100%' }}
          onClick={handleLogin}
        >
          Entrar
        </Button>
      </FlexContainer>
    </Screen>
  )
}

export default Login
