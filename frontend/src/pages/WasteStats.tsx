import { useEffect, useState } from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import api from '../services/api'
import { Trash2, Plus } from 'lucide-react'

interface WasteSummary {
  totalWeight: number
  totalVolume: number
  recordCount: number
  byType: Record<string, any>
}

interface WasteRecord {
  id: string
  wasteType: string
  weight: number
  volume?: number
  date: string
}

export default function WasteStats() {
  const [summary, setSummary] = useState<WasteSummary | null>(null)
  const [records, setRecords] = useState<WasteRecord[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    wasteType: 'TRASH',
    weight: '',
    volume: '',
    notes: '',
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [summaryRes, recordsRes] = await Promise.all([
        api.get('/waste/summary'),
        api.get('/waste'),
      ])
      setSummary(summaryRes.data)
      setRecords(recordsRes.data)
    } catch (error) {
      console.error('Failed to fetch waste data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/waste', {
        ...formData,
        weight: parseFloat(formData.weight),
        volume: formData.volume ? parseFloat(formData.volume) : null,
      })
      setFormData({
        wasteType: 'TRASH',
        weight: '',
        volume: '',
        notes: '',
      })
      setShowForm(false)
      fetchData()
    } catch (error) {
      console.error('Failed to create waste record:', error)
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  const chartData = summary ? Object.entries(summary.byType).map(([type, data]: [string, any]) => ({
    name: type,
    weight: data.weight,
    count: data.count,
  })) : []

  const colors = ['#10B981', '#059669', '#047857', '#065F46', '#064E3B']

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Waste Analytics</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Log Waste
        </button>
      </div>

      {showForm && (
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6">Log Waste Disposal</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Waste Type</label>
                <select
                  value={formData.wasteType}
                  onChange={(e) => setFormData({ ...formData, wasteType: e.target.value })}
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
                <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Volume (cubic meters) - Optional</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.volume}
                  onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Notes</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input"
                  placeholder="Optional notes"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn btn-primary flex-1">
                Log Waste
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

      {summary && (
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="card">
            <p className="text-gray-600 text-sm">Total Weight Disposed</p>
            <p className="text-3xl font-bold text-bright-green">{(summary.totalWeight / 1000).toFixed(1)}T</p>
            <p className="text-xs text-gray-600 mt-2">{summary.recordCount} collections</p>
          </div>

          <div className="card">
            <p className="text-gray-600 text-sm">Total Volume</p>
            <p className="text-3xl font-bold text-bright-green">{summary.totalVolume.toFixed(1)}m³</p>
          </div>

          <div className="card">
            <p className="text-gray-600 text-sm">Waste Types</p>
            <p className="text-3xl font-bold text-bright-green">{Object.keys(summary.byType).length}</p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {chartData.length > 0 && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Waste by Type (Weight)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="weight" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {chartData.length > 0 && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Waste Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Recent Waste Records</h2>
        {records.length === 0 ? (
          <div className="text-center py-8">
            <Trash2 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No waste records yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-bold">Date</th>
                  <th className="text-left py-3 px-4 font-bold">Type</th>
                  <th className="text-left py-3 px-4 font-bold">Weight (kg)</th>
                  <th className="text-left py-3 px-4 font-bold">Volume (m³)</th>
                  <th className="text-left py-3 px-4 font-bold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4 font-medium">{record.wasteType}</td>
                    <td className="py-3 px-4">{record.weight}</td>
                    <td className="py-3 px-4">{record.volume?.toFixed(2) || '-'}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
