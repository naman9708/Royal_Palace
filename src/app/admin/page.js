export const dynamic = 'force-dynamic'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CalendarDays, Users, DollarSign, Clock, TrendingUp, CheckCircle } from 'lucide-react'

export default async function AdminDashboard() {
  const [totalBookings, pendingBookings, confirmedBookings, totalCustomers, revenue, recentBookings, upcomingEvents] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.booking.count({ where: { status: 'CONFIRMED' } }),
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'COMPLETED' } }),
    prisma.booking.findMany({ take: 8, orderBy: { createdAt: 'desc' }, include: { package: true } }),
    prisma.booking.findMany({ where: { eventDate: { gte: new Date() }, status: { in: ['CONFIRMED', 'PENDING'] } }, take: 5, orderBy: { eventDate: 'asc' }, include: { package: true } }),
  ])

  const statCards = [
    { icon: CalendarDays, label: 'Total Bookings', value: totalBookings, sub: 'All time', color: 'bg-blue-50 text-blue-600' },
    { icon: Clock, label: 'Pending', value: pendingBookings, sub: 'Awaiting confirmation', color: 'bg-yellow-50 text-yellow-600' },
    { icon: CheckCircle, label: 'Confirmed', value: confirmedBookings, sub: 'Active bookings', color: 'bg-green-50 text-green-600' },
    { icon: Users, label: 'Customers', value: totalCustomers, sub: 'Registered users', color: 'bg-purple-50 text-purple-600' },
    { icon: DollarSign, label: 'Revenue', value: `₹${((revenue._sum.amount || 0) / 100000).toFixed(1)}L`, sub: 'Total collected', color: 'bg-gold-50 text-gold-600' },
    { icon: TrendingUp, label: 'Upcoming', value: upcomingEvents.length, sub: 'Next events', color: 'bg-rose-50 text-rose-600' },
  ]

  const statusColors = { PENDING: 'badge-pending', CONFIRMED: 'badge-confirmed', REJECTED: 'badge-rejected', COMPLETED: 'badge-completed', CANCELLED: 'badge-cancelled' }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-charcoal">Admin Dashboard</h1>
        <p className="text-gray-500 font-body mt-1">Overview of all bookings and operations</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {statCards.map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={20} />
            </div>
            <div className="text-3xl font-bold text-charcoal font-serif">{value}</div>
            <div className="text-charcoal font-semibold font-body text-sm">{label}</div>
            <div className="text-gray-400 text-xs font-body">{sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-serif text-charcoal">Recent Bookings</h2>
            <a href="/admin/bookings" className="text-gold-600 text-sm font-body hover:underline">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 font-body">
                <tr>
                  {['Booking #', 'Customer', 'Event', 'Date', 'Status'].map(h => (
                    <th key={h} className="px-4 py-3 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold font-body text-charcoal">{b.bookingNumber}</td>
                    <td className="px-4 py-3 font-body text-gray-600">{b.customerName}</td>
                    <td className="px-4 py-3 font-body text-gray-600">{b.eventType}</td>
                    <td className="px-4 py-3 font-body text-gray-600">{new Date(b.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[b.status]}`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-serif text-charcoal">Upcoming Events</h2>
          </div>
          <div className="p-4 space-y-3">
            {upcomingEvents.length === 0 ? (
              <p className="text-gray-400 font-body text-sm text-center py-6">No upcoming events</p>
            ) : upcomingEvents.map(b => (
              <div key={b.id} className="p-3 rounded-xl bg-gold-50 border border-gold-200">
                <p className="font-semibold text-charcoal font-body text-sm">{b.customerName}</p>
                <p className="text-gold-700 text-xs font-body">{b.eventType}</p>
                <p className="text-gray-500 text-xs font-body mt-1">{new Date(b.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
