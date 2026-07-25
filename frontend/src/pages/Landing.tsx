import { Link } from 'react-router-dom'
import { MapPin, BarChart3, Users, Zap, CheckCircle, ArrowRight, Globe, Leaf, Globe2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'
import EnvironmentalSlideshow from '../components/EnvironmentalSlideshow'
import StatesCoverageMap from '../components/StatesCoverageMap'
import AnimatedCounter from '../components/AnimatedCounter'
import TrustSection from '../components/TrustSection'
import GlobalImpactSection from '../components/GlobalImpactSection'
import DashboardMockup from '../components/DashboardMockup'
import { useState } from 'react'

export default function Landing() {
  const { language, setLanguage } = useLanguage()
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'es' as const, name: 'Español', flag: '🇪🇸' },
    { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-bright-green rounded-lg px-3 py-2 flex items-center justify-center shadow-md">
              <span className="text-white font-black text-lg">BS</span>
            </div>
            <h1 className="text-2xl font-bold text-bright-green">Bright Solutions</h1>
          </div>

          <div className="flex items-center gap-6">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-bright-green transition bg-gray-50 hover:bg-gray-100"
              >
                <Globe2 className="w-4 h-4 text-bright-green" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setShowLanguageMenu(false)
                      }}
                      className={`w-full px-4 py-3 text-left flex items-center gap-2 transition ${
                        language === lang.code
                          ? 'bg-bright-green/10 text-bright-green font-medium'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/login" className="px-6 py-2 text-gray-700 font-medium hover:text-bright-green transition">
              {translations[language].nav.login}
            </Link>
            <Link to="/register" className="px-6 py-2 bg-bright-green text-white font-bold rounded-lg hover:bg-green-600 transition shadow-md">
              {translations[language].nav.getStarted}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-bright-green/10 border border-bright-green/30 text-bright-green px-4 py-2 rounded-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium">{translations[language].hero.badge}</span>
            </motion.div>

            <motion.h1
              className="text-7xl lg:text-8xl font-bold leading-tight text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {translations[language].hero.title}
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Reimagining how communities, cities, and nations manage the systems that keep people healthy, connected, and thriving.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bright-green text-white font-bold rounded-lg hover:bg-green-600 transition shadow-lg hover:shadow-xl transform hover:scale-105">
                {translations[language].hero.cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-bright-green text-bright-green font-bold rounded-lg hover:bg-bright-green/5 transition">
                {translations[language].hero.secondary}
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="h-96 lg:h-full"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <EnvironmentalSlideshow />
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* Our Story Section - Premium White Background */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-br from-bright-green/10 to-bright-green/5 border border-bright-green/20 rounded-3xl p-12 lg:p-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-10 text-gray-900 flex items-center gap-3">
              {translations[language].whyWeExist.title}
              <span className="inline-block w-1 h-10 bg-bright-green rounded-full"></span>
            </h2>
            <div className="space-y-8 text-lg leading-relaxed text-gray-700">
              <p>{translations[language].whyWeExist.paragraph1}</p>
              <p>{translations[language].whyWeExist.paragraph2}</p>
              <p className="font-bold text-xl text-bright-green">{translations[language].whyWeExist.paragraph3}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">{translations[language].mission.vision.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {translations[language].mission.vision.description}
              </p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-bright-gold/5 to-bright-gold/0 border border-bright-gold/20 rounded-2xl p-8 lg:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-3xl font-bold text-bright-gold mb-6">{translations[language].mission.mission.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {translations[language].mission.mission.description}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">{translations[language].mission.values.title}</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center gap-3 text-lg"><CheckCircle className="w-6 h-6 text-bright-green flex-shrink-0" /> {translations[language].mission.values.innovation}</li>
                <li className="flex items-center gap-3 text-lg"><CheckCircle className="w-6 h-6 text-bright-green flex-shrink-0" /> {translations[language].mission.values.integrity}</li>
                <li className="flex items-center gap-3 text-lg"><CheckCircle className="w-6 h-6 text-bright-green flex-shrink-0" /> {translations[language].mission.values.stewardship}</li>
                <li className="flex items-center gap-3 text-lg"><CheckCircle className="w-6 h-6 text-bright-green flex-shrink-0" /> {translations[language].mission.values.service}</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Impact We're Creating
            </h2>
            <p className="text-xl text-gray-600">
              Real results in real communities
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <AnimatedCounter end={50} suffix="+" color="text-bright-green" />
              <p className="text-gray-600 text-lg mt-3 font-medium">{translations[language].impact.cleanerCommunitiesDesc}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <AnimatedCounter end={500} suffix="K+" color="text-bright-green" />
              <p className="text-gray-600 text-lg mt-3 font-medium">{translations[language].impact.smarterOperationsDesc}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <AnimatedCounter end={100} suffix="%" color="text-bright-green" />
              <p className="text-gray-600 text-lg mt-3 font-medium">{translations[language].impact.sustainableGrowthDesc}</p>
            </motion.div>
            <motion.div
              className="relative bg-gradient-to-br from-bright-gold/5 to-bright-gold/0 border border-bright-gold/20 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <AnimatedCounter end={1} suffix="" color="text-bright-gold" />
              <p className="text-bright-gold font-bold text-lg mt-3">{translations[language].impact.nationBuildingDesc}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Mockup Section */}
      <DashboardMockup />

      {/* Global Impact Section */}
      <GlobalImpactSection />

      {/* How It Works */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900">{translations[language].howItWorks.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{translations[language].howItWorks.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                step: translations[language].howItWorks.step1.step,
                title: translations[language].howItWorks.step1.title,
                desc: translations[language].howItWorks.step1.desc
              },
              {
                step: translations[language].howItWorks.step2.step,
                title: translations[language].howItWorks.step2.title,
                desc: translations[language].howItWorks.step2.desc
              },
              {
                step: translations[language].howItWorks.step3.step,
                title: translations[language].howItWorks.step3.title,
                desc: translations[language].howItWorks.step3.desc
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-50 border border-gray-200 rounded-xl p-8 lg:p-10 hover:border-bright-green/50 transition hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <div className="text-6xl font-bold text-bright-green mb-6 opacity-70">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* States Coverage Map Section */}
      <StatesCoverageMap />

      {/* Features Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900">Powerful Infrastructure</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Technology that transforms how communities are managed</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[
              { icon: MapPin, title: 'Smart Collection Management', desc: 'Optimize routes, schedules, and service delivery.' },
              { icon: BarChart3, title: 'Real-Time Fleet Visibility', desc: 'Monitor every collection vehicle in real time.' },
              { icon: Zap, title: 'Sustainability Intelligence', desc: 'Measure recycling rates, landfill diversion, and environmental impact.' },
              { icon: Users, title: 'Citizen Portal', desc: 'Allow residents to schedule pickups, report issues, and receive notifications.' },
              { icon: Globe, title: 'Government Analytics', desc: 'Support policy decisions using accurate environmental and operational data.' },
              { icon: Leaf, title: 'AI-Powered Forecasting', desc: 'Predict demand, optimize resources, and improve city planning.' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-bright-green/50 transition hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-14 h-14 bg-bright-green/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-bright-green" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Bright Solutions Section */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900">Why Bright Solutions</h2>
            <p className="text-xl text-gray-600">Why communities and governments choose us</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {[
              { title: 'Built for Communities', desc: 'Designed for real-world sanitation challenges.' },
              { title: 'Data Driven', desc: 'Make better decisions with actionable insights.' },
              { title: 'Scalable', desc: 'From one neighborhood to an entire nation.' },
              { title: 'Sustainable', desc: 'Protecting today\'s communities while preserving tomorrow\'s environment.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-8 lg:p-10 hover:border-bright-green/50 transition hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="font-bold text-gray-900 mb-3 text-xl">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32 bg-gradient-to-r from-bright-green to-green-600 text-white overflow-hidden relative">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <motion.h2
            className="text-6xl lg:text-7xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {translations[language].cta.title}
          </motion.h2>
          <motion.p
            className="text-xl max-w-2xl mx-auto opacity-90 lg:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {translations[language].cta.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-bright-green font-bold rounded-lg hover:bg-gray-100 transition shadow-lg transform hover:scale-105">
              {translations[language].cta.button}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        {/* Footer Purpose Section */}
        <div className="border-b border-gray-800 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Building the Environmental Infrastructure That Helps Nations Thrive
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We're not just managing waste. We're building the systems that enable communities to thrive, cities to scale sustainably, and nations to prosper.
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-5 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-bright-green rounded-lg px-3 py-2 flex items-center justify-center">
                    <span className="text-white font-black">BS</span>
                  </div>
                  <span className="font-bold text-white">Bright Solutions</span>
                </div>
                <p className="text-sm text-gray-400">{translations[language].footer.tagline}</p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-6">{translations[language].footer.product}</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-bright-green transition">{translations[language].footer.features}</a></li>
                  <li><a href="#" className="hover:text-bright-green transition">{translations[language].footer.pricing}</a></li>
                  <li><a href="#" className="hover:text-bright-green transition">{translations[language].footer.security}</a></li>
                  <li><a href="#" className="hover:text-bright-green transition">{translations[language].footer.api}</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-6">{translations[language].footer.company}</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link to="/about" className="hover:text-bright-green transition">{translations[language].footer.about}</Link></li>
                  <li><a href="#" className="hover:text-bright-green transition">{translations[language].footer.blog}</a></li>
                  <li><a href="#" className="hover:text-bright-green transition">{translations[language].footer.careers}</a></li>
                  <li><a href="#" className="hover:text-bright-green transition">{translations[language].footer.contact}</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-6">{translations[language].footer.legal}</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-bright-green transition">{translations[language].footer.privacy}</a></li>
                  <li><a href="#" className="hover:text-bright-green transition">{translations[language].footer.terms}</a></li>
                  <li><a href="#" className="hover:text-bright-green transition">{translations[language].footer.cookies}</a></li>
                  <li><a href="#" className="hover:text-bright-green transition">{translations[language].footer.compliance}</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-6">Follow Us</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-bright-green transition">Twitter</a></li>
                  <li><a href="#" className="hover:text-bright-green transition">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-bright-green transition">GitHub</a></li>
                  <li><a href="#" className="hover:text-bright-green transition">Newsletter</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
              <p>{translations[language].footer.copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
