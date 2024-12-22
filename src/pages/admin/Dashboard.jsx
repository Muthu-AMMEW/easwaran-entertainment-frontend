import { Navigate } from 'react-router-dom'
import { isAuthenticated, isAdmin } from '../../services/Auth'
import AdminNavBar from './AdminNavBar'
import AllVideoDetails from './AllVideoDetails'

export default function Dashboard() {
  if (!isAuthenticated() || !isAdmin()) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <div>
        <AdminNavBar />
        <AllVideoDetails />
      </div>
    </>
  )
}
