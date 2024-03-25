import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 10000,
  header: {
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

const registerApi = async (credentials) => {
  const response = await axiosInstance.post('/auth/local/register', credentials)
  return response?.data
}

export { loginApi, registerApi }
