import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'

function Dashboard () {
  const navigate = useNavigate()

  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/authentication')
  }
  return (
    <>
      <h2>DASHBOARD</h2>
    </>
  )
}

export default Dashboard
