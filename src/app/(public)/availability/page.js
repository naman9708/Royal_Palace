'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function AvailabilityPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [data, setData] = useState({ bookings: [], blockedDates: [] })
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/availability?year=${year}&month=${month}`)
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [year, month])

  const prevMonth = () => {
    if (month === 1) { setMonth(12); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 12) { setMonth(1); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const getDaysInMonth = () => new Date(year, month, 0).getDate()
  const getFirstDay = () => new Date(year, month - 1, 1).getDay()

  const getStatus = (day) => {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const isBlocked = data.blockedDates?.some(b => new Date(b.date).toISOString().startsWith(dateStr))
    if (isBlocked) return 'blocked'
    const booking = data.bookings?.find(b => new Date(b.eventDate).toISOString().startsWith(dateStr))
    if (booking) return booking.status === 'CONFIRMED' ? 'confirmed' : 'pending'
    const d = new Date(year, month - 1, day)
    if (d < today) return 'past'
    return 'available'
  }

  const days = getDaysInMonth()
  const firstDay = getFirstDay()

  const statusConfig = {
    available: { bg: 'bg-green-50 hover:bg-green-100 border-green-200 text-green-800 cursor-pointer', label: 'Available' },
    confirmed: { bg: 'bg-red-50 border-red-200 text-red-400 cursor-not-allowed', label: 'Booked' },
    pending: { bg: 'bg-yellow-50 border-yellow-200 text-yellow-600 cursor-not-allowed', label: 'Pending' },
    blocked: { bg: 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed', label: 'Unavailable' },
    past: { bg: 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed', label: 'Past' },
  }

  return (
    <div>
      <section className="relative h-72 flex items-center justify-center bg-charcoal">
        <div className="relative z-10 text-center">
          <p className="text-gold-400 text-sm tracking-widest uppercase font-body mb-2">Check Dates</p>
          <h1 className="text-white text-5xl font-serif font-bold">Availability Calendar</h1>
        </div>
      </section>

      <section className="py-16 bg-ivory">
        <div className="max-w-4xl mx-auto px-4">
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[['bg-green-100 border-green-300', 'Available'], ['bg-red-100 border-red-300', 'Booked'], ['bg-yellow-100 border-yellow-300', 'Pending'], ['bg-gray-100 border-gray-300', 'Unavailable']].map(([cls, label]) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded border ${cls}`} />
                <span className="text-sm font-body text-gray-600">{label}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gold-100 overflow-hidden">
            {/* Header */}
            <div className="gold-gradient px-6 py-4 flex items-center justify-between">
              <button onClick={prevMonth} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-white text-xl font-serif font-semibold">{MONTHS[month - 1]} {year}</h2>
              <button onClick={nextMonth} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Days header */}
            <div className="grid grid-cols-7 border-b border-gray-100">
              {DAYS.map(d => (
                <div key={d} className="text-center text-xs font-semibold text-gray-500 font-body py-3">{d}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 p-3">
              {[...Array(firstDay)].map((_, i) => <div key={`e${i}`} />)}
              {[...Array(days)].map((_, i) => {
                const day = i + 1
                const status = getStatus(day)
                const cfg = statusConfig[status]
                const isToday = day === today.getDate() && month === today.getMonth() + 1 && year === today.getFullYear()
                return (
                  <div key={day}
                    onClick={() => status === 'available' && setSelected(`${year}-${month}-${day}`)}
                    className={`aspect-square flex items-center justify-center rounded-xl text-sm font-body border transition-all ${cfg.bg} ${isToday ? 'ring-2 ring-gold-500 font-bold' : ''} ${selected === `${year}-${month}-${day}` ? 'ring-2 ring-gold-600 bg-gold-100' : ''}`}>
                    {day}
                  </div>
                )
              })}
            </div>
          </div>

          {selected && (
            <div className="mt-6 bg-white rounded-xl p-6 border border-gold-200 text-center shadow-sm">
              <CheckCircle className="text-green-500 mx-auto mb-2" size={32} />
              <h3 className="text-xl font-serif text-charcoal mb-1">Date Available!</h3>
              <p className="text-gray-600 font-body mb-4">{new Date(selected).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} is available for booking.</p>
              <Link href={`/booking?date=${selected}`} className="inline-block px-8 py-3 gold-gradient text-white rounded-full font-body font-semibold hover:shadow-lg transition-all">
                Book This Date
              </Link>
            </div>
          )}

          <div className="mt-8 text-center text-gray-500 font-body text-sm">
            <p>📞 For urgent bookings, call us at <a href="tel:+919876543210" className="text-gold-600 font-semibold">+91 98765 43210</a></p>
          </div>
        </div>
      </section>
    </div>
  )
}
