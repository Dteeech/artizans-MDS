import { Outlet, Navigate } from 'react-router-dom'
function PrivateRoutes () {
  const auth = window.localStorage.getItem('AUTH')
  const authObject = JSON.parse(auth)

  const token = authObject?.jwt
  // valider le jwt

  return (
    token ? <Outlet /> : <Navigate to='/authentication' />
  )
}

export default PrivateRoutes
