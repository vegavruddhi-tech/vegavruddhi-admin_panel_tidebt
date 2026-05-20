import { useAuth } from '../context/AuthContext'
import { ShieldOff } from 'lucide-react'
import './Unauthorized.css'

export default function Unauthorized() {
  const { signOut } = useAuth()

  return (
    <div className="unauth-bg">
      <div className="unauth-card">
        <div className="unauth-icon">
          <ShieldOff size={40} color="#ef4444" />
        </div>
        <h2>Access Denied</h2>
        <p>You don't have admin privileges to access this panel.</p>
        <p className="unauth-sub">Contact your administrator if you think this is a mistake.</p>
        <button className="unauth-btn" onClick={signOut}>Sign Out</button>
      </div>
    </div>
  )
}
