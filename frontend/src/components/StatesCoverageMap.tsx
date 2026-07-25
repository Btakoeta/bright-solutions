import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, CheckCircle } from 'lucide-react'
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const operatingStates = [
  { name: 'Maryland', abbr: 'MD', lat: 39.0, lng: -76.8, color: '#10b981' },
  { name: 'Virginia', abbr: 'VA', lat: 37.5, lng: -77.4, color: '#10b981' },
  { name: 'North Carolina', abbr: 'NC', lat: 35.5, lng: -79.8, color: '#10b981' },
  { name: 'South Carolina', abbr: 'SC', lat: 34.0, lng: -81.2, color: '#10b981' },
  { name: 'Texas', abbr: 'TX', lat: 31.9, lng: -99.9, color: '#10b981' },
  { name: 'Cameroon', abbr: 'CM', lat: 3.8, lng: 11.5, color: '#10b981' },
]

export default function StatesCoverageMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null)

  const mapCenter: [number, number] = [20, -25]
  const mapZoom = 2

  return (
    <section className="py-24 lg:py-32 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900">Operating Globally</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Serving communities across the United States and Africa, expanding sustainable solutions worldwide</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-2 lg:p-4 border border-gray-200 shadow-lg overflow-hidden"
          >
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: '500px', width: '100%', borderRadius: '1.5rem', zIndex: 1 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* State markers */}
              {operatingStates.map((state) => (
                <CircleMarker
                  key={state.abbr}
                  center={[state.lat, state.lng]}
                  radius={12}
                  fillColor={state.color}
                  color="#059669"
                  weight={2}
                  opacity={hoveredState === state.abbr || hoveredState === null ? 1 : 0.4}
                  fillOpacity={hoveredState === state.abbr ? 0.9 : 0.7}
                  eventHandlers={{
                    mouseover: () => setHoveredState(state.abbr),
                    mouseout: () => setHoveredState(null),
                  }}
                >
                  <Popup>
                    <div className="text-center p-2">
                      <p className="font-bold text-gray-900">{state.name}</p>
                      <p className="text-sm text-gray-600">Active Operations</p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>

            <p className="text-sm text-gray-500 text-center mt-6">
              <MapPin className="w-4 h-4 inline mr-2" />
              Interactive map • Click markers for details
            </p>
          </motion.div>

          {/* State List */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Global Impact, Local Solutions</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                We're actively serving communities across 5 US states and Africa, helping them build sustainable infrastructure and transform their environmental future. Our mission spans continents, but our focus remains on local impact.
              </p>
            </div>

            <div className="space-y-3">
              {operatingStates.map((state, idx) => (
                <motion.div
                  key={state.abbr}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onMouseEnter={() => setHoveredState(state.abbr)}
                  onMouseLeave={() => setHoveredState(null)}
                  className="flex items-center gap-4 p-4 rounded-lg bg-white border border-gray-200 hover:border-bright-green/50 transition cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-bright-green/10 rounded-lg flex items-center justify-center group-hover:bg-bright-green/20 transition">
                    <span className="font-bold text-bright-green text-lg">{state.abbr}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{state.name}</h4>
                    <p className="text-sm text-gray-500">Active operations • Growing partnerships</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-bright-green flex-shrink-0" />
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-semibold text-gray-900">Expanding soon</span> to additional states. Contact us to learn about opportunities in your region.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
