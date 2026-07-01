'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { CheckCircle, Loader2 } from 'lucide-react'

const eventTypes = [
  { value: 'WEDDING', label: 'Wedding' },
  { value: 'RECEPTION', label: 'Reception' },
  { value: 'ENGAGEMENT', label: 'Engagement' },
  { value: 'BIRTHDAY', label: 'Birthday Party' },
  { value: 'ANNIVERSARY', label: 'Anniversary' },
  { value: 'CORPORATE', label: 'Corporate Event' },
  { value: 'FAMILY_FUNCTION', label: 'Family Function' },
  { value: 'OTHER', label: 'Other' },
]

function BookingForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [form, setForm] = useState({
    customerName: session?.user?.name || '',
    customerEmail: session?.user?.email || '',
    customerPhone: '',
    eventType: 'WEDDING',
    eventDate: searchParams.get('date') || '',
    numberOfGuests: '',
    packageId: searchParams.get('package') || '',
    specialRequests: '',
  })

  useEffect(() => {
    fetch('/api/packages').then(r => r.json()).then(d => setPackages(d.packages || []))
  }, [])

  useEffect(() => {
    if (session?.user) {
      setForm(f => ({ ...f, customerName: session.user.name || '', customerEmail: session.user.email || '' }))
    }
  }, [session])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.customerName || !form.customerEmail || !form.customerPhone || !form.eventDate || !form.numberOfGuests) {
      toast.error('Please fill all required fields')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Booking failed')
      setSuccess(data.booking)
      toast.success('Booking request submitted successfully!')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-gold-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-serif text-charcoal mb-3">Booking Submitted!</h2>
          <p className="text-gray-600 font-body mb-2">Your booking request has been received.</p>
          <div className="bg-gold-50 rounded-xl p-4 my-6 border border-gold-200">
            <p className="text-sm font-body text-gray-600">Booking Number</p>
            <p className="text-2xl font-bold text-gold-700 font-serif">{success.bookingNumber}</p>
          </div>
          <p className="text-gray-500 font-body text-sm mb-8">Our team will confirm your booking within 24 hours. A confirmation email has been sent to {success.customerEmail}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="px-6 py-3 bg-charcoal text-white rounded-full font-body font-semibold hover:bg-gray-800 transition-colors">Go Home</Link>
            {session && <Link href="/dashboard" className="px-6 py-3 gold-gradient text-white rounded-full font-body font-semibold hover:shadow-lg transition-all">View Dashboard</Link>}
          </div>
        </div>
      </div>
    )
  }

  const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent bg-white"
  const labelCls = "block text-sm font-semibold font-body text-charcoal mb-1.5"

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gold-100">
        <div className="text-center mb-10">
          <p className="text-gold-600 text-sm tracking-widest uppercase font-body mb-2">Reserve Your Date</p>
          <h2 className="text-3xl font-serif text-charcoal">Booking Request Form</h2>
          <div className="section-divider mt-4" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>Full Name <span className="text-red-500">*</span></label>
              <input name="customerName" value={form.customerName} onChange={handleChange} className={inputCls} placeholder="Your full name" required />
            </div>
            <div>
              <label className={labelCls}>Mobile Number <span className="text-red-500">*</span></label>
              <input name="customerPhone" value={form.customerPhone} onChange={handleChange} className={inputCls} placeholder="+91 98765 43210" required />
            </div>
          </div>

          <div>
            <label className={labelCls}>Email Address <span className="text-red-500">*</span></label>
            <input name="customerEmail" type="email" value={form.customerEmail} onChange={handleChange} className={inputCls} placeholder="your@email.com" required />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>Event Type <span className="text-red-500">*</span></label>
              <select name="eventType" value={form.eventType} onChange={handleChange} className={inputCls} required>
                {eventTypes.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Event Date <span className="text-red-500">*</span></label>
              <input name="eventDate" type="date" value={form.eventDate} onChange={handleChange} className={inputCls} min={new Date().toISOString().split('T')[0]} required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>Number of Guests <span className="text-red-500">*</span></label>
              <input name="numberOfGuests" type="number" value={form.numberOfGuests} onChange={handleChange} className={inputCls} placeholder="Expected guest count" min="1" max="1000" required />
            </div>
            <div>
              <label className={labelCls}>Package (Optional)</label>
              <select name="packageId" value={form.packageId} onChange={handleChange} className={inputCls}>
                <option value="">Select a package</option>
                {packages.map(p => <option key={p.id} value={p.id}>{p.name} - ₹{p.price.toLocaleString('en-IN')}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Special Requirements</label>
            <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} className={inputCls} rows={4} placeholder="Any special requests, dietary requirements, or notes..." />
          </div>

          <div className="bg-gold-50 rounded-xl p-4 border border-gold-200">
            <p className="text-sm font-body text-gray-600">📋 <strong>Note:</strong> An advance payment of 30% is required to confirm your booking. Our team will contact you within 24 hours to confirm availability and payment details.</p>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 gold-gradient text-white rounded-full font-body font-semibold text-lg hover:shadow-xl hover:shadow-gold-500/30 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? <><Loader2 size={20} className="animate-spin" /> Submitting...</> : 'Submit Booking Request'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <div>
      <section className="relative h-48 flex items-center justify-center bg-charcoal">
        <div className="text-center">
          <p className="text-gold-400 text-sm tracking-widest uppercase font-body mb-2">Reserve Your Date</p>
          <h1 className="text-white text-5xl font-serif font-bold">Book The Venue</h1>
        </div>
      </section>
      <div className="bg-ivory py-10">
        <Suspense fallback={<div className="text-center py-20 font-body text-gray-500">Loading...</div>}>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  )
}
