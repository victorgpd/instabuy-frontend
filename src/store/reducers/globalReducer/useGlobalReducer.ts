import { useDispatch } from 'react-redux'
import { NotificationEnum } from '../../../shared/types/NotificationType'
import { useAppSelector } from '../../hooks'
import { setNotificationAction, setThemeAction, setUserAction } from './index'
import { UserType } from '../../../shared/types/UserType'

export const useGlobalReducer = () => {
  const dispatch = useDispatch()
  const { notification, userReducer, themeReducer } = useAppSelector(
    (state) => state.globalReducer
  )

  const setNotification = (
    message: string,
    type: NotificationEnum,
    description?: string
  ) => {
    dispatch(
      setNotificationAction({
        message,
        type,
        description,
      })
    )
  }

  const setUserReducer = (user: UserType) => {
    dispatch(setUserAction(user))
  }

  const setThemeReducer = (theme: 'light' | 'dark') => {
    dispatch(setThemeAction(theme))
  }

  return {
    notification,
    userReducer,
    themeReducer,
    setNotification,
    setUserReducer,
    setThemeReducer,
  }
}
