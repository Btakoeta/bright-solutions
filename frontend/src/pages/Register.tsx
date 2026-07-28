import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowRight, Shield, Lock, Zap } from 'lucide-react'
import PremiumAccountTypeSelector from '../components/PremiumAccountTypeSelector'
import PremiumPasswordField from '../components/PremiumPasswordField'
import CyclingDashboardPreview from '../components/CyclingDashboardPreview'

const commonEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com']

export default function Register() {
  const [email, setEmail] = useState('')
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [accountType, setAccountType] = useState<string | null>(null)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitState, setSubmitState] = useState<'idle' | 'creating' | 'success'>('idle')
  const [showNotification, setShowNotification] = useState(false)
  const { register } = useAuthStore()
  const navigate = useNavigate()

  // Animated notification every 12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  const isFormValid = email && password && accountType && agreeTerms && password.length >= 8

  // Email validation with suggestions
  const handleEmailChange = (value: string) => {
    setEmail(value)

    const emailParts = value.split('@')
    if (emailParts.length === 2 && emailParts[1].length > 0) {
      const domain = emailParts[1]
      const localPart = emailParts[0]

      // Simple typo detection
      for (const commonDomain of commonEmailDomains) {
        const similarity = calculateSimilarity(domain, commonDomain)
        if (similarity > 0.7 && similarity < 1) {
          setEmailSuggestion(`${localPart}@${commonDomain}`)
          return
        }
      }
    }
    setEmailSuggestion(null)
  }

  const calculateSimilarity = (str1: string, str2: string) => {
    const longer = str1.length > str2.length ? str1 : str2
    const shorter = str1.length > str2.length ? str2 : str1

    if (longer.length === 0) return 1.0

    const editDistance = getEditDistance(longer, shorter)
    return (longer.length - editDistance) / longer.length
  }

  const getEditDistance = (s1: string, s2: string) => {
    const costs = []
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) costs[j] = j
        else if (j > 0) {
          let newValue = costs[j - 1]
          if (s1.charAt(i - 1) !== s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
          costs[j - 1] = lastValue
          lastValue = newValue
        }
      }
      if (i > 0) costs[s2.length] = lastValue
    }
    return costs[s2.length]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitState('creating')

    try {
      const userTypeMap: Record<string, string> = {
        individual: 'INDIVIDUAL',
        business: 'ORGANIZATION',
        community: 'COMMUNITY',
        government: 'MUNICIPALITY',
      }

      if (!accountType) {
        setError('Please select an account type')
        setSubmitState('idle')
        return
      }

      await register({
        email: emailSuggestion || email,
        password,
        userType: userTypeMap[accountType] || accountType.toUpperCase(),
        firstName: email.split('@')[0],
        lastName: '',
      })

      setSubmitState('success')

      setTimeout(() => {
        navigate('/onboarding')
      }, 1500)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.')
      setSubmitState('idle')
    }
  }

  return (
    <div
      className="min-h-screen bg-[#FAFBFC]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 15% 20%, rgba(16, 185, 129, 0.10), transparent 30%),
          radial-gradient(circle at 80% 75%, rgba(14, 165, 233, 0.08), transparent 28%)
        `,
      }}
    >
      <div className="grid lg:grid-cols-2 min-h-screen relative">
        {/* Floating Background Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(16, 185, 129, 0.15), transparent 50%)',
          }}
        />

        {/* Left Panel - Animated Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex flex-col justify-center px-12 py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-visible relative z-10"
          style={{
            background: `
              radial-gradient(circle at top left, rgba(16, 185, 129, 0.18), transparent 35%),
              linear-gradient(135deg, #0f172a 0%, #1e293b 100%)
            `,
          }}
        >
          {/* Logo */}
          <div className="mb-16 flex items-center gap-3 relative z-10">
            <div className="bg-bright-green rounded-lg px-3 py-2 flex items-center justify-center shadow-xl">
              <span className="text-white font-black text-xl">BS</span>
            </div>
            <span className="text-2xl font-bold">Bright Solutions</span>
          </div>

          {/* Cycling Dashboard Preview */}
          <div className="relative z-10">
            <CyclingDashboardPreview selectedAccountType={accountType} />
          </div>
        </motion.div>

        {/* Right Panel - Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center px-6 py-16 lg:py-0"
        >
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-10 flex items-center justify-center gap-2">
              <div className="bg-bright-green rounded-lg px-3 py-2 flex items-center justify-center">
                <span className="text-white font-black text-lg">BS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Bright Solutions</span>
            </div>

            {/* Form Header */}
            <motion.div
              className="mb-6 text-center lg:text-left"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
              <p className="text-gray-600 text-sm">
                Start building cleaner communities with intelligent environmental infrastructure.
              </p>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Social Login Buttons */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  type="button"
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg font-medium text-gray-700 transition flex items-center justify-center gap-3 group hover:bg-[#F8FAFC] hover:border-bright-green/30"
                  disabled={submitState !== 'idle'}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </motion.button>
                <motion.button
                  type="button"
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg font-medium text-gray-700 transition flex items-center justify-center gap-3 group hover:bg-[#F8FAFC] hover:border-bright-green/30"
                  disabled={submitState !== 'idle'}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 13.5c0-1.8-1.46-3.26-3.26-3.26-1.8 0-3.26 1.46-3.26 3.26s1.46 3.26 3.26 3.26c1.8 0 3.26-1.46 3.26-3.26zm-5.1 0c0-1.01.82-1.84 1.84-1.84 1.01 0 1.84.82 1.84 1.84s-.82 1.84-1.84 1.84c-1.01 0-1.84-.82-1.84-1.84z" />
                  </svg>
                  Continue with Apple
                </motion.button>
              </motion.div>

              {/* Divider */}
              <motion.div
                className="relative flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex-1 border-t border-gray-200" />
                <span className="text-sm text-gray-500 px-2 font-medium">or continue with email</span>
                <div className="flex-1 border-t border-gray-200" />
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <label className="block text-sm font-semibold text-gray-900 mb-2">Work email</label>
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bright-green focus:border-transparent transition bg-[#FAFBFC] hover:bg-white shadow-inner"
                      style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' }}
                      required
                      disabled={submitState !== 'idle'}
                    />
                  </div>

                  {/* Email Suggestion */}
                  <AnimatePresence>
                    {emailSuggestion && (
                      <motion.button
                        type="button"
                        onClick={() => setEmail(emailSuggestion)}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-bright-green hover:text-green-600 font-medium flex items-center gap-1"
                      >
                        Did you mean <span className="font-semibold">{emailSuggestion}</span>?
                      </motion.button>
                    )}
                  </AnimatePresence>

                  {/* Personalized Greeting */}
                  <AnimatePresence>
                    {email && !emailSuggestion && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-gray-600 italic"
                      >
                        Hi{' '}
                        <span className="font-semibold text-gray-900">
                          {email.split('@')[0]}
                        </span>
                        . We'll tailor your workspace after signup.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Premium Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <PremiumPasswordField
                  value={password}
                  onChange={setPassword}
                  onShowToggle={setShowPassword}
                  showPassword={showPassword}
                />
              </motion.div>

              {/* Premium Account Type Selection */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <PremiumAccountTypeSelector selected={accountType} onChange={setAccountType} />
              </motion.div>

              {/* Terms Checkbox */}
              <motion.label
                className="flex items-start gap-3 cursor-pointer group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded cursor-pointer accent-bright-green"
                  disabled={submitState !== 'idle'}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-bright-green hover:underline font-semibold">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-bright-green hover:underline font-semibold">
                    Privacy Policy
                  </a>
                </span>
              </motion.label>

              {/* Submit Button with Progress Bar */}
              <motion.button
                type="submit"
                disabled={!isFormValid || submitState !== 'idle'}
                className="w-full rounded-lg font-bold text-white transition disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                whileHover={!isFormValid || submitState !== 'idle' ? {} : { y: -2 }}
                whileTap={!isFormValid || submitState !== 'idle' ? {} : { scale: 0.98 }}
                style={{
                  background: isFormValid && submitState === 'idle'
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    : '#d1d5db',
                  boxShadow: isFormValid && submitState === 'idle'
                    ? '0 10px 30px rgba(16, 185, 129, 0.4)'
                    : '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: submitState === 'creating' ? '8px 16px' : '12px 16px',
                }}
              >
                {/* Gradient Overlay on Hover */}
                {isFormValid && submitState === 'idle' && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-bright-green via-emerald-500 to-green-600 opacity-0 group-hover:opacity-20 transition"
                    whileHover={{ x: ['100%', '-100%'] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}

                <AnimatePresence mode="wait">
                  {submitState === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2 relative z-10 py-3"
                    >
                      Create Account
                      <motion.div
                        animate={isFormValid && submitState === 'idle' ? { x: [0, 4, 0] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
                  )}
                  {submitState === 'creating' && (
                    <motion.div
                      key="creating"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center gap-2 relative z-10 py-2"
                    >
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-sm"
                      >
                        Creating workspace...
                      </motion.span>
                      <motion.div
                        className="w-24 h-1 bg-white/30 rounded-full overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                      >
                        <motion.div
                          className="h-full bg-white rounded-full"
                          animate={{ scaleX: [0, 1] }}
                          transition={{ duration: 2, ease: 'easeInOut' }}
                          style={{ originX: 0 }}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                  {submitState === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2 relative z-10 py-3"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </motion.div>
                      Workspace Ready!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            {/* Sign In Link */}
            <motion.p
              className="text-center mt-5 text-gray-600 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Already registered?{' '}
              <Link to="/login" className="text-bright-green hover:underline font-semibold">
                Sign in
              </Link>
            </motion.p>

            {/* Trust Indicators with Lucide Icons */}
            <motion.div
              className="mt-6 pt-5 border-t border-gray-200 space-y-2 text-xs text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { Icon: Shield, text: 'Secure authentication' },
                { Icon: Lock, text: 'Your information is encrypted' },
                { Icon: Zap, text: 'No credit card required' },
              ].map((indicator, idx) => {
                const Icon = indicator.Icon
                return (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.85 + idx * 0.05 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ delay: 0.9 + idx * 0.05, type: 'spring' }}
                    >
                      <Icon className="w-3.5 h-3.5 text-bright-green flex-shrink-0" />
                    </motion.div>
                    <span className="text-gray-700">{indicator.text}</span>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 20, x: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 right-6 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-5 h-5 bg-bright-green rounded-full flex items-center justify-center flex-shrink-0"
                  animate={{ scale: [0, 1] }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <CheckCircle className="w-3 h-3 text-white" strokeWidth={3} />
                </motion.div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-900">Route Completed</p>
                  <p className="text-xs text-gray-500">2 seconds ago</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
