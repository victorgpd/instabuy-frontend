import { useDispatch } from 'react-redux'

import { NotificationEnum } from '../../../shared/types/NotificationType'
import { useAppSelector } from '../../hooks'
import { setNotificationAction } from './index'

export const useGlobalReducer = () => {
  const dispatch = useDispatch()
  const { notification } = useAppSelector((state) => state.globalReducer)

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

  return {
    notification,
    setNotification,
  }
}
