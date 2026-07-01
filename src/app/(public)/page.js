import Link from 'next/link'
import Image from 'next/image'
import { Star, Users, Car, Leaf, Wind, Home, Zap, Phone, ChevronRight, Calendar, Award, Heart, MapPin } from 'lucide-react'

export const metadata = {
  title: 'Royal Palace Marriage Hall & Garden | Premium Wedding Venue',
  description: 'Experience the grandeur of Royal Palace Marriage Hall. Book your wedding, reception, engagement or any special event at our premium venue.',
}

const heroSlides = [
  { image: '/images/back.avif', title: 'Where Dreams Become Memories', subtitle: 'Grand Wedding Ceremonies & Celebrations' },
  { image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80', title: 'Luxury Venues for Every Occasion', subtitle: 'Weddings • Receptions • Engagements • Parties' },
  { image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1920&q=80', title: 'The Perfect Garden Setting', subtitle: 'Breathtaking Outdoor & Indoor Spaces' },
]

const highlights = [
  { icon: Users, value: '1000+', label: 'Guest Capacity', desc: 'Spacious halls & garden' },
  { icon: Car, value: '200+', label: 'Parking Spaces', desc: 'Ample parking available' },
  { icon: Leaf, value: '15,000', label: 'Sq.ft Garden', desc: 'Lush green surroundings' },
  { icon: Wind, value: 'AC Hall', label: 'Air Conditioned', desc: 'Fully climate controlled' },
  { icon: Home, value: '10', label: 'Guest Rooms', desc: 'Comfortable stays' },
  { icon: Zap, value: '100%', label: 'Power Backup', desc: 'Uninterrupted events' },
]

const whyUs = [
  { title: '20+ Years Experience', desc: 'Trusted by thousands of families for two decades of flawless events.' },
  { title: 'Expert Event Team', desc: 'Dedicated event coordinators to handle every detail seamlessly.' },
  { title: 'Premium Catering', desc: 'Exquisite multi-cuisine menu tailored to your preferences.' },
  { title: 'Prime Location', desc: 'Centrally located with easy accessibility from all areas of the city.' },
  { title: 'Modern Amenities', desc: 'State-of-the-art audio, lighting, and technology systems.' },
  { title: 'Customizable Spaces', desc: 'Flexible venue configurations to match any event size or theme.' },
]

const events = [
  { name: 'Weddings', icon: '💒', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600' },
  { name: 'Receptions', icon: '🥂', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600' },
  { name: 'Engagements', icon: '💍', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600' },
  { name: 'Birthday Parties', icon: '🎂', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600' },
  { name: 'Corporate Events', icon: '👔', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600' },
  { name: 'Family Functions', icon: '👨‍👩‍👧‍👦', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600' },
]

const packages = [
  { name: 'Basic', price: '₹75,000', guests: '200', color: 'border-gray-200', badge: '', features: ['Hall Decoration', 'Basic Catering', 'Sound System', 'Lighting', 'Parking'] },
  { name: 'Standard', price: '₹1,50,000', guests: '500', color: 'border-gold-500', badge: 'Most Popular', features: ['Premium Decoration', 'Veg & Non-Veg Catering', 'DJ & Sound', 'Photography 8hrs', 'Bridal Room', 'Generator'] },
  { name: 'Premium', price: '₹3,00,000', guests: '1000', color: 'border-purple-400', badge: 'Ultimate', features: ['Luxury Decoration', 'Multi-Cuisine Catering', 'Live Music & DJ', 'Photography + Videography', 'Bridal Suite 2 Nights', 'Event Manager'] },
]

const testimonials = [
  { name: 'Priya & Rahul Sharma', event: 'Wedding', rating: 5, text: 'Absolutely breathtaking venue! Our wedding was a dream come true. Every guest complimented the spectacular setting and service.' },
  { name: 'Amit & Pooja Gupta', event: 'Reception', rating: 5, text: 'The Royal Palace truly lives up to its name. The hall was magnificent, food was amazing, and the service was top-notch.' },
  { name: 'Sunita Verma', event: 'Birthday Party', rating: 5, text: 'We hosted my mother\'s 60th birthday here and it was spectacular. The garden setup was beautiful and the catering was excellent.' },
]

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroSlides[0].image} alt="Royal Palace Wedding Venue" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-gold-400 text-sm md:text-base tracking-[0.3em] uppercase font-body mb-4 animate-fade-in">✦ Royal Palace Marriage Hall & Garden ✦</p>
          <h1 className="text-white text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 animate-slide-up">
            Where Dreams<br /><span className="text-gradient">Become Memories</span>
          </h1>
          <p className="text-white/80 text-xl font-body max-w-2xl mx-auto mb-10 animate-fade-in">
            An exquisite venue for your most cherished celebrations — from grand weddings to intimate family functions
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
            <Link href="/booking" className="px-10 py-4 gold-gradient text-white font-semibold rounded-full font-body hover:shadow-2xl hover:shadow-gold-500/40 transition-all hover:scale-105 text-lg">
              Book Your Date
            </Link>
            <Link href="/gallery" className="px-10 py-4 border-2 border-white text-white font-semibold rounded-full font-body hover:bg-white hover:text-charcoal transition-all text-lg">
              View Gallery
            </Link>
          </div>
          <div className="flex justify-center gap-8 mt-14">
            {[['#1', 'Trending Venue'], ['100%', 'Fully Equipped'], ['50+', 'Events/Year']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-serif text-gold-400 font-bold">{val}</div>
                <div className="text-white/70 text-xs font-body tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {highlights.map(({ icon: Icon, value, label, desc }) => (
              <div key={label} className="text-center group">
                <div className="w-14 h-14 gold-gradient rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="text-white" size={24} />
                </div>
                <div className="text-2xl font-serif text-gold-400 font-bold">{value}</div>
                <div className="text-white text-sm font-semibold font-body">{label}</div>
                <div className="text-gray-400 text-xs font-body">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events We Host */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-gold-600 text-sm tracking-widest uppercase font-body mb-2">What We Celebrate</p>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">Events We Host</h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {events.map(event => (
              <div key={event.name} className="relative group overflow-hidden rounded-2xl card-hover cursor-pointer">
                <div className="aspect-[4/3] relative">
                  <img src={event.image} alt={event.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-3xl mb-1">{event.icon}</div>
                  <h3 className="text-white text-xl font-serif font-semibold">{event.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600" alt="Venue" className="rounded-2xl w-full h-64 object-cover" />
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600" alt="Hall" className="rounded-2xl w-full h-64 object-cover mt-8" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-charcoal text-white p-6 rounded-2xl shadow-2xl">
                <div className="text-4xl font-serif text-gold-400 font-bold">20+</div>
                <div className="text-sm font-body">Years of Excellence</div>
              </div>
            </div>
            <div>
              <p className="text-gold-600 text-sm tracking-widest uppercase font-body mb-2">Our Story</p>
              <h2 className="text-4xl font-serif text-charcoal mb-4">Why Choose Royal Palace?</h2>
              <div className="section-divider mb-8 ml-0" style={{margin: '0 0 2rem 0'}} />
              <p className="text-gray-600 font-body leading-relaxed mb-8">
                For over two decades, Royal Palace Marriage Hall has been the preferred venue for families seeking an exceptional setting for their most precious moments. Our commitment to excellence ensures every event is flawlessly executed.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyUs.map(({ title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <div className="w-8 h-8 gold-gradient rounded-lg flex items-center justify-center shrink-0">
                      <Award size={14} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal text-sm font-body">{title}</h4>
                      <p className="text-gray-500 text-xs font-body mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 mt-8 px-6 py-3 border-2 border-gold-500 text-gold-600 rounded-full font-body font-semibold hover:bg-gold-500 hover:text-white transition-all">
                Learn More <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Preview */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-gold-600 text-sm tracking-widest uppercase font-body mb-2">Plans & Pricing</p>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">Our Packages</h2>
            <div className="section-divider" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.name} className={`bg-white rounded-2xl p-8 border-2 ${pkg.color} card-hover relative`}>
                {pkg.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 gold-gradient text-white text-xs font-semibold rounded-full">
                    {pkg.badge}
                  </div>
                )}
                <h3 className="text-2xl font-serif text-charcoal mb-1">{pkg.name} Package</h3>
                <div className="text-3xl font-bold text-gold-600 mb-1 font-serif">{pkg.price}</div>
                <p className="text-gray-500 text-sm font-body mb-5">Up to {pkg.guests} guests</p>
                <ul className="space-y-2 mb-8">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm font-body text-gray-600">
                      <span className="text-gold-500">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/booking" className="block text-center px-6 py-3 gold-gradient text-white rounded-full font-body font-semibold hover:shadow-lg transition-all">
                  Book This Package
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/packages" className="inline-flex items-center gap-2 text-gold-600 font-body hover:underline">
              View Full Package Details <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-gold-400 text-sm tracking-widest uppercase font-body mb-2">Our Gallery</p>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Moments We've Captured</h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
              'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600',
              'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600',
              'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600',
              'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600',
              'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600',
              'https://images.unsplash.com/photo-1470753937643-efeb931202a9?w=600',
              'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600',
            ].map((src, i) => (
              <div key={i} className={`relative overflow-hidden rounded-xl group ${i === 0 || i === 5 ? 'row-span-2' : ''}`}>
                <img src={src} alt={`Gallery ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/gallery" className="px-8 py-3 border-2 border-gold-500 text-gold-400 rounded-full font-body font-semibold hover:bg-gold-500 hover:text-white transition-all">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-gold-600 text-sm tracking-widest uppercase font-body mb-2">Client Stories</p>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">What Our Clients Say</h2>
            <div className="section-divider" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gold-100 card-hover">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} className="text-gold-500 fill-gold-500" />)}
                </div>
                <p className="text-gray-600 font-body leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal font-body text-sm">{t.name}</div>
                    <div className="text-gold-600 text-xs font-body">{t.event}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/reviews" className="inline-flex items-center gap-2 text-gold-600 font-body hover:underline">
              Read All Reviews <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920" alt="CTA Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/80" />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <div className="text-gold-400 text-4xl mb-4">✦</div>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Begin Your Beautiful Journey</h2>
          <p className="text-white/70 font-body text-lg mb-8">
            Check availability for your special date and let us create an unforgettable experience for you and your loved ones.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/availability" className="flex items-center gap-2 px-8 py-4 gold-gradient text-white rounded-full font-body font-semibold hover:shadow-2xl transition-all hover:scale-105">
              <Calendar size={18} /> Check Availability
            </Link>
            <Link href="/contact" className="flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full font-body font-semibold hover:bg-white hover:text-charcoal transition-all">
              <Phone size={18} /> Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
