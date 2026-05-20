import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { TrendingUp, Award, Target, Users } from 'lucide-react'
import './PageCommon.css'
import './Performance.css'

const teamData = []
const fseRankings = []

export default function Performance() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Performance</h2>
          <p className="page-sub">Team and FSE performance metrics</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="perf-summary">
        {[
          { label: 'Total BT This Month', value: '—', icon: TrendingUp, color: '#16a34a' },
          { label: 'Avg Achievement',     value: '—', icon: Target,     color: '#3b82f6' },
          { label: 'Top Performer',       value: '—', icon: Award,      color: '#f59e0b' },
          { label: 'Active FSEs',         value: '—', icon: Users,      color: '#8b5cf6' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div className="perf-card" key={label}>
            <div className="perf-icon" style={{ background: color + '20', color }}>
              <Icon size={22} />
            </div>
            <div>
              <p className="perf-label">{label}</p>
              <h3 className="perf-value" style={{ color }}>{value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Team Chart */}
      <div className="chart-card">
        <div className="chart-header">
          <div>
            <h3>Team BT vs Target</h3>
            <p>Monthly comparison per team</p>
          </div>
        </div>
        {teamData.length === 0
          ? <div className="empty-state">No data available</div>
          : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={teamData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
                <Bar dataKey="target" fill="#bbf7d0" radius={[4,4,0,0]} name="Target" />
                <Bar dataKey="bt"     fill="#16a34a" radius={[4,4,0,0]} name="BT Achieved" />
              </BarChart>
            </ResponsiveContainer>
          )
        }
      </div>

      {/* FSE Rankings */}
      <div className="table-card">
        <div className="table-header">
          <h3>FSE Rankings</h3>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>FSE Name</th>
              <th>BT Amount</th>
              <th>Achievement %</th>
              <th>RP Points</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {fseRankings.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 32, color: 'var(--gray-400)' }}>No data available</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
