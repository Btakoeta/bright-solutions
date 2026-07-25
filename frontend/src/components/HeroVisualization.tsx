import { motion } from 'framer-motion'
import { TrendingUp, MapPin, Zap } from 'lucide-react'

export default function HeroVisualization() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const floatVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: [0, -15, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  }

  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <div className="relative h-96 lg:h-full rounded-3xl overflow-hidden bg-gradient-to-br from-bright-green/10 via-blue-500/5 to-bright-green/5 border border-bright-green/20">
      {/* Animated Background */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        {/* Sky Gradient */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f0f9ff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
          <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f0fdf4" />
            <stop offset="100%" stopColor="#dcfce7" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="800" height="350" fill="url(#skyGradient)" />

        {/* Ground */}
        <rect y="350" width="800" height="250" fill="url(#groundGradient)" />

        {/* Buildings - left */}
        <rect x="50" y="250" width="100" height="100" fill="#e5e7eb" opacity="0.6" />
        <rect x="70" y="270" width="12" height="12" fill="#1f2937" />
        <rect x="90" y="270" width="12" height="12" fill="#1f2937" />
        <rect x="70" y="290" width="12" height="12" fill="#1f2937" />
        <rect x="90" y="290" width="12" height="12" fill="#1f2937" />

        {/* Buildings - middle left */}
        <rect x="200" y="270" width="80" height="80" fill="#d1d5db" opacity="0.5" />
        <rect x="215" y="285" width="10" height="10" fill="#374151" />
        <rect x="235" y="285" width="10" height="10" fill="#374151" />
        <rect x="255" y="285" width="10" height="10" fill="#374151" />

        {/* Buildings - middle right */}
        <rect x="520" y="240" width="90" height="110" fill="#d1d5db" opacity="0.5" />
        <rect x="540" y="260" width="12" height="12" fill="#374151" />
        <rect x="565" y="260" width="12" height="12" fill="#374151" />
        <rect x="540" y="285" width="12" height="12" fill="#374151" />
        <rect x="565" y="285" width="12" height="12" fill="#374151" />

        {/* Buildings - right */}
        <rect x="670" y="260" width="110" height="90" fill="#e5e7eb" opacity="0.6" />
        <rect x="690" y="280" width="12" height="12" fill="#1f2937" />
        <rect x="715" y="280" width="12" height="12" fill="#1f2937" />
        <rect x="740" y="280" width="12" height="12" fill="#1f2937" />

        {/* Road */}
        <rect y="360" width="800" height="60" fill="#9ca3af" />
        <line x1="0" y1="390" x2="800" y2="390" stroke="#fff" strokeWidth="2" strokeDasharray="40,40" />
      </svg>

      {/* Animated Truck 1 */}
      <motion.div
        className="absolute bottom-32 left-0 w-24 h-12"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 400, opacity: 1 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: 0 }}
      >
        <div className="relative w-full h-full">
          {/* Truck body */}
          <div className="absolute w-16 h-10 bg-bright-green rounded-lg shadow-lg"></div>
          {/* Truck cabin */}
          <div className="absolute left-16 w-8 h-10 bg-bright-green/80 rounded-l-lg shadow-lg"></div>
          {/* Wheels */}
          <div className="absolute bottom-0 left-4 w-4 h-4 bg-gray-800 rounded-full"></div>
          <div className="absolute bottom-0 left-12 w-4 h-4 bg-gray-800 rounded-full"></div>
        </div>
      </motion.div>

      {/* Animated Truck 2 */}
      <motion.div
        className="absolute bottom-20 right-0 w-24 h-12"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: -400, opacity: 1 }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 1 }}
      >
        <div className="relative w-full h-full">
          <div className="absolute w-16 h-10 bg-bright-green/90 rounded-lg shadow-lg"></div>
          <div className="absolute right-16 w-8 h-10 bg-bright-green/70 rounded-r-lg shadow-lg"></div>
          <div className="absolute bottom-0 right-4 w-4 h-4 bg-gray-800 rounded-full"></div>
          <div className="absolute bottom-0 right-12 w-4 h-4 bg-gray-800 rounded-full"></div>
        </div>
      </motion.div>

      {/* Floating Dashboard Card */}
      <motion.div
        className="absolute -bottom-6 -right-4 bg-white/95 backdrop-blur border border-bright-green/20 rounded-2xl p-5 shadow-2xl z-10"
        variants={floatVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: '280px' }}
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Environmental Score</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-bright-green">98</span>
              <span className="text-gray-500">%</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-gray-200">
            <div>
              <p className="text-xs text-gray-500 mb-1">Waste Collected</p>
              <p className="text-lg font-bold text-gray-900">12.5K</p>
              <p className="text-xs text-gray-400">kg today</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Carbon Saved</p>
              <p className="text-lg font-bold text-bright-green">3.4T</p>
              <p className="text-xs text-gray-400">this week</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-2 pt-3 border-t border-gray-200">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-gray-700">42 vehicles online</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Top right stats card */}
      <motion.div
        className="absolute top-8 right-8 bg-white/90 backdrop-blur border border-bright-green/20 rounded-xl p-4 shadow-lg"
        variants={floatVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: '200px' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-bright-green/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-bright-green" />
          </div>
          <span className="text-sm font-semibold text-gray-900">Fleet Activity</span>
        </div>
        <p className="text-2xl font-bold text-bright-green">+18%</p>
        <p className="text-xs text-gray-500 mt-1">efficiency this month</p>
      </motion.div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}
