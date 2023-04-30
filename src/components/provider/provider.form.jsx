import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {
  FaAddressBook,
  FaPhoneSquare,
  FaIdCard,
  FaBook,
  FaUser,
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import Image from '../Image'
import { API_URL } from '../../config/config'
import userService from '../../features/user/userService'

export default function ProviderForm({ provider, fetchData }) {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

  const path = window.location.pathname.replace(`/${provider._id}`, '')
  const [apptDate, setApptDate] = useState()

  const fields = [
    { Icon: FaIdCard, content: provider._id },
    { Icon: FaAddressBook, content: provider.address },
    { Icon: FaPhoneSquare, content: provider.tel },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await userService.createBooking(user, provider, apptDate)
      toast.success('Booking successful!')
      if(fetchData){
        fetchData()
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Request failed with status code ${error.response.status}`)
        toast.error(error.response.message)
      } else {
        toast.error('Request failed with status code 500')
        toast.error('Internal server error')
      }
    }
  }

  return (
    <form
      key={provider._id}
      className='drop-shadow'
      style={{
        display: 'flex',
        width: '80%',
        height: '210px',
        padding: '20px',
        border: path === '/' ? '1px solid #696969' : 'none',
        borderRadius: '5px',
        textAlign: 'center',
        overflowX: 'auto',
      }}
      onSubmit={handleSubmit}
    >
      {path === '/providers' ? (
        <div
          to={`/providers/${provider._id}`}
          className='flex-center h-full'
          style={{
            aspectRatio: 1,
            borderRadius: '5px',
            filter: 'none',
          }}
        >
          <Image
            Alt={FaUser}
            src={provider.pic}
            className='w-full h-full'
            style={{
              borderRadius: '5px',
            }}
          />
        </div>
      ) : (
        <Link
          to={`/providers/${provider._id}`}
          className='flex-center h-full'
          style={{
            aspectRatio: 1,
            borderRadius: '5px',
            filter: 'none',
          }}
        >
          <Image
            Alt={FaUser}
            src={provider.pic}
            className='w-full h-full'
            style={{
              borderRadius: '5px',
            }}
          />
        </Link>
      )}
      <div
        className='h-full'
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flex: 1,
          padding: '4px 28px',
        }}
      >
        <div
          className='flex-center w-full'
          style={{ fontSize: '24px', fontWeight: 600 }}
        >
          {provider.name}
        </div>
        {fields.map((field, idx) => {
          const Icon = field.Icon
          const content = field.content
          return (
            <div
              key={provider._id + '-field-' + idx}
              className='flex-center w-full'
              style={{
                position: 'relative',
                padding: '0 90px',
                color: '#555',
                gap: '6px',
              }}
            >
              <span
                className='flex-center'
                style={{ position: 'absolute', left: '60px' }}
              >
                <Icon />
              </span>
              <span className='w-full ellipsis' style={{ maxWidth: '290px' }}>
                {content}
              </span>
            </div>
          )
        })}
        <div
          className='flex-center w-full'
          style={{
            position: 'relative',
            padding: '0 60px',
            color: '#555',
            gap: '6px',
          }}
        >
          <div
            className='w-full flex-center'
            style={{
              display: 'flex',
              flex: 1,
            }}
          >
            <span
              className='flex-center'
              style={{ position: 'absolute', left: '60px' }}
            >
              <FaBook />
            </span>
            <input
              type='datetime-local'
              style={{ width: '184px', height: '30px' }}
              onChange={(e) => {
                setApptDate(e.target.value)
              }}
            />
          </div>
          <button
            type='submit'
            className='btn drop-shadow'
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              height: '30px',
              padding: '0 10px',
              fontSize: '15px',
            }}
          >
            Book
          </button>
        </div>
      </div>
    </form>
  )
}
