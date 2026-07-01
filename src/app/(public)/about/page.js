import Image from 'next/image'
import Link from 'next/link'
import { Award, Heart, Users, Calendar, Star, ChevronRight } from 'lucide-react'

export const metadata = { title: 'About Us' }

const stats = [
  { value: '20+', label: 'Years of Service' },
  { value: '5000+', label: 'Events Hosted' },
  { value: '1000+', label: 'Families Served' },
  { value: '50+', label: 'Staff Members' },
]

const values = [
  { icon: Heart, title: 'Passion', desc: 'We pour our heart into every event, ensuring each celebration is as special as the couple themselves.' },
  { icon: Award, title: 'Excellence', desc: 'Uncompromising quality in service, food, decoration, and every detail of your event.' },
  { icon: Users, title: 'Family First', desc: 'We treat every client like family, building lasting relationships beyond just business.' },
  { icon: Calendar, title: 'Reliability', desc: 'Punctual, professional, and dependable — we never compromise on commitments.' },
]

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-80 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920" alt="About" fill className="object-cover" />
          <div className="absolute inset-0 bg-charcoal/75" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-gold-400 text-sm tracking-widest uppercase font-body mb-2">Our Story</p>
          <h1 className="text-white text-5xl font-serif font-bold">About Us</h1>
        </div>
      </section>

      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <Image src="/images/back.avif" alt="Venue" width={600} height={500} className="rounded-2xl w-full h-96 object-cover shadow-2xl" />
            <div className="absolute -bottom-6 -right-6 bg-charcoal p-6 rounded-2xl shadow-2xl">
              <div className="text-4xl font-serif text-gold-400 font-bold">2025</div>
              <div className="text-white text-sm font-body">Est. Year</div>
            </div>
          </div>
          <div>
            <p className="text-gold-600 text-sm tracking-widest uppercase font-body mb-2">Who We Are</p>
            <h2 className="text-4xl font-serif text-charcoal mb-6">A Legacy of Celebrations</h2>
            <p className="text-gray-600 font-body leading-relaxed mb-4">
              Royal Palace Marriage Hall & Garden was founded in 2005 with a simple yet profound vision: to create a venue where families could celebrate life's most precious moments in grandeur and comfort.
            </p>
            <p className="text-gray-600 font-body leading-relaxed mb-4">
              What began as a modest hall has grown into one of the city's most prestigious and sought-after event venues, known for our impeccable service, stunning décor, and the warmth we bring to every celebration.
            </p>
            <p className="text-gray-600 font-body leading-relaxed mb-8">
              Over the years, we have been privileged to be part of over 5,000 weddings, receptions, and celebrations — each one unique, each one unforgettable.
            </p>
            <Link href="/booking" className="inline-flex items-center gap-2 px-8 py-3 gold-gradient text-white rounded-full font-body font-semibold hover:shadow-lg transition-all">
              Book Your Event <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-charcoal">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-5xl font-serif text-gold-400 font-bold mb-2">{value}</div>
              <div className="text-white font-body text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div className="bg-ivory rounded-2xl p-8 border border-gold-100">
            <h3 className="text-2xl font-serif text-charcoal mb-3">Our Vision</h3>
            <p className="text-gray-600 font-body leading-relaxed">To be the most trusted and celebrated event venue in the region, where every celebration is a masterpiece and every family leaves with memories that last a lifetime.</p>
          </div>
          <div className="bg-ivory rounded-2xl p-8 border border-gold-100">
            <h3 className="text-2xl font-serif text-charcoal mb-3">Our Mission</h3>
            <p className="text-gray-600 font-body leading-relaxed">To provide exceptional venue experiences that exceed expectations through meticulous attention to detail, personalized service, and a genuine commitment to making every event extraordinary.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-serif text-charcoal mb-4">Our Core Values</h2>
            <div className="section-divider" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center bg-white p-8 rounded-2xl shadow-sm border border-gold-100 card-hover">
                <div className="w-14 h-14 gold-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-serif text-charcoal mb-3">{title}</h3>
                <p className="text-gray-500 text-sm font-body leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
