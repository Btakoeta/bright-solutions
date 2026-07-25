import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Leaf } from 'lucide-react'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800&h=600&fit=crop'

interface Slide {
  id: number
  imageUrl: string
  title: string
  description: string
  theme: 'waste' | 'energy' | 'sustainability'
}

const slides: Slide[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1575570776499-fd00b347e180?w=800&h=600&fit=crop',
    title: 'Waste to Resource',
    description: 'Smart waste management transforms communities',
    theme: 'waste'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800&h=600&fit=crop',
    title: 'Renewable Energy',
    description: 'Powering sustainable futures with clean energy',
    theme: 'energy'
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    title: 'Green Infrastructure',
    description: 'Building cities that breathe and thrive',
    theme: 'sustainability'
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=600&fit=crop',
    title: 'Recycling Innovation',
    description: 'Turning waste into tomorrow\'s resources',
    theme: 'waste'
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
    title: 'Clean Communities',
    description: 'Every neighborhood deserves a healthy environment',
    theme: 'sustainability'
  },
  {
    id: 6,
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e938975a918?w=800&h=600&fit=crop',
    title: 'Solar Solutions',
    description: 'Harnessing the sun\'s power for global change',
    theme: 'energy'
  },
]

export default function EnvironmentalSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay])

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setAutoPlay(false)
  }

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-full"
        >
          {/* Background Image */}
          <img
            src={slides[currentSlide].imageUrl}
            alt={slides[currentSlide].title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMAGE
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-white" />
                <span className="text-sm font-semibold text-white/90 uppercase tracking-wide">
                  {slides[currentSlide].theme === 'waste' && 'Waste Solutions'}
                  {slides[currentSlide].theme === 'energy' && 'Clean Energy'}
                  {slides[currentSlide].theme === 'sustainability' && 'Sustainability'}
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                {slides[currentSlide].title}
              </h2>
              <p className="text-lg text-white/90 max-w-xl">
                {slides[currentSlide].description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-2 rounded-full transition ${
              idx === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/70'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <motion.div
        className="absolute top-8 right-8 z-20 text-white/70 text-sm flex items-center gap-2"
        animate={{ opacity: autoPlay ? 1 : 0.5 }}
      >
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <span>Auto-playing</span>
      </motion.div>
    </div>
  )
}
