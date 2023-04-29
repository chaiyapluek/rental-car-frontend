import axios from 'axios'

import { API_URL } from '../../config/config'

const getProviders = async () => {
  try {
    const response = await axios.get(API_URL + 'providers/')
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const getBooking = async (user) => {
  if (!user || user === 'null') {
    throw new Error('user not logged in')
  }
  try {
    const response = await axios.get(API_URL + 'bookings/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const createBooking = async (user, provider, apptDate) => {
  const response = await axios.post(
    `${API_URL}providers/${provider._id}/bookings`,
    { apptDate },
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  )
  return response
}

const getMyBookings = async (user) => {
  const response = await axios.get(`${API_URL}bookings?all=false`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  })
  return response
}

const getMyCompleteBookings = async (user) => {
  const response = await axios.get(
    `${API_URL}bookings?complete=true&all=false`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    }
  )
  return response
}

const completeBooking = async (user, bookingId) => {
  const response = await axios.put(
    `${API_URL}bookings/${bookingId}`,
    { complete: true },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    }
  )
  return response
}

const deleteBooking = async (user, bookingId) => {
  const response = await axios.delete(`${API_URL}bookings/${bookingId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  })
  return response
}

const userService = {
  getProviders,
  getBooking,
  createBooking,
  getMyBookings,
  getMyCompleteBookings,
  completeBooking,
  deleteBooking,
}

export default userService
