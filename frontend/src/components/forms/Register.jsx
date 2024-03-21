import { useEffect, useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import './Form.css'
import { ValidateRegisterForm } from '../../services/formAuthValidation'
import { useAuth } from '../../context/authContext'

function RegisterForm () {
  // Version noob
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')

  const navigate = useNavigate()
  const { state: { user, jwt, error, isLoading }, register } = useAuth()
  const [formData, setFormData] = useState({
    firstName: 'isaac',
    lastName: 'marshall',
    username: 'test',
    email: 'test@test.fr',
    password: 'testestest123456'
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    register(formData)
  }

  useEffect(() => {
    if (user && jwt) {
      navigate('/dashboard')
    }
  }, [user])

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <Input
        name='lastName'
        label='Nom : '
        placeholder='Entrez votre Nom...'
        value={formData.lastName}
        onChange={handleChange}

      />
      <Input
        name='firstName'
        label='Prénom : '
        placeholder='Entrez votre Prénom...'
        value={formData.firstName}
        onChange={handleChange}

      />
      <Input
        name='username'
        label="Nom d'utilisateur : "
        placeholder="Entrez votre nom d'utilisateur..."
        value={formData.username}
        onChange={handleChange}
      />
      <Input
        name='email'
        label='Email : '
        placeholder='Entrez votre adresse email...'
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name='password'
        label='Mot de passe : '
        placeholder='Entrez votre mot de passe...'
        value={formData.password}
        onChange={handleChange}
      />
      {
          error && <p style={{ color: 'red' }}>{error}</p>
      }
      <Button
        isLoading={isLoading}
        type='submit'
      >
        s'enregistrer

      </Button>
    </form>
  )
}

export default RegisterForm
