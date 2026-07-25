import { motion } from 'framer-motion'
import { Users, Building2, Home, BarChart3 } from 'lucide-react'

interface AccountTypeSelectorProps {
  selected: string | null
  onChange: (type: string) => void
}

const accountTypes = [
  {
    id: 'individual',
    label: 'Household',
    description: 'Manage residential collections and service requests.',
    icon: Home,
  },
  {
    id: 'business',
    label: 'Business',
    description: 'Manage waste services for one or more business locations.',
    icon: Building2,
  },
  {
    id: 'community',
    label: 'Community or HOA',
    description: 'Coordinate services across a neighborhood or property community.',
    icon: Users,
  },
  {
    id: 'government',
    label: 'Municipality or Government',
    description: 'Manage public infrastructure, fleets, reporting, and citizen services.',
    icon: BarChart3,
  },
]

export default function AccountTypeSelector({ selected, onChange }: AccountTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Who are you signing up for?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accountTypes.map((type) => {
          const Icon = type.icon
          const isSelected = selected === type.id
          return (
            <motion.button
              key={type.id}
              onClick={() => onChange(type.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-5 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-bright-green bg-bright-green/5 shadow-md'
                  : 'border-gray-200 bg-white hover:border-bright-green/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition ${
                    isSelected ? 'bg-bright-green text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{type.label}</h4>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
