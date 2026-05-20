import { useState } from 'react'
import { Upload, Download, RefreshCw, Database, FileText, Trash2, CheckCircle, AlertCircle } from 'lucide-react'
import './PageCommon.css'
import './DataManagement.css'

const uploadLogs = []

const dataSheets = []

export default function DataManagement() {
  const [activeTab, setActiveTab] = useState('sheets')

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Data Management</h2>
          <p className="page-sub">Upload, sync and manage all backend data</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="secondary-btn"><Download size={16} /> Export All</button>
          <button className="primary-btn"><Upload size={16} /> Upload Data</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="dm-summary">
        {[
          { label: 'Total Records',    value: '—', icon: Database,   color: '#16a34a' },
          { label: 'Last Upload',      value: '—', icon: Upload,     color: '#3b82f6' },
          { label: 'Pending Sync',     value: '—', icon: RefreshCw,  color: '#f59e0b' },
          { label: 'Failed Uploads',   value: '—', icon: AlertCircle,color: '#ef4444' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div className="dm-card" key={label}>
            <div className="dm-icon" style={{ background: color + '20', color }}>
              <Icon size={20} />
            </div>
            <div>
              <p className="dm-label">{label}</p>
              <h3 className="dm-value" style={{ color }}>{value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="dm-tabs">
        <button
          className={`dm-tab ${activeTab === 'sheets' ? 'active' : ''}`}
          onClick={() => setActiveTab('sheets')}
        ><Database size={15} /> Data Sheets</button>
        <button
          className={`dm-tab ${activeTab === 'logs' ? 'active' : ''}`}
          onClick={() => setActiveTab('logs')}
        ><FileText size={15} /> Upload Logs</button>
      </div>

      {/* Data Sheets Tab */}
      {activeTab === 'sheets' && (
        <div className="table-card">
          <div className="table-header">
            <h3>All Data Sheets</h3>
            <button className="tbl-btn outline" style={{ marginLeft: 'auto' }}>
              <RefreshCw size={13} /> Sync All
            </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Sheet Name</th>
                <th>Total Records</th>
                <th>Last Synced</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataSheets.map(sheet => (
                <tr key={sheet.name}>
                  <td><strong>{sheet.name}</strong></td>
                  <td>{sheet.records.toLocaleString()}</td>
                  <td>{sheet.lastSync}</td>
                  <td>
                    <span className={`status-pill ${sheet.status === 'Synced' ? 'active' : 'pending'}`}>
                      {sheet.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="tbl-btn outline" style={{ fontSize: 11, padding: '4px 10px' }}>
                        <RefreshCw size={11} /> Sync
                      </button>
                      <button className="tbl-btn outline" style={{ fontSize: 11, padding: '4px 10px' }}>
                        <Download size={11} /> Export
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload Logs Tab */}
      {activeTab === 'logs' && (
        <div className="table-card">
          <div className="table-header">
            <h3>Upload History</h3>
            <button className="tbl-btn outline" style={{ marginLeft: 'auto' }}>
              <Trash2 size={13} /> Clear Logs
            </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>File Name</th>
                <th>Data Type</th>
                <th>Rows</th>
                <th>Uploaded By</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {uploadLogs.map(log => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <FileText size={14} color="var(--green-600)" />
                      <span>{log.file}</span>
                    </div>
                  </td>
                  <td>{log.type}</td>
                  <td>{log.rows}</td>
                  <td>{log.by}</td>
                  <td>{log.date}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {log.status === 'Success'
                        ? <CheckCircle size={14} color="#16a34a" />
                        : <AlertCircle size={14} color="#ef4444" />
                      }
                      <span className={`status-pill ${log.status === 'Success' ? 'active' : 'inactive'}`}>
                        {log.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload Zone */}
      <div className="upload-zone">
        <Upload size={32} color="var(--green-400)" />
        <p className="upload-title">Drag & drop files here</p>
        <p className="upload-sub">Supports .xlsx, .csv files up to 10MB</p>
        <button className="primary-btn" style={{ marginTop: 12 }}>Browse Files</button>
      </div>
    </div>
  )
}
