import { useState } from 'react'
import { Search, Plus, Edit2, Eye } from 'lucide-react'
import './PageCommon.css'

const mockMerchants = []

export default function Merchants() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = mockMerchants.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                        m.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || m.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Merchants</h2>
          <p className="page-sub">View and manage all merchant accounts</p>
        </div>
        <button className="primary-btn"><Plus size={16} /> Add Merchant</button>
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
          {['All', 'Active', 'Inactive', 'Pending'].map(s => (
            <button
              key={s}
              className={`filter-tab ${statusFilter === s ? 'active' : ''}`}
              onClick={() => setStatusFilter(s)}
            >{s}</button>
          ))}
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Merchant ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>FSE</th>
              <th>BT Amount</th>
              <th>RP Points</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id}>
                <td><span className="id-badge">{m.id}</span></td>
                <td><strong>{m.name}</strong></td>
                <td>{m.location}</td>
                <td>{m.fse}</td>
                <td><strong style={{ color: 'var(--green-700)' }}>{m.bt}</strong></td>
                <td>{m.rp}</td>
                <td>
                  <span className={`status-pill ${m.status.toLowerCase()}`}>{m.status}</span>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn view"><Eye size={14} /></button>
                    <button className="icon-btn edit"><Edit2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="empty-state">No merchants found.</div>
        )}
      </div>
    </div>
  )
}
