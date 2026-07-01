'use client'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true)
      fetch(`/api/admin/customers?search=${search}`)
        .then(r => r.json())
        .then(d => setCustomers(d.customers || []))
        .finally(() => setLoading(false))
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-serif text-charcoal mb-6">Customer Management</h1>
      <div className="relative mb-6 max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold-400"
          placeholder="Search customers..." />
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 font-body">
              <tr>{['Name', 'Email', 'Phone', 'Bookings', 'Joined'].map(h => <th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-10 text-gray-400 font-body">Loading...</td></tr>
              ) : customers.map(c => (
                <tr key={c.id} onClick={() => setSelected(c)} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-4 py-3 font-semibold font-body text-charcoal">{c.name}</td>
                  <td className="px-4 py-3 font-body text-gray-600 text-xs">{c.email}</td>
                  <td className="px-4 py-3 font-body text-gray-600 text-xs">{c.phone || '-'}</td>
                  <td className="px-4 py-3 font-body text-gray-600">{c.bookings?.length || 0}</td>
                  <td className="px-4 py-3 font-body text-gray-500 text-xs">{new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selected && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
              <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center text-white font-bold text-lg">{selected.name?.[0]}</div>
              <div>
                <h3 className="font-serif text-charcoal">{selected.name}</h3>
                <p className="text-xs font-body text-gray-500">{selected.email}</p>
              </div>
            </div>
            <h4 className="font-serif text-charcoal mb-3">Booking History</h4>
            <div className="space-y-2">
              {selected.bookings?.length === 0 ? (
                <p className="text-gray-400 font-body text-sm">No bookings</p>
              ) : selected.bookings?.map(b => (
                <div key={b.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold font-body text-xs text-charcoal">{b.bookingNumber}</p>
                  <p className="text-xs font-body text-gray-500">{b.eventType} • {new Date(b.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${b.status === 'CONFIRMED' ? 'badge-confirmed' : b.status === 'PENDING' ? 'badge-pending' : 'badge-cancelled'}`}>{b.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
