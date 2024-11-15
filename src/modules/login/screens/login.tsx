import { useEffect, useState } from 'react'
import {
  getAuthorizationToken,
  setAuthorizationToken,
  verifyLoggedInLogin,
} from '../../../shared/functions/auth'
import Screen from '../../../shared/components/screen/screen'
import { FlexContainer } from '../../../shared/components/flexcontainer/flexcontainer.style'
import {
  InputInsert,
  statusType,
} from '../../../shared/components/inputs/inputInsert/inputInsert'
import { InputPassword } from '../../../shared/components/inputs/inputPassword/inputPassword'
import { Button } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import axios from 'axios'
import { URL_API_USER } from '../../../shared/constants'
import { UserType } from '../../../shared/types/UserType'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'
import { insertRoutesEnum } from '../../painel/product/insertProduct/routes'
import useTitle from '../../../shared/hooks/useTitle'

const Login = () => {
  const { setNotification, setUserReducer } = useGlobalReducer()
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const [status, setStatus] = useState<{
    username: statusType
    password: statusType
  }>({
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  useTitle('Login')

  useEffect(() => {
    verifyLoggedInLogin()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    setStatus({
      username: '',
      password: '',
    })
  }

  const handleLogin = async () => {
    setLoading(true)
    await axios
      .post(URL_API_USER, { username: user.username, password: user.password })
      .then((response) => {
        const data = response.data as UserType

        if (data.ativo == 'true') {
          setAuthorizationToken(data.accessToken)
          setUserReducer({
            name: data.name,
            user: data.user,
            password: data.password,
            accessToken: data.accessToken,
            ativo: data.ativo,
          })
          window.location.href = insertRoutesEnum.INSERT_URL
        }
      })
      .catch(() => {
        setNotification(
          'Falha no login...',
          'error',
          'Usuário ou senha invalido!'
        )
        setStatus({
          username: 'error',
          password: 'error',
        })
      })
    setLoading(false)
  }

  const handleEnterPress: React.KeyboardEventHandler<HTMLInputElement> = () => {
    handleLogin()
  }

  return (
    <Screen>
      <FlexContainer background="transparent" justify="center">
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
          <FlexContainer
            background="#"
            gap="15px"
            directionwrap="column nowrap"
          >
            <InputInsert
              name="username"
              title="Nome de usuário"
              value={user.username}
              onChange={(e) => handleInputChange(e)}
              onEnter={handleEnterPress}
              status={status.username}
            />
            <InputPassword
              name="password"
              title="Senha"
              value={user.password}
              onChange={(e) => handleInputChange(e)}
              onEnter={handleEnterPress}
              status={status.password}
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
      </FlexContainer>
    </Screen>
  )
}

export default Login
