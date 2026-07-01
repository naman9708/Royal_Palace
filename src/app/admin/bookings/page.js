'use client'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Search, Filter } from 'lucide-react'

const statusColors = { PENDING: 'badge-pending', CONFIRMED: 'badge-confirmed', REJECTED: 'badge-rejected', COMPLETED: 'badge-completed', CANCELLED: 'badge-cancelled' }

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/bookings')
      .then(r => r.json())
      .then(d => setBookings(d.bookings || []))
      .catch(() => toast.error('Failed to load bookings'))
      .finally(() => setLoading(false))
  }, [])

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error()
      setBookings(bs => bs.map(b => b.id === id ? { ...b, status } : b))
      toast.success(`Booking ${status.toLowerCase()}`)
    } catch {
      toast.error('Failed to update status')
    }
  }

  const filtered = bookings.filter(b => {
    const matchesFilter = filter === 'ALL' || b.status === filter
    const matchesSearch = !search || b.customerName.toLowerCase().includes(search.toLowerCase()) || b.bookingNumber.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="p-8">
      <h1 className="text-3xl font-serif text-charcoal mb-6">Booking Management</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold-400"
            placeholder="Search by name or booking number..." />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['ALL', 'PENDING', 'CONFIRMED', 'REJECTED', 'COMPLETED', 'CANCELLED'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-xs font-body font-semibold transition-all ${filter === s ? 'bg-charcoal text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gold-300'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 font-body">
              <tr>
                {['Booking #', 'Customer', 'Phone', 'Event', 'Date', 'Guests', 'Package', 'Amount', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={10} className="text-center py-10 text-gray-400 font-body">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={10} className="text-center py-10 text-gray-400 font-body">No bookings found</td></tr>
              ) : filtered.map(b => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold font-body text-charcoal text-xs">{b.bookingNumber}</td>
                  <td className="px-4 py-3 font-body text-gray-700">{b.customerName}</td>
                  <td className="px-4 py-3 font-body text-gray-500 text-xs">{b.customerPhone}</td>
                  <td className="px-4 py-3 font-body text-gray-600">{b.eventType}</td>
                  <td className="px-4 py-3 font-body text-gray-600 text-xs whitespace-nowrap">{new Date(b.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}</td>
                  <td className="px-4 py-3 font-body text-gray-600">{b.numberOfGuests}</td>
                  <td className="px-4 py-3 font-body text-gray-600 text-xs">{b.package?.name || '-'}</td>
                  <td className="px-4 py-3 font-body text-gray-700 text-xs">{b.totalAmount ? `₹${b.totalAmount.toLocaleString('en-IN')}` : '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[b.status]}`}>{b.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {b.status === 'PENDING' && (
                        <>
                          <button onClick={() => updateStatus(b.id, 'CONFIRMED')} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-body hover:bg-green-200">Confirm</button>
                          <button onClick={() => updateStatus(b.id, 'REJECTED')} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-body hover:bg-red-200">Reject</button>
                        </>
                      )}
                      {b.status === 'CONFIRMED' && (
                        <button onClick={() => updateStatus(b.id, 'COMPLETED')} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-body hover:bg-blue-200">Complete</button>
                      )}
                      {(b.status === 'PENDING' || b.status === 'CONFIRMED') && (
                        <button onClick={() => updateStatus(b.id, 'CANCELLED')} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-body hover:bg-gray-200">Cancel</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
