import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import Navigation from './Navigation'

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen">
      <Navigation />
      <main className="flex-1 overflow-auto bg-bright-light">
        <Outlet />
      </main>
    </div>
  )
}
