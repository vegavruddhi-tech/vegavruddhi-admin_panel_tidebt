import { useState } from 'react'
import { Search } from 'lucide-react'
import './PageCommon.css'

const employees = [] // will be fetched from Supabase

export default function Employees() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')

  const filtered = employees.filter(e => {
    const matchSearch = e.name?.toLowerCase().includes(search.toLowerCase()) ||
                        e.employee_id?.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'All' || e.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Employees</h2>
          <p className="page-sub">View all FSEs and Team Leaders</p>
        </div>
      </div>

      <div className="page-toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            placeholder="Search by name or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          {['All', 'TL', 'FSE'].map(r => (
            <button
              key={r}
              className={`filter-tab ${roleFilter === r ? 'active' : ''}`}
              onClick={() => setRoleFilter(r)}
            >{r}</button>
          ))}
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Location</th>
              <th>Team Leader</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 32, color: 'var(--gray-400)' }}>
                  No employees found
                </td>
              </tr>
            ) : (
              filtered.map((emp, i) => (
                <tr key={i}>
                  <td><span className="id-badge">{emp.employee_id}</span></td>
                  <td><strong>{emp.name}</strong></td>
                  <td><span className={`role-pill ${emp.role?.toLowerCase()}`}>{emp.role}</span></td>
                  <td>{emp.location}</td>
                  <td>{emp.tl_name || '—'}</td>
                  <td>{emp.email}</td>
                  <td><span className={`status-pill ${emp.status?.toLowerCase()}`}>{emp.status}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
