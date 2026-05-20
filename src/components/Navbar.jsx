import { LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar({ title }) {
  const { user, signOut } = useAuth()

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">{title}</h1>
      </div>
      <div className="navbar-right">

        <div className="nav-user">
          <div className="nav-avatar">
            {user?.user_metadata?.avatar_url
              ? <img src={user.user_metadata.avatar_url} alt="avatar" />
              : <User size={16} />
            }
          </div>
          <div className="nav-user-info">
            <span className="nav-user-name">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Admin'}
            </span>
            <span className="nav-user-role">Admin</span>
          </div>
        </div>

        <button className="nav-icon-btn logout-btn" onClick={signOut} title="Sign out">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  )
}
