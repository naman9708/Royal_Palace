'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, ChevronDown, Phone, User, LogOut, LayoutDashboard, Shield } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/venue', label: 'Venue' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/services', label: 'Services' },
  { href: '/packages', label: 'Packages' },
  { href: '/availability', label: 'Availability' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenu, setUserMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      {/* Top bar */}
      <div className={`${scrolled ? 'hidden' : 'block'} bg-charcoal text-white text-sm py-1.5`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="text-gold-400 font-body">✦ Welcome to Royal Palace Marriage Hall ✦</span>
          <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} className="flex items-center gap-1 hover:text-gold-400 transition-colors">
            <Phone size={14} />
            <span>+91 84340 95831</span>
          </a>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 ${scrolled ? 'py-3' : 'py-4'}`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className={`font-serif font-bold tracking-wide transition-all duration-300 ${scrolled ? 'text-charcoal text-xl' : 'text-white text-2xl'}`}>
              Royal Palace
            </span>
            <span className={`text-gold-500 text-xs tracking-widest uppercase font-body transition-all ${scrolled ? 'text-gold-600' : 'text-gold-300'}`}>
              Marriage Hall & Garden
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className={`px-3 py-2 text-sm font-body rounded-md transition-all hover:text-gold-500 ${scrolled ? 'text-charcoal' : 'text-white'}`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500 text-gold-600 hover:bg-gold-50 transition-all text-sm font-body">
                  <User size={16} />
                  <span>{session.user.name?.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </button>
                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gold-100 py-2 z-50">
                    {session.user.role === 'ADMIN' && (
                      <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal hover:bg-gold-50 hover:text-gold-600">
                        <Shield size={16} />Admin Panel
                      </Link>
                    )}
                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal hover:bg-gold-50 hover:text-gold-600">
                      <LayoutDashboard size={16} />Dashboard
                    </Link>
                    <hr className="my-1 border-gold-100" />
                    <button onClick={() => signOut()} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full">
                      <LogOut size={16} />Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="px-4 py-2 text-sm font-body text-gold-600 border border-gold-500 rounded-full hover:bg-gold-50 transition-all">
                Sign In
              </Link>
            )}
            <Link href="/booking" className="px-5 py-2 text-sm font-body rounded-full gold-gradient text-white font-semibold hover:shadow-lg hover:shadow-gold-500/30 transition-all">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className={`lg:hidden p-2 rounded-md ${scrolled ? 'text-charcoal' : 'text-white'}`}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-xl border-t border-gold-100">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm font-body text-charcoal hover:text-gold-600 hover:bg-gold-50 rounded-md">
                {link.label}
              </Link>
            ))}
            <hr className="border-gold-100 my-2" />
            {session ? (
              <>
                {session.user.role === 'ADMIN' && (
                  <Link href="/admin" className="block px-3 py-2 text-sm font-body text-charcoal hover:text-gold-600">Admin Panel</Link>
                )}
                <Link href="/dashboard" className="block px-3 py-2 text-sm font-body text-charcoal hover:text-gold-600">Dashboard</Link>
                <button onClick={() => signOut()} className="block w-full text-left px-3 py-2 text-sm font-body text-red-600">Sign Out</button>
              </>
            ) : (
              <Link href="/login" className="block px-3 py-2 text-sm font-body text-gold-600">Sign In</Link>
            )}
            <Link href="/booking" className="block w-full text-center px-5 py-2.5 text-sm font-body rounded-full gold-gradient text-white font-semibold mt-2">
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
