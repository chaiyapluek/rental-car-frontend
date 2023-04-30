import { Link } from 'react-router-dom'
import { FaHistory, FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import ProviderForm from '../components/provider/provider.form'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import userService from '../features/user/userService'

function Home() {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

  return (
    <>
      <section className='heading'>
        <h1>Rental Car Booking System</h1>
        <p>Please choose from an option below</p>
      </section>
      <section
        className='flex-center'
        style={{ flexDirection: 'column', gap: '20px', paddingBottom: '60px' }}
      >
        <Link
          to='/providers'
          className='btn btn-reverse drop-shadow'
          style={{ width: '80%', fontSize: '18px', fontWeight: 600 }}
        >
          <FaQuestionCircle />
          Book a new car
        </Link>
        <Link
          to='/history'
          className='btn btn drop-shadow'
          style={{ width: '80%', fontSize: '18px', fontWeight: 600 }}
        >
          <FaHistory />
          My Booking History
        </Link>
      </section>
      {user && (
        <section className='heading'>
          <h1>Book again</h1>
          <p>Hit the road again easily!</p>
        </section>
      )}
      {user && (
        <section style={{ paddingBottom: '60px' }}>
          <ProviderShowcase />
        </section>
      )}
    </>
  )
}
export default Home

function ProviderShowcase() {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)

  const fetchData = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data: response } = await userService.getMyCompleteBookings(user)
      setData(response.data)
    } catch (error) {
      if (error.response) {
        toast.error(`Request failed with status code ${error.response.status}`)
      } else {
        toast.error('Request failed with status code 500')
      }
    }
    setLoading(false)
  }

  // fetch data on page load
  useEffect(() => {
    fetchData()
  }, [])

  if (data.length === 0)
    return (
      <div
        className='flex-center'
        style={{ flexDirection: 'column', gap: '20px', fontSize: '24px' }}
      >
        Start booking first!
      </div>
    )
  return (
    <div
      className='flex-center'
      style={{ flexDirection: 'column', gap: '20px' }}
    >
      {data
        .sort((a, b) => (a.apptDate > b.apptDate ? 1 : -1))
        .filter(
          (a, idx, arr) =>
            arr.findIndex((b) => a.provider._id === b.provider._id) === idx
        )
        .map((booking) => (
          <ProviderForm
            provider={booking.provider}
            fetchData={fetchData}
            style={{ width: '80%' }}
          />
        ))}
    </div>
  )
}
