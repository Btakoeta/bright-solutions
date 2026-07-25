import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    organizationName: '',
    phoneNumber: '',
    serviceAddress: '',
    city: '',
    state: '',
    zipCode: '',
  })
  const navigate = useNavigate()

  const totalSteps = 3

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Complete onboarding
      navigate('/dashboard')
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const steps = [
    {
      title: 'Tell us about your organization',
      subtitle: 'Help us personalize your experience',
      fields: [
        { name: 'organizationName', label: 'Organization Name', placeholder: 'e.g., Acme Corp' },
        { name: 'phoneNumber', label: 'Phone Number', placeholder: '+1 (555) 000-0000', type: 'tel' },
      ],
    },
    {
      title: 'Service details',
      subtitle: 'Where are you located?',
      fields: [
        { name: 'serviceAddress', label: 'Service Address', placeholder: '123 Main St' },
        { name: 'city', label: 'City', placeholder: 'City name' },
        { name: 'state', label: 'State', placeholder: 'State code' },
        { name: 'zipCode', label: 'ZIP Code', placeholder: '12345' },
      ],
    },
    {
      title: 'You\'re all set!',
      subtitle: 'Your account is ready',
      completion: true,
    },
  ]

  const currentStep = steps[step - 1]

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{
        backgroundImage: `
          radial-gradient(circle at 15% 20%, rgba(16, 185, 129, 0.10), transparent 30%),
          radial-gradient(circle at 80% 75%, rgba(14, 165, 233, 0.08), transparent 28%)
        `,
        backgroundColor: '#f8fafc',
      }}
    >
      <div className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Step {step} of {totalSteps}
              </h2>
              <span className="text-sm text-gray-600">{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-bright-green"
                initial={{ width: 0 }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Content */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8 lg:p-12"
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentStep.title}</h1>
              <p className="text-gray-600">{currentStep.subtitle}</p>
            </div>

            {/* Form Fields or Completion Message */}
            {currentStep.completion ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center py-12 space-y-6"
              >
                <div className="flex justify-center">
                  <div className="p-4 bg-bright-green/10 rounded-full">
                    <CheckCircle className="w-16 h-16 text-bright-green" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xl text-gray-600">
                    Your Bright Solutions account is ready to use.
                  </p>
                  <p className="text-gray-600">
                    Let's take you to your personalized dashboard.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleNext()
                }}
                className="space-y-6"
              >
                {currentStep.fields?.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type || 'text'}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.name]: e.target.value,
                        }))
                      }
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bright-green focus:border-transparent transition"
                    />
                  </div>
                ))}

                {/* Buttons */}
                <div className="flex gap-4 pt-6">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-3 px-6 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-bright-green text-white font-bold rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
                  >
                    {step === totalSteps ? 'Complete Setup' : 'Continue'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Complete Button for Final Step */}
            {currentStep.completion && (
              <div className="flex gap-4 pt-8">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 py-3 px-6 bg-bright-green text-white font-bold rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>

          {/* Optional: Save and Resume Later */}
          {step < totalSteps && (
            <div className="text-center mt-6">
              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Save and continue later
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
