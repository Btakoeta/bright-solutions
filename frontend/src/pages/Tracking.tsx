import { useEffect, useState } from 'react'
import { MapPin, Truck, AlertCircle } from 'lucide-react'
import api from '../services/api'

interface Truck {
  id: string
  licensePlate: string
  status: string
  capacity: number
  truckType: string
  locations: TruckLocation[]
}

interface TruckLocation {
  id: string
  latitude: number
  longitude: number
  timestamp: string
  speed?: number
  heading?: number
}

export default function Tracking() {
  const [trucks, setTrucks] = useState<Truck[]>([])
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const res = await api.get('/trucks')
        setTrucks(res.data)
        if (res.data.length > 0) {
          setSelectedTruck(res.data[0])
        }
      } catch (error) {
        console.error('Failed to fetch trucks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrucks()
    const interval = setInterval(fetchTrucks, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (trucks.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Truck Tracking</h1>
        <div className="card text-center py-12">
          <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No trucks available for tracking yet.</p>
          <p className="text-sm text-gray-500">Once your service is scheduled, you'll be able to track your collection truck here.</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'IDLE':
        return 'bg-gray-100 text-gray-800'
      case 'IN_MAINTENANCE':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Truck Tracking</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="card h-96 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Map view coming soon</p>
              {selectedTruck && selectedTruck.locations && selectedTruck.locations.length > 0 && (
                <div className="mt-4 text-sm text-gray-600">
                  <p>Last known location:</p>
                  <p className="font-mono">{selectedTruck.locations[0].latitude.toFixed(4)}, {selectedTruck.locations[0].longitude.toFixed(4)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold mb-4">Active Trucks</h2>
            {trucks.map((truck) => (
              <button
                key={truck.id}
                onClick={() => setSelectedTruck(truck)}
                className={`w-full card text-left mb-3 cursor-pointer border-2 transition-colors ${
                  selectedTruck?.id === truck.id
                    ? 'border-bright-green'
                    : 'border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-bright-green" />
                    <div>
                      <p className="font-bold">{truck.licensePlate}</p>
                      <p className="text-sm text-gray-600">{truck.truckType}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${getStatusColor(truck.status)}`}>
                    {truck.status}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {selectedTruck && (
            <div className="card border-t-4 border-bright-green">
              <h3 className="font-bold mb-4">{selectedTruck.licensePlate}</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Truck Type</p>
                  <p className="font-medium">{selectedTruck.truckType}</p>
                </div>
                <div>
                  <p className="text-gray-600">Capacity</p>
                  <p className="font-medium">{selectedTruck.capacity} gallons</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <span className={`inline-block text-xs font-bold px-2 py-1 rounded ${getStatusColor(selectedTruck.status)}`}>
                    {selectedTruck.status}
                  </span>
                </div>

                {selectedTruck.locations && selectedTruck.locations.length > 0 && (
                  <div className="pt-3 border-t">
                    <p className="text-gray-600">Last Location Update</p>
                    <p className="font-mono text-xs mt-2">
                      {selectedTruck.locations[0].latitude.toFixed(4)}, {selectedTruck.locations[0].longitude.toFixed(4)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(selectedTruck.locations[0].timestamp).toLocaleString()}
                    </p>
                    {selectedTruck.locations[0].speed && (
                      <p className="text-xs text-gray-600 mt-1">Speed: {selectedTruck.locations[0].speed} mph</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 card bg-blue-50 border-l-4 border-blue-400">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div>
            <p className="font-bold text-blue-900">Real-time Tracking</p>
            <p className="text-sm text-blue-800">Truck locations update in real-time. Your collection truck's location will appear here once service is scheduled.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
