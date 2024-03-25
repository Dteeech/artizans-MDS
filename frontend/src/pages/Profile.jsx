import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { Button, Input } from '@nextui-org/react'

function Profile () {
  const { state: { isLoggedIn, user, loading, error }, logout } = useAuth()
  const [changeInfos, setChangeInfos] = useState(false)

  return (
    isLoggedIn
      ? (
        <div className='flex flex-col gap-6 justify-center m-44'>
          <h1>Profile</h1>
          {loading && <p>Chargement des données...</p>}
          {error && <p>Erreur lors du chargement des données</p>}
          {user && ( // Only render user info if user is present
            changeInfos
              ? (
                <>

                  <Input
                    type='username'
                    label="nom d'utilisateur"
                    placeholder={user.username}
                    className='max-w-lg self-center'
                  />
                  <Input
                    type='email'
                    label='Email'
                    defaultValue={user.email}
                    className='max-w-lg self-center'
                  />
                  <Button color='primary' className='w-40 self-center' onPress={() => setChangeInfos(false)}>Enregistrer</Button> {/* TODO ajouter une action put user */}
                </>
                )

              : (
                <>
                  <p>Bonjour {user.username}</p>
                  <p>Votre adresse email est {user.email}</p>
                  <Button onPress={setChangeInfos}>Modifier</Button>
                </>
                )
          )}
        </div>
        )
      : (
        // Afficher un message si l'utilisateur n'est pas connecté
        <div>
          <p>Vous n'êtes pas connecté.</p>
          <button onClick={logout}>Se connecter</button>
        </div>
        )
  )
}

export default Profile
