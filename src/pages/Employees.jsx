import { useState } from 'react'
import { Search, Plus, Edit2, Trash2, UserCheck, UserX } from 'lucide-react'
import './PageCommon.css'

const mockEmployees = []

export default function Employees() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')

  const filtered = mockEmployees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
                        e.id.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'All' || e.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Employees</h2>
          <p className="page-sub">Manage all FSEs and Team Leaders</p>
        </div>
        <button className="primary-btn"><Plus size={16} /> Add Employee</button>
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
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(emp => (
              <tr key={emp.id}>
                <td><span className="id-badge">{emp.id}</span></td>
                <td><strong>{emp.name}</strong></td>
                <td>
                  <span className={`role-pill ${emp.role.toLowerCase()}`}>{emp.role}</span>
                </td>
                <td>{emp.location}</td>
                <td>{emp.email}</td>
                <td>
                  <span className={`status-pill ${emp.status.toLowerCase()}`}>{emp.status}</span>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn edit"><Edit2 size={14} /></button>
                    <button className="icon-btn delete"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="empty-state">No employees found.</div>
        )}
      </div>
    </div>
  )
}
