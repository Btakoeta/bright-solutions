import { useEffect, useState } from 'react'
import { Trash2, Plus, X } from 'lucide-react'
import api from '../services/api'

interface Subscription {
  id: string
  serviceType: string
  frequency: string
  containerSize: number
  status: string
  price: number
  collections: any[]
}

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    serviceType: 'TRASH',
    frequency: 'WEEKLY',
    containerSize: 64,
    price: 25,
  })

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const res = await api.get('/subscriptions')
      setSubscriptions(res.data)
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/subscriptions', formData)
      setFormData({
        serviceType: 'TRASH',
        frequency: 'WEEKLY',
        containerSize: 64,
        price: 25,
      })
      setShowForm(false)
      fetchSubscriptions()
    } catch (error) {
      console.error('Failed to create subscription:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      try {
        await api.delete(`/subscriptions/${id}`)
        fetchSubscriptions()
      } catch (error) {
        console.error('Failed to delete subscription:', error)
      }
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Waste Services</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      {showForm && (
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6">New Service Subscription</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Service Type</label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="input"
                >
                  <option value="TRASH">Trash</option>
                  <option value="RECYCLING">Recycling</option>
                  <option value="COMPOSTING">Composting</option>
                  <option value="BULKY_ITEMS">Bulky Items</option>
                  <option value="HAZARDOUS_WASTE">Hazardous Waste</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Frequency</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="input"
                >
                  <option value="WEEKLY">Weekly</option>
                  <option value="BIWEEKLY">Bi-Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Container Size (Gallons)</label>
                <input
                  type="number"
                  value={formData.containerSize}
                  onChange={(e) => setFormData({ ...formData, containerSize: parseInt(e.target.value) })}
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Monthly Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="input"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn btn-primary flex-1">
                Create Subscription
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {subscriptions.length === 0 ? (
          <div className="card text-center py-12">
            <Trash2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No active subscriptions yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
            >
              Create Your First Service
            </button>
          </div>
        ) : (
          subscriptions.map((sub) => (
            <div key={sub.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{sub.serviceType}</h3>
                  <p className="text-gray-600">{sub.frequency} | {sub.containerSize} gallon container</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-bright-green">${sub.price}/month</p>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full inline-block mt-2 ${
                    sub.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {sub.status}
                  </span>
                </div>
              </div>

              {sub.collections && sub.collections.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm font-medium text-gray-600">Last Collections</p>
                  <div className="mt-2 space-y-2">
                    {sub.collections.slice(0, 3).map((col: any, idx: number) => (
                      <div key={idx} className="text-sm text-gray-600">
                        {new Date(col.collectedAt).toLocaleDateString()}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => handleDelete(sub.id)}
                className="mt-4 btn btn-secondary w-full flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel Subscription
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
