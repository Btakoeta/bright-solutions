import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowRight, Shield, Lock, Zap, Eye, EyeOff } from 'lucide-react'
import CyclingDashboardPreview from '../components/CyclingDashboardPreview'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [capsLockOn, setCapsLockOn] = useState(false)
  const [showMagicLink, setShowMagicLink] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitState, setSubmitState] = useState<'idle' | 'signing-in' | 'checking' | 'success'>('idle')
  const [userGreeting, setUserGreeting] = useState<string | null>(null)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  // Extract user's name from email for greeting
  useEffect(() => {
    if (email && email.includes('@')) {
      const name = email.split('@')[0]
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
      setUserGreeting(capitalizedName)
    } else {
      setUserGreeting(null)
    }
  }, [email])

  // Detect caps lock
  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCapsLockOn(e.getModifierState('CapsLock'))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitState('signing-in')

    try {
      await login(email, password)
      setSubmitState('checking')

      // Simulate workspace checking
      setTimeout(() => {
        setSubmitState('success')
        setTimeout(() => {
          navigate('/dashboard')
        }, 1500)
      }, 1000)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
      setSubmitState('idle')
    }
  }

  const handleMagicLinkClick = () => {
    setShowMagicLink(!showMagicLink)
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

        {/* Left Panel - Dashboard Preview */}
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

          {/* Dashboard Preview */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-5xl lg:text-6xl font-black leading-tight text-white">
                Welcome Back
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                Continue managing your environmental infrastructure.
              </p>

              {/* Live Dashboard Metrics */}
              <motion.div
                className="mt-12 p-6 rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-lg">Live Dashboard</h3>
                  <motion.div
                    className="flex items-center gap-2 px-3 py-1.5 bg-bright-green/20 border border-bright-green/40 rounded-full"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-bright-green rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs text-bright-green font-medium">Live</span>
                  </motion.div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Collections', value: '2,845' },
                    { label: 'Fleet', value: '42' },
                    { label: 'Carbon Saved', value: '4.1T' },
                  ].map((metric, idx) => (
                    <motion.div
                      key={idx}
                      className="p-3 rounded-lg bg-white/8 border border-white/10"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <p className="text-xl font-bold text-white">{metric.value}</p>
                      <p className="text-xs text-gray-400 mt-1">{metric.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Security Indicators */}
              <motion.div className="pt-8 border-t border-bright-green/20 space-y-3">
                {[
                  { Icon: Lock, text: 'AES-256 Encryption' },
                  { Icon: Shield, text: 'Multi-Factor Authentication' },
                  { Icon: Zap, text: 'Enterprise Ready' },
                ].map((indicator, idx) => {
                  const Icon = indicator.Icon
                  return (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-3 text-xs text-gray-400"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <Icon className="w-4 h-4 text-bright-green flex-shrink-0" />
                      <span>{indicator.text}</span>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Panel - Login Form */}
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
              className="mb-8 text-center lg:text-left"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back <span className="wave">👋</span>
              </h1>
              <p className="text-gray-600 text-sm">
                Continue managing your environmental infrastructure.
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
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </motion.button>
                <motion.button
                  type="button"
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg font-medium text-gray-700 transition flex items-center justify-center gap-3 group hover:bg-[#F8FAFC] hover:border-bright-green/30"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 13.5c0-1.8-1.46-3.26-3.26-3.26-1.8 0-3.26 1.46-3.26 3.26s1.46 3.26 3.26 3.26c1.8 0 3.26-1.46 3.26-3.26zm-5.1 0c0-1.01.82-1.84 1.84-1.84 1.01 0 1.84.82 1.84 1.84s-.82 1.84-1.84 1.84c-1.01 0-1.84-.82-1.84-1.84z" />
                  </svg>
                  Continue with Apple
                </motion.button>
                <motion.button
                  type="button"
                  className="w-full py-3 px-4 border border-bright-green/30 rounded-lg font-medium text-bright-green transition flex items-center justify-center gap-3 group hover:bg-bright-green/5 hover:border-bright-green/50 bg-bright-green/5"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    🔐
                  </motion.span>
                  Continue with Passkey
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

              {/* Email Field with Personal Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bright-green focus:border-transparent transition bg-[#FAFBFC] hover:bg-white"
                  style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' }}
                  required
                  disabled={loading}
                />
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handlePasswordKeyDown}
                    placeholder="••••••••••"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bright-green focus:border-transparent transition bg-[#FAFBFC] hover:bg-white pr-12"
                    style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' }}
                    required
                    disabled={loading}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </motion.button>
                </div>

                {/* Caps Lock Warning */}
                <AnimatePresence>
                  {capsLockOn && password && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-yellow-600 flex items-center gap-2"
                    >
                      ⌨️ Caps Lock is on
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Keep Me Signed In Toggle */}
              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <label className="flex items-center gap-3 cursor-pointer group">
                  <motion.input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 rounded cursor-pointer accent-bright-green"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                  <span className="text-sm text-gray-700 font-medium">Keep me signed in</span>
                </label>
                <motion.button
                  type="button"
                  onClick={handleMagicLinkClick}
                  className="text-sm text-bright-green hover:underline font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {showMagicLink ? 'Use password' : 'Email me a link'}
                </motion.button>
              </motion.div>

              {/* Sign In Button */}
              <motion.button
                type="submit"
                disabled={!email || !password || loading}
                className="w-full rounded-lg font-bold text-white transition disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={!loading && email && password ? { y: -2 } : {}}
                whileTap={!loading && email && password ? { scale: 0.98 } : {}}
                style={{
                  background: email && password && !loading
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    : '#d1d5db',
                  boxShadow: email && password && !loading
                    ? '0 10px 30px rgba(16, 185, 129, 0.4)'
                    : '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <AnimatePresence mode="wait">
                  {submitState === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2 relative z-10 py-3"
                    >
                      Sign In
                      <motion.div animate={email && password && !loading ? { x: [0, 4, 0] } : {}} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
                  )}
                  {submitState === 'signing-in' && (
                    <motion.div
                      key="signing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center gap-2 relative z-10 py-2"
                    >
                      <span className="text-sm">Signing you in...</span>
                      <motion.div className="w-24 h-1 bg-white/30 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-white rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 1, ease: 'easeInOut' }}
                          style={{ originX: 0 }}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                  {(submitState === 'checking' || submitState === 'success') && (
                    <motion.div
                      key="checking"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2 relative z-10 py-3"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </motion.div>
                      {submitState === 'checking' ? 'Checking workspace...' : 'Authentication Complete'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            {/* Don't Have Account Link */}
            <motion.p
              className="text-center mt-6 text-gray-600 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Don't have an account?{' '}
              <Link to="/register" className="text-bright-green hover:underline font-semibold">
                Create one
              </Link>
            </motion.p>

            {/* Security Indicators */}
            <motion.div
              className="mt-6 pt-5 border-t border-gray-200 space-y-2 text-xs text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { Icon: Lock, text: 'Secure authentication' },
                { Icon: Shield, text: 'Your information is encrypted' },
                { Icon: Zap, text: 'Enterprise ready' },
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
                    <Icon className="w-3.5 h-3.5 text-bright-green flex-shrink-0" />
                    <span className="text-gray-700">{indicator.text}</span>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .wave {
          display: inline-block;
          animation: wave 2s ease-in-out infinite;
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-20deg); }
        }
      `}</style>
    </div>
  )
}
