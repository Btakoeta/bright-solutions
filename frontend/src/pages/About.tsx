import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, Users, Globe, Leaf, Zap } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-bright-green rounded-lg px-3 py-2 flex items-center justify-center shadow-md">
              <span className="text-white font-black text-lg">BS</span>
            </div>
            <h1 className="text-2xl font-bold text-bright-green">Bright Solutions</h1>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="px-6 py-2 text-gray-700 font-medium hover:text-bright-green transition">
              Home
            </Link>
            <Link to="/login" className="px-6 py-2 text-gray-700 font-medium hover:text-bright-green transition">
              Login
            </Link>
            <Link to="/register" className="px-6 py-2 bg-bright-green text-white font-bold rounded-lg hover:bg-green-600 transition shadow-md">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">About Bright Solutions</h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Building the environmental infrastructure that helps communities and nations thrive.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-bright-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            Our Story
            <span className="inline-block w-1 h-8 bg-bright-gold/70 rounded-full"></span>
          </h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Bright Solutions was inspired by firsthand experience witnessing the challenges that poor waste management creates for communities. Those experiences shaped a conviction that cleaner cities require more than waste collection—they require better infrastructure, better technology, and better systems.
            </p>
            <p>
              Today, Bright Solutions is building those systems to help communities become healthier, more sustainable, and more resilient.
            </p>
            <p>
              We believe environmental infrastructure is foundational to human dignity, economic opportunity, and national development. That's why we're committed to making modern waste management accessible to every community, regardless of size or economic status.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A future where every community—regardless of geography or economic status—has access to modern environmental infrastructure that promotes health, dignity, and sustainable growth.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-bright-gold/5 rounded-lg -z-10"></div>
              <h3 className="text-2xl font-bold text-bright-gold mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To transform environmental infrastructure through technology that empowers people, strengthens communities, and enables nations to build cleaner and more sustainable futures.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-bright-green flex-shrink-0" /> <strong>Innovation</strong></li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-bright-green flex-shrink-0" /> <strong>Integrity</strong></li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-bright-green flex-shrink-0" /> <strong>Stewardship</strong></li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-bright-green flex-shrink-0" /> <strong>Service</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We provide modern environmental infrastructure technology for organizations of all sizes</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: 'For Individuals',
                desc: 'Reliable waste collection and recycling services with transparency and convenience.'
              },
              {
                icon: Zap,
                title: 'For Businesses',
                desc: 'Cost-effective waste management solutions that reduce environmental impact.'
              },
              {
                icon: Globe,
                title: 'For Municipalities',
                desc: 'Digital tools to manage city-wide waste operations with real-time visibility.'
              },
              {
                icon: Leaf,
                title: 'For Governments',
                desc: 'National environmental infrastructure platforms that support sustainable development.'
              },
            ].map((item, idx) => (
              <div key={idx} className={`bg-white rounded-lg p-8 border transition ${idx === 3 ? 'border-bright-gold/30 hover:border-bright-gold/50' : 'border-gray-200 hover:border-bright-green/50'}`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${idx === 3 ? 'bg-bright-gold/10' : 'bg-bright-green/10'}`}>
                  <item.icon className={`w-6 h-6 ${idx === 3 ? 'text-bright-gold' : 'text-bright-green'}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${idx === 3 ? 'text-bright-gold' : 'text-gray-900'}`}>{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why We're Different</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Rooted in Real Experience</h3>
                <p className="text-gray-600">Our founder's experience living in communities with poor waste infrastructure shapes every decision we make. We understand the problem firsthand.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Built for Scale</h3>
                <p className="text-gray-600">From a single neighborhood to an entire nation, our platform adapts to any scale while maintaining the same level of service and impact.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Technology with Purpose</h3>
                <p className="text-gray-600">We don't build technology for its own sake. Every feature we create serves one goal: making communities cleaner and healthier.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Focused on Outcomes</h3>
                <p className="text-gray-600">We measure success not by transactions, but by the cleaner communities and stronger economies we help build.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Committed to Equity</h3>
                <p className="text-gray-600">Modern environmental infrastructure shouldn't be a luxury. We're committed to making it accessible to communities regardless of economic status.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Long-Term Perspective</h3>
                <p className="text-gray-600">We're building for the future—sustainable systems that protect today's communities while preserving tomorrow's environment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bright-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl font-bold">Join Us in Building Cleaner Communities</h2>
          <p className="text-xl opacity-90">Whether you're an individual, business, municipality, or government, we're here to help you create lasting environmental impact.</p>
          <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-bright-green font-bold rounded-lg hover:bg-gray-100 transition shadow-lg">
            Request a Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-bright-green rounded-lg px-3 py-2">
                  <span className="text-white font-black">BS</span>
                </div>
                <span className="font-bold text-white">Bright Solutions</span>
              </div>
              <p className="text-sm text-gray-400">Building the environmental infrastructure that helps nations thrive.</p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-bright-green transition">Features</a></li>
                <li><a href="#" className="hover:text-bright-green transition">Pricing</a></li>
                <li><a href="#" className="hover:text-bright-green transition">Security</a></li>
                <li><a href="#" className="hover:text-bright-green transition">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-bright-green transition">About</Link></li>
                <li><a href="#" className="hover:text-bright-green transition">Blog</a></li>
                <li><a href="#" className="hover:text-bright-green transition">Careers</a></li>
                <li><a href="#" className="hover:text-bright-green transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-bright-green transition">Privacy</a></li>
                <li><a href="#" className="hover:text-bright-green transition">Terms</a></li>
                <li><a href="#" className="hover:text-bright-green transition">Cookies</a></li>
                <li><a href="#" className="hover:text-bright-green transition">Compliance</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 Bright Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
