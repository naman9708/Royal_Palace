import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      {/* CTA Band */}
      <div className="gold-gradient py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-white mb-2">Ready to Plan Your Dream Event?</h2>
          <p className="text-white/80 font-body mb-6">Contact us today and let us make your special day unforgettable</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/booking" className="px-8 py-3 bg-white text-gold-700 font-semibold rounded-full font-body hover:shadow-lg transition-all">
              Book Now
            </Link>
            <a href="tel:+919876543210" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full font-body hover:bg-white hover:text-gold-700 transition-all">
              Call Us
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-serif text-gold-400 mb-1">Royal Palace</h3>
          <p className="text-gold-500 text-xs tracking-widest uppercase font-body mb-4">Marriage Hall & Garden</p>
          <p className="text-gray-400 text-sm font-body leading-relaxed mb-5">
            Creating timeless memories for your most cherished celebrations since 2005. Your dream venue awaits.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
              { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
              { icon: Youtube, href: '#', color: 'hover:text-red-400' },
              { icon: MessageCircle, href: 'https://wa.me/918434095831', color: 'hover:text-green-400' },
            ].map(({ icon: Icon, href, color }, idx) => (
              <a key={`${href}-${idx}`} href={href} target="_blank" rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 ${color} border-transparent transition-all hover:border-current`}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-serif text-lg mb-4 after:block after:w-8 after:h-0.5 after:bg-gold-500 after:mt-2">Quick Links</h4>
          <ul className="space-y-2">
            {[['/', 'Home'], ['/about', 'About Us'], ['/venue', 'Venue Details'], ['/gallery', 'Gallery'], ['/packages', 'Packages'], ['/availability', 'Check Availability'], ['/booking', 'Book Now'], ['/contact', 'Contact Us']].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-gray-400 text-sm font-body hover:text-gold-400 transition-colors flex items-center gap-1">
                  <span className="text-gold-600 text-xs">›</span>{label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-serif text-lg mb-4 after:block after:w-8 after:h-0.5 after:bg-gold-500 after:mt-2">Our Services</h4>
          <ul className="space-y-2">
            {['Weddings', 'Receptions', 'Engagements', 'Birthday Parties', 'Anniversary Celebrations', 'Corporate Events', 'Family Functions', 'Catering Services'].map(s => (
              <li key={s} className="text-gray-400 text-sm font-body flex items-center gap-1">
                <span className="text-gold-600 text-xs">›</span>{s}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-serif text-lg mb-4 after:block after:w-8 after:h-0.5 after:bg-gold-500 after:mt-2">Contact Us</h4>
          <div className="space-y-4">
            <div className="flex gap-3">
              <MapPin size={18} className="text-gold-500 shrink-0 mt-0.5" />
              <p className="text-gray-400 text-sm font-body">Royal Palace, Kedar Chowk, Lal Ganj Road, Hajipur, Vaishali - 844103, Bihar, India</p>
            </div>
            <div className="flex gap-3">
              <Phone size={18} className="text-gold-500 shrink-0" />
              <div>
                <a href="tel:+918434095831" className="text-gray-400 text-sm font-body hover:text-gold-400 block">+91 84340 95831</a>
                <a href="tel:+919876543211" className="text-gray-400 text-sm font-body hover:text-gold-400 block">+91 98765 43211</a>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail size={18} className="text-gold-500 shrink-0" />
              <a href="mailto:info@royalpalace.com" className="text-gray-400 text-sm font-body hover:text-gold-400">info@royalpalace.com</a>
            </div>
          </div>
          <div className="mt-5 p-3 bg-white/5 rounded-lg border border-gray-700">
            <p className="text-gray-300 text-xs font-body font-semibold mb-1">Business Hours</p>
            <p className="text-gray-400 text-xs font-body">Mon - Sun: 9:00 AM - 9:00 PM</p>
            <p className="text-gray-400 text-xs font-body">Inquiries: 24/7</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-sm font-body">© 2024 Royal Palace Marriage Hall. All rights reserved.</p>
          <div className="flex gap-4 text-xs font-body text-gray-500">
            <Link href="/privacy" className="hover:text-gold-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-400">Terms of Service</Link>
            <Link href="/faq" className="hover:text-gold-400">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
