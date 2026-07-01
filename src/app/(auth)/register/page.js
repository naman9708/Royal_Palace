'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [stage, setStage] = useState('form')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: form.password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success(data.message)
      setStage('otp')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async e => {
    e.preventDefault()
    if (!otp) {
      toast.error('Please enter the OTP')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, otp }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success(data.message)
      router.push('/login')
    } catch (err) {
      toast.error(err.message)
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
          </Link>
          <h1 className="text-2xl font-serif text-charcoal mt-4">Create Account</h1>
          <p className="text-gray-500 font-body text-sm mt-1">Register to manage your bookings</p>
        </div>
        {stage === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {[['name', 'Full Name', 'text', 'Your full name'], ['email', 'Email', 'email', 'your@email.com'], ['phone', 'Phone', 'tel', '+91 98765 43210'], ['password', 'Password', 'password', '••••••••'], ['confirmPassword', 'Confirm Password', 'password', '••••••••']].map(([name, label, type, placeholder]) => (
              <div key={name}>
                <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">{label}</label>
                <input type={type} value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                  className={inputCls} placeholder={placeholder} required />
              </div>
            ))}
            <button type="submit" disabled={loading}
              className="w-full py-3 gold-gradient text-white rounded-full font-body font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Creating...</> : 'Create Account'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">Verification Code</label>
              <input type="text" value={otp} onChange={e => setOtp(e.target.value)}
                className={inputCls} placeholder="Enter OTP sent to your email" required />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 gold-gradient text-white rounded-full font-body font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Verifying...</> : 'Verify OTP'}
            </button>
            <p className="text-sm text-gray-500">
              We sent a 6-digit code to <span className="font-semibold text-charcoal">{form.email}</span>.
            </p>
          </form>
        )}
        <div className="mt-5 text-center">
          <p className="text-gray-500 font-body text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-gold-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
