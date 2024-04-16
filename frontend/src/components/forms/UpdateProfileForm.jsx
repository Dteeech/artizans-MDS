import { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { Button, Input } from '@nextui-org/react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function UpdateProfileForm () {
  const { state: { isLoggedIn, user, loading, error, jwt }, login, logout, updateMe } = useAuth()
  const [changeInfos, setChangeInfos] = useState(false)

  const [formData, setFormData] = useState({

    username: '',
    email: ''

  })

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/authentication')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatedUser = await updateMe(formData, user.id, jwt)
      if (updatedUser) {
        setFormData({
          username: updatedUser.username,
          email: updatedUser.email
        })
        toast.success('Vos informations ont été mises à jour avec succès !')
      } else {
        toast.error('Erreur lors de la mise à jour des informations utilisateur.')
      }
    } catch (error) {
      console.error(error)
      toast.error('Erreur lors de la mise à jour des informations utilisateur.')
    }
  }

  return (
    isLoggedIn
      ? (
        <div className='flex flex-col gap-6 justify-center align-center m-44'>
          <h1>Profile</h1>
          {loading && <p>Chargement des données...</p>}
          {error && <p>Erreur lors du chargement des données</p>}
          {user && (
            changeInfos
              ? (
                <>
                  <form onSubmit={handleSubmit} className='flex flex-col gap-6 bg-primary-100 p-6 rounded-large '>

                    <Input
                      type='username'
                      label="nom d'utilisateur"
                      placeholder={user.username}
                      className='max-w-lg self-center'
                      name='username' s
                      value={formData.username}
                      onChange={handleChange}
                    />
                    <Input
                      type='email'
                      label='Email'
                      placeholder={user.email}
                      className='max-w-lg self-center'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                    />

                    <Button color='primary' className='w-40 self-center' type='submit'>Enregistrer</Button> {/* TODO ajouter une action put user */}
                    <Button onClick={handleLogout}>Se déconnecter</Button>
                  </form>

                </>
                )

              : (
                <>
                  <p>Bonjour {user.username}</p>
                  <p>Votre adresse email est {user.email}</p>
                  <Button onClick={setChangeInfos}>Modifier</Button>
                </>
                )
          )}
        </div>
        )
      : (
        // Afficher un message si l'utilisateur n'est pas connecté
        <div>
          <p>Vous n'êtes pas connecté.</p>
          <button onClick={login}>Se connecter</button>
        </div>
        )
  )
}

export default UpdateProfileForm
