'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Check, Star } from 'lucide-react'

const fallbackPackages = [
  { id: '1', name: 'Basic Package', price: 75000, guestCapacity: 200, isPopular: false, features: ['Hall Decoration', 'Basic Catering (Veg)', 'Sound System', 'Lighting Setup', 'Parking', 'Security', 'Housekeeping', 'Drinking Water'] },
  { id: '2', name: 'Standard Package', price: 150000, guestCapacity: 500, isPopular: true, features: ['Premium Hall & Garden Decoration', 'Catering (Veg & Non-Veg)', 'DJ & Sound System', 'Professional Lighting', 'Photography (8 hours)', 'Parking', 'Security', 'Housekeeping', 'Bridal Room', 'Generator Backup', 'Drinking Water', 'Flower Arrangements'] },
  { id: '3', name: 'Premium Package', price: 300000, guestCapacity: 1000, isPopular: false, features: ['Luxury Hall & Garden Decoration', 'Premium Catering (Multi-Cuisine)', 'Live Music & DJ', 'Professional Photography & Videography', 'Cinematic Videography', 'Premium Lighting Show', 'Floral Entrance Decoration', 'Bridal Suite (2 nights)', 'Valet Parking', 'Dedicated Event Manager', 'Security Team', 'Complete Housekeeping', 'Cake & Sweet Arrangements', 'Welcome Drinks', 'Generator Backup', 'Fire Works Arrangement'] },
]

export default function PackagesPage() {
  const [packages, setPackages] = useState(fallbackPackages)

  useEffect(() => {
    fetch('/api/packages')
      .then(r => r.json())
      .then(data => { if (data.packages?.length) setPackages(data.packages) })
      .catch(() => {})
  }, [])

  return (
    <div>
      <section className="relative h-72 flex items-center justify-center bg-charcoal">
        <div className="relative z-10 text-center">
          <p className="text-gold-400 text-sm tracking-widest uppercase font-body mb-2">Plans & Pricing</p>
          <h1 className="text-white text-5xl font-serif font-bold">Packages & Pricing</h1>
        </div>
      </section>

      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-serif text-charcoal mb-4">Choose Your Perfect Package</h2>
            <div className="section-divider" />
            <p className="text-gray-600 font-body max-w-2xl mx-auto mt-6">All packages include our beautiful venue, professional staff, and our commitment to making your event unforgettable. Custom packages also available on request.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <div key={pkg.id} className={`relative bg-white rounded-3xl p-8 shadow-lg border-2 transition-all hover:-translate-y-2 ${pkg.isPopular ? 'border-gold-500 shadow-gold-200' : 'border-gray-100'}`}>
                {pkg.isPopular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-5 py-2 gold-gradient text-white text-sm font-semibold rounded-full shadow-lg">
                    <Star size={14} className="fill-white" /> Most Popular
                  </div>
                )}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${i === 2 ? 'bg-purple-100' : 'gold-gradient'}`}>
                  <span className="text-3xl">{i === 0 ? '🌸' : i === 1 ? '👑' : '💎'}</span>
                </div>
                <h3 className="text-2xl font-serif text-charcoal text-center mb-1">{pkg.name}</h3>
                <div className="text-center mb-5">
                  <div className="text-4xl font-bold text-gold-600 font-serif">₹{pkg.price.toLocaleString('en-IN')}</div>
                  <p className="text-gray-500 text-sm font-body">Up to {pkg.guestCapacity} guests</p>
                </div>
                <div className="h-px bg-gray-100 mb-5" />
                <ul className="space-y-2.5 mb-8">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <div className="w-5 h-5 gold-gradient rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} className="text-white" />
                      </div>
                      <span className="text-gray-600 text-sm font-body">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/booking?package=${pkg.id}`} className={`block text-center py-3 rounded-full font-body font-semibold transition-all ${pkg.isPopular ? 'gold-gradient text-white hover:shadow-lg hover:shadow-gold-500/30' : 'border-2 border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white'}`}>
                  Book This Package
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-charcoal rounded-2xl p-10 text-center">
            <h3 className="text-3xl font-serif text-white mb-3">Need a Custom Package?</h3>
            <p className="text-gray-400 font-body max-w-xl mx-auto mb-6">We can create a fully customized package tailored to your specific requirements and budget. Contact us to discuss.</p>
            <Link href="/contact" className="inline-block px-8 py-3 gold-gradient text-white rounded-full font-body font-semibold hover:shadow-lg transition-all">
              Get Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
