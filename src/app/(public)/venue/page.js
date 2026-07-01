import Image from 'next/image'
import { Users, Car, Leaf, Wind, Home, Zap, Shield, Utensils, Music, Camera, Droplets, CheckCircle } from 'lucide-react'

export const metadata = { title: 'Venue Details' }

const facilities = [
  { icon: Wind, label: 'AC Hall' },
  { icon: Zap, label: 'Generator Backup' },
  { icon: Shield, label: 'Security' },
  { icon: Home, label: 'Housekeeping' },
  { icon: Utensils, label: 'Catering Support' },
  { icon: Music, label: 'Sound System' },
  { icon: Camera, label: 'Decoration Support' },
  { icon: Droplets, label: 'Drinking Water' },
  { icon: CheckCircle, label: 'Stage Setup' },
  { icon: Users, label: 'Washrooms' },
  { icon: CheckCircle, label: 'Lighting Setup' },
  { icon: Car, label: 'Valet Parking' },
]

export default function VenuePage() {
  return (
    <div>
      <section className="relative h-72 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920" alt="Venue" fill className="object-cover" />
          <div className="absolute inset-0 bg-charcoal/75" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-gold-400 text-sm tracking-widest uppercase font-body mb-2">Explore Our Space</p>
          <h1 className="text-white text-5xl font-serif font-bold">Venue Details</h1>
        </div>
      </section>

      {/* Hall Details */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-serif text-charcoal mb-4">Our Spaces</h2>
            <div className="section-divider" />
          </div>
          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold-100">
              <h3 className="text-2xl font-serif text-charcoal mb-6 flex items-center gap-3">
                <span className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center"><Home size={18} className="text-white" /></span>
                Grand Hall
              </h3>
              <div className="space-y-4">
                {[['Hall Size', '10,000 sq.ft'], ['Seating Capacity', '600 Guests'], ['Floating Capacity', '1,000 Guests'], ['Air Conditioning', 'Fully AC'], ['Stage', 'Premium Stage Setup'], ['Sound System', 'Professional Audio']].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-600 font-body text-sm">{k}</span>
                    <span className="font-semibold text-charcoal font-body text-sm">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold-100">
              <h3 className="text-2xl font-serif text-charcoal mb-6 flex items-center gap-3">
                <span className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center"><Leaf size={18} className="text-white" /></span>
                Garden Area
              </h3>
              <div className="space-y-4">
                {[['Garden Size', '15,000 sq.ft'], ['Outdoor Seating', '500 Guests'], ['Landscape', 'Manicured Gardens'], ['Lighting', 'Decorative + Functional'], ['Stage Area', 'Open Air Stage'], ['Ambiance', 'Tropical & Elegant']].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-600 font-body text-sm">{k}</span>
                    <span className="font-semibold text-charcoal font-body text-sm">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold-100">
              <h3 className="text-2xl font-serif text-charcoal mb-6 flex items-center gap-3">
                <span className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center"><Home size={18} className="text-white" /></span>
                Guest Rooms
              </h3>
              <div className="space-y-4">
                {[['Total Rooms', '10 Rooms'], ['Bridal Suite', '1 Luxury Suite'], ['Standard Rooms', '9 Rooms'], ['Facilities', 'AC + Hot Water'], ['Capacity', '20 Guests'], ['Booking', 'Available on Request']].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-600 font-body text-sm">{k}</span>
                    <span className="font-semibold text-charcoal font-body text-sm">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold-100">
              <h3 className="text-2xl font-serif text-charcoal mb-6 flex items-center gap-3">
                <span className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center"><Car size={18} className="text-white" /></span>
                Parking
              </h3>
              <div className="space-y-4">
                {[['Parking Capacity', '200+ Vehicles'], ['Type', 'Open & Covered'], ['Valet Service', 'Available (Premium)'], ['Security', '24/7 CCTV'], ['Accessibility', 'Easy Entry/Exit'], ['Management', 'Dedicated Attendants']].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-600 font-body text-sm">{k}</span>
                    <span className="font-semibold text-charcoal font-body text-sm">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-gold-400 text-sm tracking-widest uppercase font-body mb-2">What's Included</p>
            <h2 className="text-4xl font-serif text-white mb-4">All Facilities</h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {facilities.map(({ icon: Icon, label }) => (
              <div key={label} className="bg-white/5 rounded-xl p-5 text-center border border-white/10 hover:border-gold-500 transition-colors group">
                <div className="w-12 h-12 gold-gradient rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Icon size={22} className="text-white" />
                </div>
                <p className="text-white text-sm font-body">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery of Venue */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-serif text-charcoal mb-4">Explore the Space</h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600',
              'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600',
              'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
              'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600',
              'https://images.unsplash.com/photo-1470753937643-efeb931202a9?w=600',
              'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600',
            ].map((src, i) => (
              <div key={i} className="overflow-hidden rounded-xl">
                <Image src={src} alt={`Venue ${i+1}`} width={400} height={300} className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
