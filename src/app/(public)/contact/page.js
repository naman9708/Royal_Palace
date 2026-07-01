'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.email || !form.message) {
      toast.error('Please fill all fields')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSent(true)
      toast.success('Message sent successfully!')
    } catch {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white"

  return (
    <div>
      <section className="relative h-72 flex items-center justify-center bg-charcoal">
        <div className="text-center">
          <p className="text-gold-400 text-sm tracking-widest uppercase font-body mb-2">Get In Touch</p>
          <h1 className="text-white text-5xl font-serif font-bold">Contact Us</h1>
        </div>
      </section>

      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-serif text-charcoal mb-3">Let's Talk</h2>
            <div className="section-divider mb-8" style={{margin: '0 0 2rem 0'}} />
            <p className="text-gray-600 font-body leading-relaxed mb-8">
              We'd love to hear from you. Whether you're looking to book our venue, have questions about our services, or want to schedule a site visit, our team is here to help.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { icon: MapPin, label: 'Address', value: '123 Palace Road, Near City Centre\nYour City - 400001, Maharashtra, India' },
                { icon: Phone, label: 'Phone', value: '+91 98765 43210\n+91 98765 43211' },
                { icon: Mail, label: 'Email', value: 'info@royalpalace.com\nbookings@royalpalace.com' },
                { icon: Clock, label: 'Business Hours', value: 'Monday - Sunday: 9:00 AM - 9:00 PM\nInquiries: 24/7' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-12 h-12 gold-gradient rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal font-body text-sm mb-0.5">{label}</p>
                    <p className="text-gray-600 font-body text-sm whitespace-pre-line">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-gold-100 shadow-sm h-64 bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-gold-500 mx-auto mb-2" />
                <p className="font-body text-gray-600 text-sm">123 Palace Road, Your City</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                  className="mt-2 inline-block text-gold-600 text-sm font-body hover:underline">
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gold-100">
            {sent ? (
              <div className="text-center py-10">
                <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-serif text-charcoal mb-2">Message Sent!</h3>
                <p className="text-gray-600 font-body">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', phone: '', email: '', message: '' }) }}
                  className="mt-6 px-6 py-2.5 gold-gradient text-white rounded-full font-body text-sm font-semibold">
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-serif text-charcoal mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} className={inputCls} placeholder="Your name" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">Phone *</label>
                      <input name="phone" value={form.phone} onChange={handleChange} className={inputCls} placeholder="+91 98765 43210" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} className={inputCls} placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} className={inputCls} rows={5} placeholder="How can we help you?" required />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full py-3.5 gold-gradient text-white rounded-full font-body font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                    {loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <><Send size={18} /> Send Message</>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
