import { useEffect, useState } from 'react'
import api from '../services/api'
import { User } from 'lucide-react'

interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  userType: string
}

export default function Settings() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await api.get('/users/me')
      setProfile(res.data)
      setFormData(res.data)
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.put('/users/me', {
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        phone: formData?.phone,
        address: formData?.address,
        city: formData?.city,
        state: formData?.state,
        zipCode: formData?.zipCode,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      fetchProfile()
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  if (loading || !formData) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Account Settings</h1>

      {saved && (
        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-4">
          Settings saved successfully!
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        <div className="card text-center">
          <div className="w-20 h-20 bg-bright-green rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold mb-2">{formData.firstName} {formData.lastName}</h2>
          <p className="text-gray-600">{formData.email}</p>
          <p className="text-sm text-gray-600 mt-2">{formData.userType}</p>
        </div>

        <div className="md:col-span-2 card">
          <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="input opacity-50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-600 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="input"
                placeholder="(123) 456-7890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                className="input"
                placeholder="123 Main St"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state || ''}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode || ''}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Save Changes
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 card border-l-4 border-yellow-400">
        <h3 className="text-lg font-bold mb-2">Account Type</h3>
        <p className="text-gray-600">{formData.userType}</p>
        <p className="text-sm text-gray-600 mt-2">To change your account type, please contact our support team.</p>
      </div>
    </div>
  )
}
