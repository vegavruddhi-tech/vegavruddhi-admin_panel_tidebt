import { Wallet, ArrowUpRight, ArrowDownLeft, CheckCircle, Clock } from 'lucide-react'
import './PageCommon.css'
import './Finance.css'

const transactions = []

export default function Finance() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Finance & Transfers</h2>
          <p className="page-sub">Incentive payouts, settlements and reconciliation</p>
        </div>
        <button className="primary-btn"><Wallet size={16} /> Process Payout</button>
      </div>

      <div className="finance-summary">
        {[
          { label: 'Total Payouts This Month', value: '—', icon: ArrowUpRight,  color: '#16a34a', bg: '#f0fdf4' },
          { label: 'Pending Payouts',          value: '—', icon: Clock,         color: '#f59e0b', bg: '#fffbeb' },
          { label: 'Settlements Done',         value: '—', icon: CheckCircle,   color: '#3b82f6', bg: '#eff6ff' },
          { label: 'Total Transactions',       value: '—', icon: ArrowDownLeft, color: '#8b5cf6', bg: '#f5f3ff' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div className="finance-card" key={label} style={{ background: bg, borderColor: color + '30' }}>
            <div className="finance-icon" style={{ background: color + '20', color }}>
              <Icon size={20} />
            </div>
            <div>
              <p className="finance-label">{label}</p>
              <h3 className="finance-value" style={{ color }}>{value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>Recent Transactions</h3>
          <div className="table-actions" style={{ marginLeft: 'auto' }}>
            <button className="tbl-btn outline">Export</button>
            <button className="tbl-btn green">Bulk Approve</button>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Employee</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 32, color: 'var(--gray-400)' }}>No transactions found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
