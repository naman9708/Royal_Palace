export const dynamic = 'force-dynamic'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, CalendarDays, User, LogOut, Home } from 'lucide-react'

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="block">
            <h2 className="text-lg font-serif text-gold-400">Royal Palace</h2>
            <p className="text-xs text-gray-400 font-body">Marriage Hall</p>
          </Link>
        </div>
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center text-white font-bold">
              {session.user.name?.[0] || 'U'}
            </div>
            <div>
              <p className="text-white text-sm font-semibold font-body">{session.user.name}</p>
              <p className="text-gray-400 text-xs font-body">{session.user.email}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { href: '/dashboard/bookings', icon: CalendarDays, label: 'My Bookings' },
            { href: '/dashboard/profile', icon: User, label: 'Profile' },
          ].map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all text-sm font-body">
              <Icon size={18} /> {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:bg-white/10 text-sm font-body">
            <Home size={18} /> Back to Site
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
