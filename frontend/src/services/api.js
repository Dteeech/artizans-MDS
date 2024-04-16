// api.js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
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
  console.log(response?.data)
  const _response = response?.data
  return _response
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

  const _response = response?.data
  return _response
}

export { loginApi, registerApi, updateMeApi, getRole }
