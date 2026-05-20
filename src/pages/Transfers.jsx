import { useState } from 'react'
import { ArrowRightLeft, Plus, Search, Eye, CheckCircle, XCircle } from 'lucide-react'
import './PageCommon.css'
import './Transfers.css'

const mockTransfers = []

const summaryCards = [
  { label: 'Total Transfers', value: '—', color: '#16a34a', bg: '#f0fdf4', border: '#86efac' },
  { label: 'Pending',         value: '—', color: '#f59e0b', bg: '#fffbeb', border: '#fcd34d' },
  { label: 'Completed',       value: '—', color: '#3b82f6', bg: '#eff6ff', border: '#93c5fd' },
  { label: 'Rejected',        value: '—', color: '#ef4444', bg: '#fef2f2', border: '#fca5a5' },
]

export default function Transfers() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = mockTransfers.filter(t => {
    const matchSearch = t.from.toLowerCase().includes(search.toLowerCase()) ||
                        t.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || t.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Transfers</h2>
          <p className="page-sub">Manage all fund and BT transfers</p>
        </div>
        <button className="primary-btn"><Plus size={16} /> New Transfer</button>
      </div>

      {/* Summary */}
      <div className="transfer-summary">
        {summaryCards.map(({ label, value, color, bg, border }) => (
          <div className="transfer-card" key={label} style={{ background: bg, borderColor: border }}>
            <p className="transfer-label">{label}</p>
            <h3 className="transfer-value" style={{ color }}>{value}</h3>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="page-toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            placeholder="Search by name or transfer ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          {['All', 'Completed', 'Pending', 'Rejected'].map(s => (
            <button
              key={s}
              className={`filter-tab ${statusFilter === s ? 'active' : ''}`}
              onClick={() => setStatusFilter(s)}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Transfer ID</th>
              <th>From</th>
              <th>To</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td><span className="id-badge">{t.id}</span></td>
                <td><strong>{t.from}</strong></td>
                <td>{t.to}</td>
                <td>
                  <span className="type-pill">{t.type}</span>
                </td>
                <td><strong style={{ color: 'var(--green-700)' }}>{t.amount}</strong></td>
                <td>{t.date}</td>
                <td>
                  <span className={`status-pill ${t.status.toLowerCase()}`}>{t.status}</span>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn view"><Eye size={14} /></button>
                    {t.status === 'Pending' && (
                      <>
                        <button className="icon-btn approve-icon"><CheckCircle size={14} /></button>
                        <button className="icon-btn reject-icon"><XCircle size={14} /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="empty-state">No transfers found.</div>}
      </div>
    </div>
  )
}
