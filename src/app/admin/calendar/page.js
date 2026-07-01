'use client'
import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { ChevronLeft, ChevronRight, Lock, Unlock } from 'lucide-react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function AdminCalendarPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [data, setData] = useState({ bookings: [], blockedDates: [] })
  const [loading, setLoading] = useState(false)
  const [blockReason, setBlockReason] = useState('')
  const [selectedDay, setSelectedDay] = useState(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    fetch(`/api/availability?year=${year}&month=${month}`)
      .then(r => r.json())
      .then(d => setData(d))
      .finally(() => setLoading(false))
  }, [year, month])

  useEffect(() => { fetchData() }, [fetchData])

  const prevMonth = () => { if (month === 1) { setMonth(12); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 12) { setMonth(1); setYear(y => y + 1) } else setMonth(m => m + 1) }

  const getDayStatus = (day) => {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const isBlocked = data.blockedDates?.some(b => new Date(b.date).toISOString().startsWith(dateStr))
    if (isBlocked) return 'blocked'
    const booking = data.bookings?.find(b => new Date(b.eventDate).toISOString().startsWith(dateStr))
    if (booking) return booking.status === 'CONFIRMED' ? 'confirmed' : 'pending'
    return 'available'
  }

  const handleDayClick = (day) => {
    const status = getDayStatus(day)
    setSelectedDay({ day, status })
    setBlockReason('')
  }

  const blockDate = async () => {
    if (!selectedDay) return
    const date = `${year}-${String(month).padStart(2, '0')}-${String(selectedDay.day).padStart(2, '0')}`
    try {
      await fetch('/api/availability', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ date, reason: blockReason }) })
      toast.success('Date blocked')
      setSelectedDay(null)
      fetchData()
    } catch { toast.error('Failed to block date') }
  }

  const unblockDate = async () => {
    if (!selectedDay) return
    const date = `${year}-${String(month).padStart(2, '0')}-${String(selectedDay.day).padStart(2, '0')}`
    try {
      await fetch('/api/availability', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ date }) })
      toast.success('Date unblocked')
      setSelectedDay(null)
      fetchData()
    } catch { toast.error('Failed to unblock date') }
  }

  const days = new Date(year, month, 0).getDate()
  const firstDay = new Date(year, month - 1, 1).getDay()

  const colorMap = {
    available: 'bg-green-50 hover:bg-green-100 border-green-200 text-green-800 cursor-pointer',
    confirmed: 'bg-red-50 border-red-200 text-red-700',
    pending: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    blocked: 'bg-gray-200 border-gray-300 text-gray-500',
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-serif text-charcoal mb-6">Calendar Management</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="gold-gradient px-6 py-4 flex items-center justify-between">
            <button onClick={prevMonth} className="text-white hover:bg-white/20 p-2 rounded-lg"><ChevronLeft size={20} /></button>
            <h2 className="text-white text-xl font-serif font-semibold">{MONTHS[month - 1]} {year}</h2>
            <button onClick={nextMonth} className="text-white hover:bg-white/20 p-2 rounded-lg"><ChevronRight size={20} /></button>
          </div>
          <div className="grid grid-cols-7 border-b border-gray-100">
            {DAYS.map(d => <div key={d} className="text-center text-xs font-semibold text-gray-500 font-body py-3">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1 p-3">
            {[...Array(firstDay)].map((_, i) => <div key={`e${i}`} />)}
            {[...Array(days)].map((_, i) => {
              const day = i + 1
              const status = getDayStatus(day)
              const cls = colorMap[status]
              return (
                <div key={day} onClick={() => handleDayClick(day)}
                  className={`aspect-square flex items-center justify-center rounded-xl text-sm font-body border transition-all ${cls} ${selectedDay?.day === day ? 'ring-2 ring-gold-500' : ''}`}>
                  {day}
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-serif text-charcoal mb-4">Legend</h3>
            <div className="space-y-2">
              {[['bg-green-50 border-green-200', 'Available'], ['bg-red-50 border-red-200', 'Confirmed Booking'], ['bg-yellow-50 border-yellow-200', 'Pending Booking'], ['bg-gray-200 border-gray-300', 'Blocked']].map(([cls, label]) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded border ${cls}`} />
                  <span className="text-sm font-body text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {selectedDay && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-serif text-charcoal mb-3">{selectedDay.day} {MONTHS[month - 1]}</h3>
              <p className="text-sm font-body text-gray-600 mb-4">
                Status: <span className="font-semibold capitalize">{selectedDay.status}</span>
              </p>
              {selectedDay.status === 'available' && (
                <div className="space-y-3">
                  <input value={blockReason} onChange={e => setBlockReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold-400"
                    placeholder="Reason (optional)" />
                  <button onClick={blockDate} className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-500 text-white rounded-xl text-sm font-body font-semibold hover:bg-red-600 transition-colors">
                    <Lock size={16} /> Block Date
                  </button>
                </div>
              )}
              {selectedDay.status === 'blocked' && (
                <button onClick={unblockDate} className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-500 text-white rounded-xl text-sm font-body font-semibold hover:bg-green-600 transition-colors">
                  <Unlock size={16} /> Unblock Date
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
