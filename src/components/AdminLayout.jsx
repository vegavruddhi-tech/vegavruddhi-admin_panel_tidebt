import { useEffect } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import './AdminLayout.css'

const pageTitles = {
  '/dashboard':       'Admin Overview',
  '/employees':       'Employees',
  '/merchants':       'Merchants',
  '/performance':     'Performance',
  '/transfers':       'Transfers',
  '/finance':         'Finance',
  '/data-management': 'Data Management',
}

export default function AdminLayout() {
  const { user, role, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (loading) return
    if (!user) { navigate('/login'); return }
    if (role && role !== 'admin') { navigate('/unauthorized'); return }
  }, [user, role, loading, navigate])

  if (loading) {
    return (
      <div className="splash-screen">
        <div className="splash-logo-icon">V</div>
        <h2 className="splash-brand">VEGAVRUDDHI</h2>
        <p className="splash-label">ADMIN PANEL</p>
        <div className="splash-bar" />
        <div className="splash-loader" />
      </div>
    )
  }

  if (!user || role !== 'admin') return null

  const title = pageTitles[location.pathname] || 'Admin Panel'

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Navbar title={title} />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
