'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Loader2, Save } from 'lucide-react'

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user) {
      setForm({ name: session.user.name || '', email: session.user.email || '', phone: '' })
    }
  }, [session])

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Update failed')
      await update({ name: form.name })
      toast.success('Profile updated successfully!')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white"

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-serif text-charcoal mb-6">My Profile</h1>
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
          <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {session?.user?.name?.[0] || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-serif text-charcoal">{session?.user?.name}</h2>
            <p className="text-gray-500 font-body text-sm">{session?.user?.email}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[['name', 'Full Name', 'text'], ['email', 'Email', 'email'], ['phone', 'Phone Number', 'tel']].map(([name, label, type]) => (
            <div key={name}>
              <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">{label}</label>
              <input type={type} value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                className={inputCls} readOnly={name === 'email'} />
            </div>
          ))}
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-6 py-3 gold-gradient text-white rounded-full font-body font-semibold hover:shadow-lg transition-all disabled:opacity-60">
            {loading ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : <><Save size={18} /> Save Changes</>}
          </button>
        </form>
      </div>
    </div>
  )
}
