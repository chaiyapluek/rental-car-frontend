import { FaHistory, FaUser } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import DataTable from 'react-data-table-component'
import Image from '../components/Image'
import { Link } from 'react-router-dom'
import { API_URL } from '../config/config'
import userService from '../features/user/userService'

function BookingHistory() {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

  return (
    <section className='heading' style={{ paddingBottom: '60px' }}>
      {user && <Table />}
    </section>
  )
}
export default BookingHistory

function Table() {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const { data: response } = await userService.getMyBookings(user)
      setData(response.data)
    } catch (error) {
      if (error.response) {
        toast.error(`Request failed with status code ${error.response.status}`)
      } else {
        toast.error('Request failed with status code 500')
      }
    }
  }

  const handleComplete = async (bookingId) => {
    try {
      await userService.completeBooking(user, bookingId)
      toast.success('Completed booking!')
    } catch (error) {
      if (error.response) {
        toast.error(`Request failed with status code ${error.response.status}`)
      } else {
        toast.error('Request failed with status code 500')
      }
    }
    fetchData()
  }

  const handleDelete = async (bookingId) => {
    try {
      await userService.deleteBooking(user, bookingId)
      toast.success('Deleted booking!')
    } catch (error) {
      if (error.response) {
        toast.error(`Request failed with status code ${error.response.status}`)
      } else {
        toast.error('Request failed with status code 500')
      }
    }
    fetchData()
  }

  // fetch data on page load
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      if (!user) return
      await fetchData()
      setLoading(false)
    })()
  }, [])

  const Title = (
    <h1 className='flex-center' style={{ gap: '6px' }}>
      <FaHistory />
      Booking History
    </h1>
  )

  const columns = [
    {
      name: 'Provider',
      selector: (booking) => booking.provider.name,
      cell: (booking) => (
        <div
          style={{
            display: 'flex',
            gap: '12px',
            height: '60px',
            alignItems: 'center',
          }}
        >
          <Link to={`/providers/${booking.provider._id}`}>
            <Image
              alt={FaUser}
              src={booking.provider.pic}
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '6969px',
              }}
            />
          </Link>
          <div
            className='ellipsis'
            style={{ maxWidth: '170px', fontWeight: 500 }}
          >
            {booking.provider.name}
          </div>
        </div>
      ),
      width: '234px',
      sortable: true,
    },
    {
      name: 'Tel',
      selector: (booking) => booking.provider.tel,
      cell: (booking) => (
        <div style={{ maxWidth: '110px' }} className='ellipsis'>
          {booking.provider.tel}
        </div>
      ),
      width: '129px',
      sortable: true,
    },
    {
      name: 'Appointment date',
      selector: (booking) => booking.apptDate,
      cell: (booking) => (
        <div>{new Date(booking.apptDate).toLocaleString()}</div>
      ),
      width: '200px',
      sortable: true,
    },
    {
      name: 'Status',
      selector: (booking) => (booking.complete ? 'Complete' : 'Incomplete'),
      cell: (booking) =>
        booking.complete ? (
          <div className='status-complete' style={{ fontWeight: 600 }}>
            Complete
          </div>
        ) : (
          <div className='status-waiting' style={{ fontWeight: 600 }}>
            Incomplete
          </div>
        ),
      width: '106px',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (booking) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <div
            className='btn drop-shadow'
            style={{ padding: '7px 9px', fontSize: '15px' }}
            onClick={() => handleComplete(booking._id)}
          >
            Complete
          </div>
          <div
            className='btn btn-reverse drop-shadow'
            style={{ padding: '7px 9px', fontSize: '15px' }}
            onClick={async () => handleDelete(booking._id)}
          >
            Delete
          </div>
        </div>
      ),
      width: '194px',
    },
  ]

  const customStyles = {
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
        height: '60px',
        fontSize: '18px',
        fontWeight: 600,
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
        height: '60px',
        fontSize: '15px',
      },
    },
  }

  // const ProgressComponent = <div style={{ marginTop: '20px' }}>Loading...</div>

  return (
    <DataTable
      title={Title}
      data={data}
      columns={columns}
      customStyles={customStyles}
      progressPending={isLoading}
      // progressComponent={ProgressComponent}
      defaultSortFieldId={3}
      defaultSortAsc={false}
      fixedHeader
      fixedHeaderScrollHeight='480px'
      striped
      highlightOnHover
      responsive
    />
  )
}
