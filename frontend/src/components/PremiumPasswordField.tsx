import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'

interface PremiumPasswordFieldProps {
  value: string
  onChange: (value: string) => void
  onShowToggle: (show: boolean) => void
  showPassword: boolean
}

export default function PremiumPasswordField({
  value,
  onChange,
  onShowToggle,
  showPassword,
}: PremiumPasswordFieldProps) {
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { level: 0, label: '', color: 'bg-gray-300', score: 0 }

    let score = 0
    if (pwd.length >= 8) score += 20
    if (pwd.length >= 12) score += 20
    if (pwd.length >= 16) score += 10
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score += 15
    if (/\d/.test(pwd)) score += 15
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 20

    let level = 0
    let label = ''
    let color = ''

    if (score < 40) {
      level = 1
      label = 'Weak'
      color = 'bg-red-500'
    } else if (score < 60) {
      level = 2
      label = 'Good'
      color = 'bg-yellow-500'
    } else if (score < 80) {
      level = 3
      label = 'Strong'
      color = 'bg-bright-green'
    } else {
      level = 4
      label = 'Excellent'
      color = 'bg-bright-green'
    }

    return { level, label, color, score }
  }

  const estimateCrackTime = (pwd: string) => {
    if (!pwd) return ''

    let possibilities = 0
    if (/[a-z]/.test(pwd)) possibilities += 26
    if (/[A-Z]/.test(pwd)) possibilities += 26
    if (/\d/.test(pwd)) possibilities += 10
    if (/[^a-zA-Z0-9]/.test(pwd)) possibilities += 32

    const totalCombinations = Math.pow(possibilities, pwd.length)
    const guessesPerSecond = 1e10 // 10 billion guesses per second

    const seconds = totalCombinations / (2 * guessesPerSecond)
    const years = seconds / (365.25 * 24 * 60 * 60)

    if (years < 1) return 'Less than a year'
    if (years < 100) return Math.round(years) + ' years'
    if (years < 1000) return Math.round(years / 100) * 100 + ' years'
    return '1000+ years'
  }

  const { level, label, color, score } = getPasswordStrength(value)
  const crackTime = estimateCrackTime(value)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-900">Create password</label>
        {value && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-sm font-bold ${
              level === 4
                ? 'text-bright-green'
                : level === 3
                  ? 'text-bright-green'
                  : level === 2
                    ? 'text-yellow-600'
                    : 'text-red-600'
            }`}
          >
            {label}
          </motion.div>
        )}
      </div>

      {/* Password Input */}
      <div className="relative group">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="At least 8 characters"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bright-green focus:border-transparent transition pr-12 bg-white/50 hover:bg-white"
        />
        <motion.button
          type="button"
          onClick={() => onShowToggle(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </motion.button>

        {/* Animated Border on Focus */}
        {value && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none border-2 border-transparent"
            animate={{
              borderColor: level >= 3 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
              boxShadow:
                level >= 3
                  ? '0 0 0 3px rgba(16, 185, 129, 0.1)'
                  : '0 0 0 3px rgba(239, 68, 68, 0.1)',
            }}
          />
        )}
      </div>

      {/* Password Strength Visualization */}
      {value && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-3"
        >
          {/* Strength Bar */}
          <div className="space-y-2">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((bar) => (
                <motion.div
                  key={bar}
                  className={`h-1.5 flex-1 rounded-full transition ${
                    bar <= level ? color : 'bg-gray-200'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: bar * 0.1 }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Strength: {Math.min(score, 100)}%</span>
            </div>
          </div>

          {/* Crack Time Estimation */}
          {crackTime && (
            <motion.div
              className="p-3 bg-bright-green/5 border border-bright-green/20 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-2">
                {level >= 3 ? (
                  <CheckCircle className="w-4 h-4 text-bright-green flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-900">
                    Estimated crack time
                  </p>
                  <p className="text-xs text-gray-700">{crackTime}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Password Requirements */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {[
              { check: value.length >= 8, label: 'At least 8 characters' },
              { check: /[a-z]/.test(value) && /[A-Z]/.test(value), label: 'Mix of upper and lowercase' },
              { check: /\d/.test(value), label: 'Contains a number' },
              { check: /[^a-zA-Z0-9]/.test(value), label: 'Contains a symbol' },
            ].map((req, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2 text-xs"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.05 }}
              >
                <motion.div
                  animate={{ scale: req.check ? 1 : 0.8 }}
                  className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                    req.check ? 'bg-bright-green' : 'bg-gray-200'
                  }`}
                >
                  {req.check && <span className="text-white text-xs font-bold">✓</span>}
                </motion.div>
                <span className={req.check ? 'text-gray-700 font-medium' : 'text-gray-500'}>
                  {req.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
