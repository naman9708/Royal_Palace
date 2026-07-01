export const dynamic = 'force-dynamic'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function MyBookingsPage() {
  const session = await getServerSession(authOptions)
  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { package: true, payments: true },
    orderBy: { createdAt: 'desc' },
  })

  const statusColors = { PENDING: 'badge-pending', CONFIRMED: 'badge-confirmed', REJECTED: 'badge-rejected', COMPLETED: 'badge-completed', CANCELLED: 'badge-cancelled' }

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-serif text-charcoal">My Bookings</h1>
        <Link href="/booking" className="px-5 py-2 gold-gradient text-white rounded-full text-sm font-body font-semibold hover:shadow-lg transition-all">
          + New Booking
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
          <p className="text-gray-500 font-body text-lg mb-4">No bookings found</p>
          <Link href="/booking" className="px-8 py-3 gold-gradient text-white rounded-full font-body font-semibold">Book Now</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-serif text-charcoal">{b.bookingNumber}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[b.status]}`}>{b.status}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {[
                      ['Event', b.eventType],
                      ['Date', new Date(b.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })],
                      ['Guests', b.numberOfGuests],
                      ['Package', b.package?.name || 'Custom'],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <p className="text-gray-400 font-body text-xs">{k}</p>
                        <p className="font-semibold text-charcoal font-body">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  {b.totalAmount && (
                    <div>
                      <p className="text-gray-400 font-body text-xs">Total Amount</p>
                      <p className="text-xl font-bold text-gold-600 font-serif">₹{b.totalAmount.toLocaleString('en-IN')}</p>
                    </div>
                  )}
                  {b.status === 'CONFIRMED' && b.advanceAmount && b.advancePaid < b.advanceAmount && (
                    <Link href={`/booking/pay/${b.id}`} className="mt-2 inline-block px-4 py-1.5 gold-gradient text-white rounded-full text-xs font-body font-semibold">
                      Pay Advance
                    </Link>
                  )}
                </div>
              </div>
              {b.specialRequests && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 font-body">Special Requests: <span className="text-gray-600">{b.specialRequests}</span></p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
