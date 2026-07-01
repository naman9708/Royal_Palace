'use client'
import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const fallbackFaqs = [
  { id: '1', question: 'How do I book the venue?', answer: 'You can book our venue by filling the booking form on our website, calling us directly, or visiting us in person. We recommend booking at least 3-6 months in advance for popular dates.', category: 'Booking' },
  { id: '2', question: 'What is the advance payment required?', answer: 'We require 30% of the total package amount as advance to confirm your booking. The remaining amount can be paid 7 days before the event date.', category: 'Payment' },
  { id: '3', question: 'Can I cancel my booking?', answer: 'Yes, cancellations are allowed. If cancelled 30+ days before event: 50% refund. If cancelled 15-30 days before: 25% refund. If cancelled less than 15 days before: No refund.', category: 'Cancellation' },
  { id: '4', question: 'Do you provide catering services?', answer: 'Yes, we offer in-house catering services with a variety of vegetarian and non-vegetarian options. We can customize menus based on your preferences and dietary requirements. Outside catering is also permitted with prior approval.', category: 'Catering' },
  { id: '5', question: 'Is decoration included in the packages?', answer: 'Yes, all our packages include decoration. The extent of decoration varies by package - Basic includes standard hall decoration, Standard includes premium hall and garden decoration, and Premium includes luxury decoration with floral arrangements.', category: 'Decoration' },
  { id: '6', question: 'How many cars can be parked?', answer: 'Our venue has ample parking space for 200+ vehicles. We have dedicated parking attendants to manage vehicles efficiently. Valet parking is available with our Premium Package.', category: 'Parking' },
  { id: '7', question: 'How do I check availability for my preferred date?', answer: "You can check availability on our Availability page which shows a real-time calendar. Green dates are available, red are booked, and yellow are pending. You can also call us directly to verify.", category: 'Availability' },
  { id: '8', question: 'Do you have AC facilities?', answer: 'Yes, our main hall is fully air-conditioned with modern HVAC systems. The garden area is naturally open but we can arrange air-cooled tents during summer months on request.', category: 'Facilities' },
  { id: '9', question: 'Is there a generator backup?', answer: 'Absolutely! We have 100% power backup with industrial-grade generators to ensure your event is never disrupted by power cuts. The backup kicks in automatically within seconds.', category: 'Facilities' },
  { id: '10', question: 'Can we bring our own DJ?', answer: 'Yes, you can bring your own DJ or entertainment. Our venue has a professional sound and lighting infrastructure. We charge a nominal setup fee for external DJs. Please inform us in advance.', category: 'Services' },
]

export default function FAQPage() {
  const [faqs, setFaqs] = useState(fallbackFaqs)
  const [open, setOpen] = useState(null)
  const [category, setCategory] = useState('All')

  useEffect(() => {
    fetch('/api/faqs').then(r => r.json()).then(d => { if (d.faqs?.length) setFaqs(d.faqs) }).catch(() => {})
  }, [])

  const categories = ['All', ...new Set(faqs.map(f => f.category).filter(Boolean))]
  const filtered = category === 'All' ? faqs : faqs.filter(f => f.category === category)

  return (
    <div>
      <section className="relative h-72 flex items-center justify-center bg-charcoal">
        <div className="text-center">
          <p className="text-gold-400 text-sm tracking-widest uppercase font-body mb-2">Got Questions?</p>
          <h1 className="text-white text-5xl font-serif font-bold">FAQ</h1>
        </div>
      </section>

      <section className="py-16 bg-ivory">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif text-charcoal mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600 font-body">Everything you need to know before booking</p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-body transition-all ${category === cat ? 'gold-gradient text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gold-300'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <div key={faq.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left">
                  <span className="font-semibold text-charcoal font-body text-sm pr-4">{faq.question}</span>
                  <ChevronDown size={18} className={`text-gold-500 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
                </button>
                {open === i && (
                  <div className="px-6 pb-5 border-t border-gray-50">
                    <p className="text-gray-600 font-body text-sm leading-relaxed pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-charcoal rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-serif text-white mb-2">Still have questions?</h3>
            <p className="text-gray-400 font-body text-sm mb-5">Our team is happy to help you with any queries.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+919876543210" className="px-6 py-2.5 gold-gradient text-white rounded-full font-body font-semibold text-sm hover:shadow-lg transition-all">
                📞 Call Us
              </a>
              <a href="https://wa.me/919876543210" className="px-6 py-2.5 bg-green-500 text-white rounded-full font-body font-semibold text-sm hover:bg-green-600 transition-all">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
