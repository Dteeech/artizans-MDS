import Button from './buttons/Button'
import Input from './inputs/Input'
import { useEffect, useState } from 'react'
import { useLogin } from '../../hooks/Auth'
import { useNavigate } from 'react-router-dom'

import './Form.css'

function LoginForm () {
  const [formData, setFormData] = useState({
    identifier: 'jeanmich@gmail.com',
    password: 'password'

  })
  const navigate = useNavigate()
  const { response, error, login } = useLogin()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData)
  }

  useEffect(() => {
    if (response && response.jwt) {
      navigate('/dashboard')
    }
  }, [response])

  return (

    <>

      <form onSubmit={handleSubmit}>
        <h2>Se connecter</h2>
        <Input
          type='email'
          label='email'
          name='identifier'
          placeholder='mail@provider.com'
          value={formData.identifier}
          onChange={handleChange}
        />
        <Input
          type='password'
          label='Mot de passe'
          name='password'
          placeholder='Mot de passe : '
          value={formData.password}
          onChange={handleChange}
        />
        {
                    error && <p style={{ color: 'red' }}>{error}</p>
                }
        <Button
          type='submit'
        >
          Se connecter
        </Button>

      </form>

    </>

  )
}

export default LoginForm
