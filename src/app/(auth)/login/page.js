'use client'
import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Loader2, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        email: form.email, password: form.password, redirect: false,
      })
      if (result?.error) { toast.error('Invalid email or password'); return }
      toast.success('Logged in successfully!')
      router.push('/dashboard')
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white"

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gold-100">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h2 className="text-2xl font-serif text-charcoal">Royal Palace</h2>
            <p className="text-gold-500 text-xs tracking-widest uppercase font-body">Marriage Hall</p>
          </Link>
          <h1 className="text-2xl font-serif text-charcoal mt-5">Welcome Back</h1>
          <p className="text-gray-500 font-body text-sm mt-1">Sign in to manage your bookings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">Email</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className={inputCls} placeholder="your@email.com" required />
          </div>
          <div>
            <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">Password</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className={inputCls + ' pr-11'} placeholder="••••••••" required />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 gold-gradient text-white rounded-full font-body font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : 'Sign In'}
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-gray-500 font-body text-sm">
            Don't have an account?{' '}
            <Link href="/register" className="text-gold-600 font-semibold hover:underline">Register here</Link>
          </p>
        </div>

        {/* Admin credentials removed for security */}
      </div>
    </div>
  )
}
