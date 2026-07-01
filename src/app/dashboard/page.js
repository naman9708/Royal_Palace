export const dynamic = 'force-dynamic'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { CalendarDays, Clock, CheckCircle, XCircle } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { package: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'PENDING').length,
    confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
    completed: bookings.filter(b => b.status === 'COMPLETED').length,
  }

  const statusColors = { PENDING: 'badge-pending', CONFIRMED: 'badge-confirmed', REJECTED: 'badge-rejected', COMPLETED: 'badge-completed', CANCELLED: 'badge-cancelled' }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-charcoal">Welcome back, {session.user.name?.split(' ')[0]}!</h1>
        <p className="text-gray-500 font-body mt-1">Manage your bookings and profile</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[
          { icon: CalendarDays, label: 'Total Bookings', value: stats.total, color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: Clock, label: 'Pending', value: stats.pending, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { icon: CheckCircle, label: 'Confirmed', value: stats.confirmed, color: 'text-green-600', bg: 'bg-green-50' },
          { icon: CheckCircle, label: 'Completed', value: stats.completed, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <div className="text-2xl font-bold text-charcoal font-serif">{value}</div>
            <div className="text-gray-500 text-sm font-body">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-serif text-charcoal">Recent Bookings</h2>
          <Link href="/dashboard/bookings" className="text-gold-600 text-sm font-body hover:underline">View All</Link>
        </div>
        {bookings.length === 0 ? (
          <div className="py-16 text-center">
            <CalendarDays size={48} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-body">No bookings yet</p>
            <Link href="/booking" className="mt-4 inline-block px-6 py-2 gold-gradient text-white rounded-full text-sm font-body font-semibold">
              Book Now
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase font-body">
                <tr>
                  {['Booking #', 'Event', 'Date', 'Guests', 'Package', 'Status'].map(h => (
                    <th key={h} className="px-5 py-3 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-body text-sm font-semibold text-charcoal">{b.bookingNumber}</td>
                    <td className="px-5 py-3 font-body text-sm text-gray-600">{b.eventType}</td>
                    <td className="px-5 py-3 font-body text-sm text-gray-600">{new Date(b.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td className="px-5 py-3 font-body text-sm text-gray-600">{b.numberOfGuests}</td>
                    <td className="px-5 py-3 font-body text-sm text-gray-600">{b.package?.name || 'Custom'}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${statusColors[b.status]}`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
