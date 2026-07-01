export const dynamic = 'force-dynamic'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, CalendarDays, Users, Package, Image, Star, MessageSquare, Calendar, Settings, Home, LogOut } from 'lucide-react'

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/bookings', icon: CalendarDays, label: 'Bookings' },
  { href: '/admin/calendar', icon: Calendar, label: 'Calendar' },
  { href: '/admin/customers', icon: Users, label: 'Customers' },
  { href: '/admin/packages', icon: Package, label: 'Packages' },
  { href: '/admin/gallery', icon: Image, label: 'Gallery' },
  { href: '/admin/reviews', icon: Star, label: 'Reviews' },
  { href: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries' },
]

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-charcoal text-white flex flex-col fixed h-full">
        <div className="p-5 border-b border-white/10">
          <h2 className="text-lg font-serif text-gold-400">Royal Palace</h2>
          <p className="text-xs text-gray-400 font-body">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all text-sm font-body">
              <Icon size={18} /> {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:bg-white/10 text-sm font-body">
            <Home size={18} /> View Site
          </Link>
        </div>
      </aside>
      <main className="flex-1 ml-64 overflow-auto">{children}</main>
    </div>
  )
}
