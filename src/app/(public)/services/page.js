import Image from 'next/image'
import { Check } from 'lucide-react'

export const metadata = { title: 'Our Services' }

const services = [
  { name: 'Catering', icon: '🍽️', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600', desc: 'Exquisite culinary experiences tailored to your taste and preferences.', features: ['Multi-Cuisine Menu', 'Veg & Non-Veg Options', 'Live Food Counters', 'Custom Menu Planning', 'Experienced Chefs', 'Hygienic Preparation'] },
  { name: 'Decoration', icon: '🌸', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600', desc: 'Transform your venue into a breathtaking visual masterpiece.', features: ['Floral Arrangements', 'Stage Decoration', 'Entrance Setup', 'Table Centerpieces', 'Lighting Effects', 'Theme Decoration'] },
  { name: 'Photography', icon: '📸', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600', desc: 'Capturing your precious moments with artistic excellence.', features: ['Professional Photographers', 'Candid Photography', 'Outdoor Shoots', 'Same-Day Previews', 'HD Edited Albums', 'Digital Delivery'] },
  { name: 'Videography', icon: '🎬', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600', desc: 'Cinematic wedding films that tell your unique love story.', features: ['4K Cinematography', 'Drone Aerial Shots', 'Cinematic Editing', 'Highlight Reel', 'Full Ceremony Recording', 'USB + Online Delivery'] },
  { name: 'DJ Services', icon: '🎵', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600', desc: 'Professional DJ with premium sound to keep the celebration alive.', features: ['Professional DJ', 'Premium Sound System', 'LED Dance Floor', 'Custom Playlists', 'Bollywood & Western', 'Special Song Requests'] },
  { name: 'Lighting', icon: '✨', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600', desc: 'Stunning lighting transformations for magical ambiance.', features: ['LED Lighting', 'Fairy Lights', 'Uplighting', 'Gobo Projections', 'Spotlight Effects', 'Colored Wash Lights'] },
  { name: 'Security', icon: '🛡️', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600', desc: 'Professional security ensuring a safe and secure environment.', features: ['Trained Security Staff', '24/7 CCTV', 'Entrance Management', 'Parking Security', 'VIP Protection', 'Emergency Protocols'] },
  { name: 'Event Management', icon: '🎯', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600', desc: 'End-to-end event management for a stress-free celebration.', features: ['Dedicated Coordinator', 'Vendor Management', 'Timeline Planning', 'Day-of Coordination', 'Guest Management', 'Post-Event Support'] },
]

export default function ServicesPage() {
  return (
    <div>
      <section className="relative h-72 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920" alt="Services" fill className="object-cover" />
          <div className="absolute inset-0 bg-charcoal/75" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-gold-400 text-sm tracking-widest uppercase font-body mb-2">What We Offer</p>
          <h1 className="text-white text-5xl font-serif font-bold">Our Services</h1>
        </div>
      </section>

      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-gold-600 text-sm tracking-widest uppercase font-body mb-2">Complete Solutions</p>
            <h2 className="text-4xl font-serif text-charcoal mb-4">Everything You Need</h2>
            <div className="section-divider" />
            <p className="text-gray-600 font-body max-w-2xl mx-auto mt-6">From catering to cinematography, we offer comprehensive services to make your event perfect in every way.</p>
          </div>

          <div className="space-y-16">
            {services.map((service, i) => (
              <div key={service.name} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <Image src={service.image} alt={service.name} width={600} height={400} className="rounded-2xl w-full h-72 object-cover shadow-xl" />
                </div>
                <div>
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <h3 className="text-3xl font-serif text-charcoal mb-3">{service.name}</h3>
                  <p className="text-gray-600 font-body leading-relaxed mb-6">{service.desc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <Check size={16} className="text-gold-600 shrink-0" />
                        <span className="text-gray-600 text-sm font-body">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
