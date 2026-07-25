import { motion } from 'framer-motion'
import { TrendingUp, MapPin, AlertCircle } from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'

export default function DashboardMockup() {
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold mb-4 text-gray-900">
            See Your Infrastructure in Real Time
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage, monitor, and optimize your entire operation.
          </p>
        </motion.div>

        {/* Dashboard Card */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-bright-green to-green-600 px-8 py-6 text-white">
            <h3 className="text-2xl font-bold">Fleet Overview</h3>
            <p className="text-green-100 mt-1">Real-time dashboard of your operations</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {/* KPI 1 */}
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-600">Trucks Online</span>
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <AnimatedCounter end={42} color="text-blue-600" />
                <p className="text-xs text-gray-500 mt-2">3 offline</p>
              </motion.div>

              {/* KPI 2 */}
              <motion.div
                className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-600">Today's Pickups</span>
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <AnimatedCounter end={2431} color="text-green-600" suffix={''} />
                <p className="text-xs text-gray-500 mt-2">+12% vs yesterday</p>
              </motion.div>

              {/* KPI 3 */}
              <motion.div
                className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-600">Carbon Reduction</span>
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🌱</span>
                  </div>
                </div>
                <motion.p
                  className="text-3xl font-bold text-emerald-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  +18%
                </motion.p>
                <p className="text-xs text-gray-500 mt-2">vs last month</p>
              </motion.div>

              {/* KPI 4 */}
              <motion.div
                className="bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-600">Pending Reports</span>
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <AnimatedCounter end={34} color="text-orange-600" />
                <p className="text-xs text-gray-500 mt-2">Needs attention</p>
              </motion.div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Line Chart Mockup */}
              <motion.div
                className="bg-gray-50 border border-gray-200 rounded-xl p-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="font-bold text-gray-900 mb-4">Weekly Collections</h4>
                <div className="flex items-end gap-2 h-32">
                  {[40, 50, 70, 60, 85, 75, 90].map((height, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-bright-green to-bright-green/60 rounded-t"
                      style={{ height: `${(height / 100) * 100}%` }}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${(height / 100) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.05, duration: 0.5 }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Map Mockup */}
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 relative overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="font-bold text-gray-900 mb-4 relative z-10">Fleet Locations</h4>

                {/* Animated dots representing trucks */}
                <div className="relative h-32 bg-white/50 rounded-lg overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                    {/* Simple map grid */}
                    <line x1="0" y1="50" x2="400" y2="50" stroke="#ddd" strokeWidth="1" opacity="0.5" />
                    <line x1="0" y1="100" x2="400" y2="100" stroke="#ddd" strokeWidth="1" opacity="0.5" />
                    <line x1="0" y1="150" x2="400" y2="150" stroke="#ddd" strokeWidth="1" opacity="0.5" />
                    <line x1="100" y1="0" x2="100" y2="200" stroke="#ddd" strokeWidth="1" opacity="0.5" />
                    <line x1="200" y1="0" x2="200" y2="200" stroke="#ddd" strokeWidth="1" opacity="0.5" />
                    <line x1="300" y1="0" x2="300" y2="200" stroke="#ddd" strokeWidth="1" opacity="0.5" />
                  </svg>

                  {/* Animated truck locations */}
                  <motion.div
                    className="absolute w-3 h-3 bg-bright-green rounded-full shadow-lg"
                    style={{ left: '25%', top: '30%' }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute w-3 h-3 bg-bright-green rounded-full shadow-lg"
                    style={{ left: '70%', top: '60%' }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute w-3 h-3 bg-bright-green rounded-full shadow-lg"
                    style={{ left: '50%', top: '80%' }}
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CTA Below Dashboard */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-lg text-gray-600 mb-4">
            This is what managing infrastructure looks like.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
