'use client'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react'

const emptyForm = { name: '', slug: '', description: '', price: '', guestCapacity: '', features: '', isActive: true, isPopular: false }

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/packages').then(r => r.json()).then(d => setPackages(d.packages || []))
  }, [])

  const openCreate = () => { setForm(emptyForm); setModal('create') }
  const openEdit = (pkg) => {
    setForm({ ...pkg, price: String(pkg.price), guestCapacity: String(pkg.guestCapacity), features: pkg.features.join('\n') })
    setModal('edit')
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const payload = { ...form, price: parseFloat(form.price), guestCapacity: parseInt(form.guestCapacity), features: form.features.split('\n').filter(f => f.trim()) }
      const url = modal === 'edit' ? `/api/packages/${form.id}` : '/api/packages'
      const method = modal === 'edit' ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      let data = null
      let errorMessage = `Failed to ${modal === 'edit' ? 'update' : 'create'} package`

      try {
        data = await res.json()
      } catch (err) {
        const text = await res.text()
        errorMessage = text || errorMessage
      }

      if (!res.ok) {
        const message = data?.error || data?.message || errorMessage
        throw new Error(message)
      }

      if (modal === 'edit') setPackages(ps => ps.map(p => p.id === form.id ? data.package : p))
      else setPackages(ps => [...ps, data.package])
      setModal(null)
      toast.success(`Package ${modal === 'edit' ? 'updated' : 'created'}!`)
    } catch (error) {
      toast.error(error?.message || 'Failed to save package')
    } finally { setLoading(false) }
  }

  const deletePackage = async (id) => {
    if (!confirm('Delete this package?')) return
    await fetch(`/api/packages/${id}`, { method: 'DELETE' })
    setPackages(ps => ps.filter(p => p.id !== id))
    toast.success('Package deleted')
  }

  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif text-charcoal">Package Management</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2 gold-gradient text-white rounded-full text-sm font-body font-semibold hover:shadow-lg transition-all">
          <Plus size={16} /> Add Package
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <div key={pkg.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-serif text-charcoal">{pkg.name}</h3>
              <div className="flex gap-1">
                <button onClick={() => openEdit(pkg)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Pencil size={15} /></button>
                <button onClick={() => deletePackage(pkg.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
              </div>
            </div>
            <div className="text-2xl font-bold text-gold-600 font-serif mb-1">₹{pkg.price.toLocaleString('en-IN')}</div>
            <p className="text-gray-500 text-xs font-body mb-3">Up to {pkg.guestCapacity} guests</p>
            <p className="text-gray-600 text-sm font-body mb-4 line-clamp-2">{pkg.description}</p>
            <ul className="space-y-1 mb-4">
              {pkg.features.slice(0, 4).map(f => <li key={f} className="text-xs font-body text-gray-600 flex items-center gap-1"><span className="text-gold-500">✓</span>{f}</li>)}
              {pkg.features.length > 4 && <li className="text-xs text-gray-400 font-body">+{pkg.features.length - 4} more</li>}
            </ul>
            <div className="flex gap-2">
              {pkg.isPopular && <span className="px-2 py-0.5 bg-gold-100 text-gold-700 text-xs rounded-full font-body">Popular</span>}
              <span className={`px-2 py-0.5 text-xs rounded-full font-body ${pkg.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{pkg.isActive ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-serif text-charcoal">{modal === 'edit' ? 'Edit' : 'Create'} Package</h3>
              <button onClick={() => setModal(null)}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
            </div>
            <div className="space-y-4">
              {[['name', 'Package Name', 'text'], ['slug', 'Slug (unique)', 'text'], ['price', 'Price (₹)', 'number'], ['guestCapacity', 'Guest Capacity', 'number']].map(([name, label, type]) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-charcoal font-body mb-1">{label}</label>
                  <input type={type} value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} className={inputCls} />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-charcoal font-body mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={inputCls} rows={3} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal font-body mb-1">Features (one per line)</label>
                <textarea value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} className={inputCls} rows={6} placeholder="Hall Decoration&#10;Catering&#10;Sound System" />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm font-body">
                  <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} />
                  Active
                </label>
                <label className="flex items-center gap-2 text-sm font-body">
                  <input type="checkbox" checked={form.isPopular} onChange={e => setForm(f => ({ ...f, isPopular: e.target.checked }))} />
                  Mark as Popular
                </label>
              </div>
              <button onClick={handleSubmit} disabled={loading}
                className="w-full py-3 gold-gradient text-white rounded-full font-body font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Save Package'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
