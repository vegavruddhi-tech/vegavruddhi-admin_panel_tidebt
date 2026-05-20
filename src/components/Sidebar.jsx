import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, Store, TrendingUp, Wallet,
  ArrowRightLeft, Database, ChevronLeft, ChevronRight
} from 'lucide-react'
import { useState } from 'react'
import './Sidebar.css'

const navItems = [
  { to: '/dashboard',       icon: LayoutDashboard, label: 'Dashboard'       },
  { to: '/employees',       icon: Users,            label: 'Employees'       },
  { to: '/merchants',       icon: Store,            label: 'Merchants'       },
  { to: '/performance',     icon: TrendingUp,       label: 'Performance'     },
  { to: '/transfers',       icon: ArrowRightLeft,   label: 'Transfers'       },
  { to: '/finance',         icon: Wallet,           label: 'Finance'         },
  { to: '/data-management', icon: Database,         label: 'Data Management' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">V</div>
          {!collapsed && (
            <div className="sidebar-logo-text">
              <span className="sidebar-brand">VEGAVRUDDHI</span>
              <span className="sidebar-sub">Admin Panel</span>
            </div>
          )}
        </div>
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={20} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && <p className="sidebar-version">v1.0.0</p>}
      </div>
    </aside>
  )
}
