import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AdminLayout from './components/AdminLayout'
import Login from './pages/Login'
import Unauthorized from './pages/Unauthorized'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Merchants from './pages/Merchants'
import Performance from './pages/Performance'
import Transfers from './pages/Transfers'
import Finance from './pages/Finance'
import DataManagement from './pages/DataManagement'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login"        element={<Login />}        />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard"       element={<Dashboard />}      />
            <Route path="employees"       element={<Employees />}      />
            <Route path="merchants"       element={<Merchants />}      />
            <Route path="performance"     element={<Performance />}    />
            <Route path="transfers"       element={<Transfers />}      />
            <Route path="finance"         element={<Finance />}        />
            <Route path="data-management" element={<DataManagement />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
