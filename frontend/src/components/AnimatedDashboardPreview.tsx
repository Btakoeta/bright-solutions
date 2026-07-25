import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Zap, MapPin, CheckCircle, Truck, Leaf, BarChart3 } from 'lucide-react'

interface AnimatedDashboardPreviewProps {
  accountType: string | null
}

const dashboardVariants = {
  household: {
    activeCollections: 24,
    fleetStatus: '3/3',
    wasteCollected: '245 kg',
    carbonSaved: '0.8T',
    icon1: CheckCircle,
    icon2: Leaf,
    label1: 'Collections This Month',
    label2: 'Carbon Offset',
    metrics: [
      { value: '24', label: 'Collections' },
      { value: '3/3', label: 'Trucks Ready' },
      { value: '245kg', label: 'Collected' },
      { value: '0.8T', label: 'Saved' },
    ],
  },
  business: {
    activeCollections: 47,
    fleetStatus: '12/15',
    wasteCollected: '2.3K kg',
    carbonSaved: '2.1T',
    icon1: BarChart3,
    icon2: Truck,
    label1: 'Active Locations',
    label2: 'Fleet Efficiency',
    metrics: [
      { value: '47', label: 'Collections' },
      { value: '12/15', label: 'Fleet Active' },
      { value: '2.3K', label: 'kg/week' },
      { value: '2.1T', label: 'Saved' },
    ],
  },
  community: {
    activeCollections: 156,
    fleetStatus: '34/42',
    wasteCollected: '12.4K kg',
    carbonSaved: '8.7T',
    icon1: MapPin,
    icon2: BarChart3,
    label1: 'Community Routes',
    label2: 'Coverage',
    metrics: [
      { value: '156', label: 'Collections' },
      { value: '34/42', label: 'Trucks' },
      { value: '12.4K', label: 'kg/week' },
      { value: '8.7T', label: 'Saved' },
    ],
  },
  government: {
    activeCollections: 487,
    fleetStatus: '127/142',
    wasteCollected: '47.2K kg',
    carbonSaved: '31.4T',
    icon1: BarChart3,
    icon2: Leaf,
    label1: 'Jurisdiction',
    label2: 'Environmental Impact',
    metrics: [
      { value: '487', label: 'Collections' },
      { value: '127/142', label: 'Fleet' },
      { value: '47.2K', label: 'kg/week' },
      { value: '31.4T', label: 'Saved' },
    ],
  },
}

export default function AnimatedDashboardPreview({ accountType }: AnimatedDashboardPreviewProps) {
  const [animationKey, setAnimationKey] = useState(0)
  const variant = dashboardVariants[accountType as keyof typeof dashboardVariants] || dashboardVariants.household

  // Trigger re-animation when account type changes
  useEffect(() => {
    setAnimationKey((prev) => prev + 1)
  }, [accountType])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const pulseVariants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.05, 1],
    },
  }

  const counterVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      key={animationKey}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Updated Copy for Account Type */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900 leading-tight">
          Building the Operating System for Cleaner Communities
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          From one neighborhood to an entire nation, Bright Solutions helps organizations coordinate environmental infrastructure through intelligent software.
        </p>
      </motion.div>

      {/* Dynamic Benefits */}
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
            <motion.div
              key={idx}
              className="flex gap-4"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bright-green/10">
                  <Icon className="h-5 w-5 text-bright-green" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{benefit.desc}</p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Animated Dashboard Card with Glassmorphism */}
      <motion.div
        variants={itemVariants}
        className="mt-12 p-6 bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl space-y-5 shadow-2xl"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Live Indicator */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Live Dashboard</h3>
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-bright-green rounded-full" />
            <span className="text-xs text-gray-600">Live</span>
          </motion.div>
        </div>

        {/* Metric Cards - Animated Counter */}
        <div className="grid grid-cols-2 gap-3">
          {variant.metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              className="p-4 bg-gradient-to-br from-bright-green/10 to-bright-green/5 rounded-lg border border-bright-green/20 hover:border-bright-green/40 transition cursor-pointer group"
              whileHover={{
                y: -4,
                boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.1)',
              }}
            >
              <p className="text-xs text-gray-600 group-hover:text-gray-900 transition">
                {metric.label}
              </p>
              <motion.p
                className="text-2xl font-bold text-gray-900 mt-1"
                variants={counterVariants}
                initial="initial"
                animate="animate"
                key={`${accountType}-${idx}`}
              >
                {metric.value}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Status Indicators */}
        <motion.div
          className="pt-4 border-t border-white/20 space-y-3"
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center gap-3 text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="w-2 h-2 bg-bright-green rounded-full"
              variants={pulseVariants}
              initial="initial"
              animate="animate"
            />
            <span className="text-gray-700">Fleet activity</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="w-2 h-2 bg-bright-green rounded-full"
              variants={pulseVariants}
              initial="initial"
              animate="animate"
            />
            <span className="text-gray-700">Service requests</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div
              className="w-2 h-2 bg-bright-green rounded-full"
              variants={pulseVariants}
              initial="initial"
              animate="animate"
            />
            <span className="text-gray-700">Live map activity</span>
          </motion.div>
        </motion.div>

        {/* Notification Toast */}
        <motion.div
          className="mt-4 p-3 bg-bright-green/20 border border-bright-green/30 rounded-lg flex items-center gap-2"
          initial={{ opacity: 0, y: 10, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, type: 'spring', stiffness: 300 }}
          >
            <CheckCircle className="w-4 h-4 text-bright-green" />
          </motion.div>
          <span className="text-sm text-gray-800 font-medium">Collection completed</span>
        </motion.div>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        variants={itemVariants}
        className="pt-8 border-t border-gray-200 space-y-3 text-xs text-gray-600"
      >
        {[
          'Secure authentication',
          'Your information is encrypted',
          'No credit card required',
          'Setup takes approximately two minutes',
        ].map((indicator, idx) => (
          <motion.div
            key={idx}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + idx * 0.1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1 + idx * 0.1, type: 'spring' }}
            >
              <CheckCircle className="w-4 h-4 text-bright-green flex-shrink-0" />
            </motion.div>
            <span>{indicator}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
