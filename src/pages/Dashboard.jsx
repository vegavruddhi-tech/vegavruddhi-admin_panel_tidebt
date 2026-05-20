import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Users, UserCheck, TrendingUp, CheckCircle, RefreshCw } from 'lucide-react'
import './Dashboard.css'

const statsTop = [
  { label: 'Total Forms',      value: '—', icon: TrendingUp,  color: '#8b5cf6', link: 'click to explore' },
  { label: 'Total Employees',  value: '—', icon: Users,       color: '#3b82f6', link: 'click to explore' },
  { label: 'Active Employees', value: '—', icon: UserCheck,   color: '#22c55e', link: 'click to explore' },
  { label: 'Total TLs',        value: '—', icon: Users,       color: '#f59e0b', link: 'click to explore' },
  { label: 'Ready to Onboard', value: '—', icon: CheckCircle, color: '#10b981', link: 'click to explore' },
]

const statsBottom = [
  { label: 'Ready for Onboarding', value: '—', color: '#16a34a', bg: '#f0fdf4', border: '#86efac' },
  { label: 'Not Interested',       value: '—', color: '#ef4444', bg: '#fef2f2', border: '#fca5a5' },
  { label: 'Try but not done',     value: '—', color: '#f59e0b', bg: '#fffbeb', border: '#fcd34d' },
  { label: 'Need to visit again',  value: '—', color: '#3b82f6', bg: '#eff6ff', border: '#93c5fd' },
]

const barData = []
const lineData = []
const topFSEs = []

export default function Dashboard() {
  return (
    <div className="dashboard">

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-tabs">
          {['All', 'Today', 'This Week', 'This Month'].map(t => (
            <button key={t} className={`filter-tab ${t === 'All' ? 'active' : ''}`}>{t}</button>
          ))}
        </div>
        <div className="filter-selects">
          <input type="date" className="filter-input" placeholder="From" />
          <input type="date" className="filter-input" placeholder="To" />
          <select className="filter-select"><option>May 2025</option></select>
          <select className="filter-select"><option>Team Leader</option></select>
          <select className="filter-select"><option>Employee</option></select>
          <select className="filter-select"><option>Status</option></select>
          <button className="reset-btn"><RefreshCw size={14} /> Reset</button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="stats-grid-top">
        {statsTop.map(({ label, value, icon: Icon, color, link }) => (
          <div className="stat-card" key={label}>
            <div className="stat-icon" style={{ background: color + '20', color }}>
              <Icon size={20} />
            </div>
            <div className="stat-info">
              <p className="stat-label">{label}</p>
              <h3 className="stat-value" style={{ color }}>{value}</h3>
              <p className="stat-link">↗ {link}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Status Cards */}
      <div className="stats-grid-bottom">
        {statsBottom.map(({ label, value, color, bg, border }) => (
          <div className="status-card" key={label} style={{ background: bg, borderColor: border }}>
            <p className="status-label">{label}</p>
            <h2 className="status-value" style={{ color }}>{value}</h2>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3>Forms by Product</h3>
              <p>Verification breakdown per product</p>
            </div>
            <div className="chart-legend">
              <span className="legend-dot" style={{ background: '#16a34a' }} /> Fully Verified
              <span className="legend-dot" style={{ background: '#f59e0b' }} /> Partially Done
              <span className="legend-dot" style={{ background: '#ef4444' }} /> Not Found
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3>Daily Form Submissions</h3>
              <p>Click any bar to explore</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#16a34a" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top 10 FSEs */}
      <div className="table-card">
        <div className="table-header">
          <h3>Top 10 FSEs</h3>
          <div className="table-badges">
            <span className="badge green">FSE</span>
            <span className="badge gray">TL</span>
          </div>
          <div className="table-actions">
            <button className="tbl-btn green">Form Count</button>
            <button className="tbl-btn outline">Ready to Onboard</button>
            <button className="tbl-btn outline">Not Interested</button>
            <button className="tbl-btn outline">Points</button>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Team Leader</th>
              <th>Total Forms</th>
              <th>Onboarded</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {topFSEs.map(({ rank, name, tl, forms, onboard }) => (
              <tr key={rank}>
                <td><span className="rank-badge">{rank}</span></td>
                <td><strong>{name}</strong></td>
                <td>{tl}</td>
                <td>{forms}</td>
                <td>{onboard}</td>
                <td><span className="status-pill active">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
