import axios from 'axios'

import { API_URL } from '../../config/config'

const register = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'auth/register', userData)
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data.name
    }
  } catch (error) {
    if (error.response.status === 400) {
      throw new Error(error.response.data.msg)
    } else {
      throw new Error('failed to register, try again later')
    }
  }
}

const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'auth/login', userData)
    if (response.data) {
      console.log(response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    }
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error('Invalid user name or password')
    } else {
      throw new Error('failed to login, try again later')
    }
  }
}

const logout = () => {
  localStorage.setItem('user', null)
}

const authService = {
  register,
  login,
  logout,
}

export default authService
