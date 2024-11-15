import { useDispatch } from 'react-redux'
import { NotificationEnum } from '../../../shared/types/NotificationType'
import { useAppSelector } from '../../hooks'
import { setNotificationAction, setUserAction } from './index'
import { UserType } from '../../../shared/types/UserType'

export const useGlobalReducer = () => {
  const dispatch = useDispatch()
  const { notification, userReducer } = useAppSelector(
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

  return {
    notification,
    userReducer,
    setNotification,
    setUserReducer,
  }
}
