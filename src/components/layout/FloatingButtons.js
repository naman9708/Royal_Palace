'use client'
import { Phone, MessageCircle } from 'lucide-react'

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a href="https://wa.me/918434095831?text=Hello%2C%20I%20am%20interested%20in%20booking%20your%20venue"
        target="_blank" rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-all hover:scale-110 group"
        title="Chat on WhatsApp">
        <MessageCircle className="text-white" size={26} />
        <span className="absolute right-16 bg-white text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>
      {/* Call */}
      <a href="tel:+918434095831"
        className="w-14 h-14 gold-gradient rounded-full flex items-center justify-center shadow-2xl hover:shadow-gold-500/50 transition-all hover:scale-110 group"
        title="Call Us">
        <Phone className="text-white" size={22} />
        <span className="absolute right-16 bg-white text-gold-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          +91 84340 95831
        </span>
      </a>
    </div>
  )
}
