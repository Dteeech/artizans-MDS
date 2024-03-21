import { createContext, useContext, useEffect, useReducer } from 'react'
import { loginApi, registerApi } from '../services/api'
import { toast } from 'react-toastify'

const AuthContext = createContext()
const actionTypes = {
  LOGIN: 'LOGIN', // connecté avec succès
  REGISTER: 'REGISTER', // inscrit plus connecté avec succès
  LOGOUT: 'LOGOUT', // déconnecté
  LOADING: 'LOADING', // Chargement
  ERROR: 'ERROR', // Erreur
  RESET: 'RESET' // réinisialisation de l'état
}

const initialState = {
  jwt: null,
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null
}

/**
 *
 * @param prevState Etat precedent de l'action
 * @param action action pour mettre à jour l'état = { type, data? {jwt, user, error} }
 */

const authReducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER:
    case actionTypes.LOGIN:
      return {
        jwt: action.data.jwt,
        user: action.data.jwt,
        loading: false,
        isLoggedIn: true,
        error: null
      }
    case actionTypes.ERROR:
      return {
        jwt: null,
        user: null,
        loading: false,
        isLoggedIn: false,
        error: action.data.error
      }

    case actionTypes.LOADING:
      return {
        ...prevState,
        loading: true
      }

    case actionTypes.RESET:
    case actionTypes.LOGOUT:
      return initialState

    default:
      throw new Error(`unhandled action type : ${action.type}`)
  }
}

// Chainon manquant entre une classe et un objet,
// va permettre de lister tout un tas de méthodes pour les rendres disponibles un peu partout
const AuthFactory = (dispatch) => ({
  // ajout de la méthode register
  register: async (credentials) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const result = await registerApi(credentials)
      dispatch({
        type: actionTypes.REGISTER,
        data: {
          user: result.user,
          jwt: result.jwt
        }
      })
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement")
      dispatch({
        type: actionTypes.ERROR,
        data: error
      })
    }
  },
  // credential = { identifier, password }
  login: async (credentials) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const result = await loginApi(credentials)
      dispatch({
        type: actionTypes.LOGIN,
        data: {
          user: result.user,
          jwt: result.jwt
        }
      })
      // TOPDO terminer la méthode
    } catch (error) {
      toast.error('mot de passe ou identifiant incorrect')
      dispatch({
        type: actionTypes.ERROR,
        data: error
      })
    }
  },
  logout: () => {
    dispatch({ type: actionTypes.LOGOUT })
  }
})

const AuthProvider = ({ children }) => {
  const savedState = window.localStorage.getItem('AUTH')
  const _initialState = savedState ? JSON.parse(savedState) : initialState
  const [state, dispatch] = useReducer(authReducer, _initialState)

  useEffect(() => {
    window.localStorage.setItem('AUTH', JSON.stringify(state))
  }, [state])

  return (
    <AuthContext.Provider value={{ state, ...AuthFactory(dispatch) }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be use indide an <AuthProvider>')
  return context
}

export { AuthProvider, useAuth }
