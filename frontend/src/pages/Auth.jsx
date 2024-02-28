import { useEffect, useState } from 'react'
import RegisterForm from '../components/forms/Register'
import LoginForm from '../components/forms/LoginForm'
import { useNavigate } from 'react-router-dom'

function Auth () {
  const [isRegister, setIsRegister] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const auth = window.localStorage.getItem('AUTH')
    const authObject = JSON.parse(auth)
    const token = authObject?.jwt
    if (token) {
      navigate('/dashboard')
    }
  }, null)

  return (

    <>
      {
                isRegister
                  ? <RegisterForm />
                  : <LoginForm />

            }
      <a onClick={() => setIsRegister(!isRegister)}>
        {
                    isRegister
                      ? "J'ai déjà un compte"
                      : "Je n'ai pas de compte"
                }

      </a>
    </>

  )
}

export default Auth
