import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const stages = [
  { emoji: '🏘️', label: 'One Neighborhood', desc: 'Starting local' },
  { emoji: '🏙️', label: 'One City', desc: 'Urban scale' },
  { emoji: '🗺️', label: 'One Municipality', desc: 'Regional impact' },
  { emoji: '🏛️', label: 'One State', desc: 'Statewide reach' },
  { emoji: '🇦🇺', label: 'One Nation', desc: 'National coverage' },
  { emoji: '🌍', label: 'A Cleaner World', desc: 'Global change' },
]

export default function GlobalImpactSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Building Infrastructure That Scales
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From one neighborhood to an entire nation—Bright Solutions grows with you.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Connecting Line */}
          <div className="absolute hidden lg:block h-1 bg-gradient-to-r from-bright-green/0 via-bright-green to-bright-green/0 top-20 left-12 right-12" />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {stages.map((stage, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                {/* Card */}
                <div className="bg-white border-2 border-bright-green/20 hover:border-bright-green rounded-xl p-8 text-center transition-all duration-300 hover:shadow-lg h-full flex flex-col items-center justify-center">
                  {/* Stage Number */}
                  <div className="w-12 h-12 bg-bright-green/10 rounded-full flex items-center justify-center mb-4 mx-auto relative z-10 border-2 border-bright-green">
                    <span className="text-sm font-bold text-bright-green">{index + 1}</span>
                  </div>

                  {/* Emoji */}
                  <div className="text-4xl mb-3">{stage.emoji}</div>

                  {/* Label */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{stage.label}</h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600">{stage.desc}</p>
                </div>

                {/* Arrow between cards (hidden on last card) */}
                {index < stages.length - 1 && (
                  <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-bright-green" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-gray-600 mb-6">
            That's the power of thinking globally from day one.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
