import { Button, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import './Form.css'

function LoginForm () {
  const [formData, setFormData] = useState({
    identifier: 'julien@gmail.com',
    password: 'Test123456'

  })

  const navigate = useNavigate()
  const { state: { user, jwt, error, isLoading }, login } = useAuth()

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
    if (user && jwt) {
      navigate('/dashboard')
    }
  }, [user, jwt])

  return (

    <>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <h2>Se connecter</h2>
        <Input
          className='mb-4'
          variant='underlined'
          type='email'
          label='email'
          name='identifier'
          placeholder='mail@provider.com'
          value={formData.identifier}
          onChange={handleChange}
        />
        <Input
          className='mb-4'
          variant='underlined'
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
          isLoading={isLoading}
          type='submit'
          variant='flat'
        >
          Se connecter
        </Button>

      </form>

    </>

  )
}

export default LoginForm
