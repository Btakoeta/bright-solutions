import { motion } from 'framer-motion'
import { TrendingUp, Zap, MapPin, CheckCircle, Truck, Leaf } from 'lucide-react'

export default function DashboardPreviewSignup() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Mission Statement */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900 leading-tight">
          Environmental infrastructure, managed intelligently.
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Coordinate services, monitor operations, and measure environmental impact from one secure platform.
        </p>
      </motion.div>

      {/* Benefits */}
      <motion.div variants={itemVariants} className="space-y-4">
        {[
          {
            icon: TrendingUp,
            title: 'Real-time visibility',
            desc: 'See services, fleets, and operational activity as they happen.',
          },
          {
            icon: Leaf,
            title: 'Built for every scale',
            desc: 'From one household to an entire municipality.',
          },
          {
            icon: Zap,
            title: 'Actionable intelligence',
            desc: 'Turn environmental and operational data into better decisions.',
          },
        ].map((benefit, idx) => {
          const Icon = benefit.icon
          return (
            <div key={idx} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bright-green/10">
                  <Icon className="h-5 w-5 text-bright-green" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{benefit.desc}</p>
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Dashboard Preview Card */}
      <motion.div
        variants={itemVariants}
        className="mt-12 p-6 bg-white/40 backdrop-blur-sm border border-white/20 rounded-2xl space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Live Dashboard</h3>
          <div className="w-2 h-2 bg-bright-green rounded-full animate-pulse" />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-bright-green/10 rounded-lg">
            <p className="text-xs text-gray-600">Active Collections</p>
            <p className="text-lg font-bold text-gray-900 mt-1">24</p>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <p className="text-xs text-gray-600">Fleet Status</p>
            <p className="text-lg font-bold text-gray-900 mt-1">18/20</p>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-lg">
            <p className="text-xs text-gray-600">Waste Collected</p>
            <p className="text-lg font-bold text-gray-900 mt-1">12.5K kg</p>
          </div>
          <div className="p-3 bg-green-500/10 rounded-lg">
            <p className="text-xs text-gray-600">Carbon Saved</p>
            <p className="text-lg font-bold text-gray-900 mt-1">3.4T</p>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <Truck className="w-3 h-3 text-bright-green" />
            <span className="text-gray-600">Fleet activity</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle className="w-3 h-3 text-bright-green" />
            <span className="text-gray-600">Service requests</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <MapPin className="w-3 h-3 text-bright-green" />
            <span className="text-gray-600">Live map activity</span>
          </div>
        </div>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        variants={itemVariants}
        className="pt-8 border-t border-gray-200 space-y-3 text-xs text-gray-600"
      >
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-bright-green flex-shrink-0" />
          <span>Secure authentication</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-bright-green flex-shrink-0" />
          <span>Your information is encrypted</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-bright-green flex-shrink-0" />
          <span>No credit card required</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-bright-green flex-shrink-0" />
          <span>Setup takes approximately two minutes</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
