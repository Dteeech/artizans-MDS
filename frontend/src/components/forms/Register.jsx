import { useState } from 'react'
import { Button, Input } from '@nextui-org/react'

import './Form.css'
import { ValidateRegisterForm } from '../../services/formAuthValidation'

function RegisterForm () {
  // Version noob
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')

  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    password: null
  })

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
    const _errors = ValidateRegisterForm(formData)
    if (errors) {
      setErrors(_errors)
    } else {
      window.alert(`Formulaire soumis: ${formData.firstName} ${formData.lastName}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <Input
        name='lastName'
        label='Nom : '
        placeholder='Entrez votre Nom...'
        value={formData.lastName}
        onChange={handleChange}
        error={errors.lastName}
      />
      <Input
        name='firstName'
        label='Prénom : '
        placeholder='Entrez votre Prénom...'
        value={formData.firstName}
        onChange={handleChange}
        error={errors.firstName}
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
      <Button
        type='submit'
      >
        s'enregistrer

      </Button>
    </form>
  )
}

export default RegisterForm
