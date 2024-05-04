// api.js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json'
  }
})

/**
 * @param {object}  credentials {identifier, password}
 * @return {object} result {jwt, user}
 */
const loginApi = async (credentials) => {
  const response = await axiosInstance.post('/auth/local', credentials)
  return response?.data
}

const getRole = (userId, jwt) => {
  const response = axiosInstance.get(`/api/users-permissions/roles/${userId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })

  return response?.data
}

const registerApi = async (credentials) => {
  const response = await axiosInstance.post('/auth/local/register', credentials)
  return response?.data
}

const updateMeApi = async (userInfos, userId, jwt) => {
  const response = await axiosInstance.put(`/users/${userId}`, userInfos, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  console.log(response?.data)
  return response?.data
}

const updateUserApi = async (userData) => {
  try {
    console.log(userData)
    const response = await axiosInstance.put(`/users/${userData.id}`, userData)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message || "Erreur lors de la mise à jour de l'utilisateur")
  }
}

const deleteUserApi = async (userId) => {
  const response = await axiosInstance.delete(`/users/${userId}`)
  console.log(userId)
  return response?.data
}
export { loginApi, registerApi, updateMeApi, getRole, deleteUserApi, updateUserApi }
