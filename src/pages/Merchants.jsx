import { useState } from 'react'
import { Search, ArrowRightLeft, X } from 'lucide-react'
import './PageCommon.css'
import './Merchants.css'

const merchants = []  // will be fetched from Supabase
const fseList = []    // will be fetched from Supabase

export default function Merchants() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [transferModal, setTransferModal] = useState(false)
  const [selectedMerchant, setSelectedMerchant] = useState(null)
  const [newFSE, setNewFSE] = useState('')
  const [transferSuccess, setTransferSuccess] = useState(false)

  const filtered = merchants.filter(m => {
    const matchSearch = m.name?.toLowerCase().includes(search.toLowerCase()) ||
                        m.merchant_id?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || m.status === statusFilter
    return matchSearch && matchStatus
  })

  const openTransfer = (merchant) => {
    setSelectedMerchant(merchant)
    setNewFSE('')
    setTransferSuccess(false)
    setTransferModal(true)
  }

  const handleTransfer = () => {
    if (!newFSE) return
    // TODO: update Supabase here
    setTransferSuccess(true)
    setTimeout(() => setTransferModal(false), 1500)
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Merchants</h2>
          <p className="page-sub">View and manage all merchant accounts</p>
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
              <th>Current FSE</th>
              <th>BT Amount</th>
              <th>RP Points</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 32, color: 'var(--gray-400)' }}>
                  No merchants found
                </td>
              </tr>
            ) : (
              filtered.map((m, i) => (
                <tr key={i}>
                  <td><span className="id-badge">{m.merchant_id}</span></td>
                  <td><strong>{m.name}</strong></td>
                  <td>{m.location}</td>
                  <td>{m.fse_name}</td>
                  <td><strong style={{ color: 'var(--green-700)' }}>{m.bt_amount}</strong></td>
                  <td>{m.rp_points}</td>
                  <td><span className={`status-pill ${m.status?.toLowerCase()}`}>{m.status}</span></td>
                  <td>
                    <button
                      className="transfer-btn"
                      onClick={() => openTransfer(m)}
                    >
                      <ArrowRightLeft size={13} /> Transfer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Transfer Modal */}
      {transferModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Transfer Merchant</h3>
              <button className="modal-close" onClick={() => setTransferModal(false)}>
                <X size={18} />
              </button>
            </div>

            {transferSuccess ? (
              <div className="transfer-success">
                <div className="success-icon">✓</div>
                <p>Merchant transferred successfully!</p>
              </div>
            ) : (
              <>
                <div className="modal-body">
                  <div className="modal-info-row">
                    <span className="modal-label">Merchant</span>
                    <span className="modal-value">{selectedMerchant?.name}</span>
                  </div>
                  <div className="modal-info-row">
                    <span className="modal-label">Current FSE</span>
                    <span className="modal-value">{selectedMerchant?.fse_name}</span>
                  </div>
                  <div className="modal-field">
                    <label>Transfer To (New FSE)</label>
                    <select
                      value={newFSE}
                      onChange={e => setNewFSE(e.target.value)}
                      className="modal-select"
                    >
                      <option value="">Select FSE</option>
                      {fseList.map((fse, i) => (
                        <option key={i} value={fse.employee_id}>{fse.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="cancel-btn" onClick={() => setTransferModal(false)}>Cancel</button>
                  <button
                    className="confirm-btn"
                    onClick={handleTransfer}
                    disabled={!newFSE}
                  >
                    Confirm Transfer
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
