import { useState } from 'react'
import Menu from '../../../../shared/components/menu/menu'
import Screen from '../../../../shared/components/screen/screen'
import useTitle from '../../../../shared/hooks/useTitle'

const Dashboard = () => {
  useTitle('Dashboard')
  const [display, setDisplay] = useState('none')

  return (
    <Screen stateMenu={display} setStateMenu={setDisplay}>
      <Menu display={display} currentKey="dashboard" />
    </Screen>
  )
}

export default Dashboard
