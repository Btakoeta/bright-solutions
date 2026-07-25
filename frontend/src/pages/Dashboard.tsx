import { useEffect, useState } from 'react'
import { Package, Trash2, TrendingUp, AlertCircle } from 'lucide-react'
import api from '../services/api'
import { Link } from 'react-router-dom'

interface User {
  id: string
  firstName: string
  lastName: string
  userType: string
}

interface Subscription {
  id: string
  serviceType: string
  status: string
  frequency: string
  collections: any[]
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [stats, setStats] = useState({ totalWeight: 0, recordCount: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, subsRes, statsRes] = await Promise.all([
          api.get('/users/me'),
          api.get('/subscriptions'),
          api.get('/waste/summary'),
        ])
        setUser(userRes.data)
        setSubscriptions(subsRes.data)
        setStats(statsRes.data)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome, {user?.firstName}!</h1>
        <p className="text-gray-600">Manage your waste collection and track your environmental impact.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Weight Disposed</p>
              <p className="text-3xl font-bold">{(stats.totalWeight / 1000).toFixed(1)}T</p>
            </div>
            <Trash2 className="w-12 h-12 text-bright-green opacity-20" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Collections</p>
              <p className="text-3xl font-bold">{stats.recordCount}</p>
            </div>
            <Package className="w-12 h-12 text-bright-green opacity-20" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Subscriptions</p>
              <p className="text-3xl font-bold">{subscriptions.filter(s => s.status === 'ACTIVE').length}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-bright-green opacity-20" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Account Type</p>
              <p className="text-2xl font-bold">{user?.userType}</p>
            </div>
            <AlertCircle className="w-12 h-12 text-bright-green opacity-20" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Recent Subscriptions</h2>
          {subscriptions.length === 0 ? (
            <p className="text-gray-600">No subscriptions yet.</p>
          ) : (
            <div className="space-y-4">
              {subscriptions.slice(0, 3).map((sub) => (
                <div key={sub.id} className="border-l-4 border-bright-green pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold">{sub.serviceType}</p>
                      <p className="text-sm text-gray-600">{sub.frequency}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      sub.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link to="/subscriptions" className="btn btn-primary w-full mt-4">
            Manage Subscriptions
          </Link>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/subscriptions" className="btn btn-secondary w-full text-left">
              + Add Service
            </Link>
            <Link to="/tracking" className="btn btn-secondary w-full text-left">
              Track Truck
            </Link>
            <Link to="/waste-stats" className="btn btn-secondary w-full text-left">
              View Analytics
            </Link>
            <Link to="/settings" className="btn btn-secondary w-full text-left">
              Account Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
