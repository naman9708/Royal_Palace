'use client'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, Star, X, Loader2 } from 'lucide-react'

const emptyForm = { customerName: '', eventType: '', rating: 5, review: '' }

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/reviews').then(r => r.json()).then(d => setReviews(d.reviews || []))
  }, [])

  const openCreate = () => { setForm(emptyForm); setModal('create') }
  const openEdit = r => { setForm(r); setModal('edit') }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const url = modal === 'edit' ? `/api/reviews/${form.id}` : '/api/reviews'
      const method = modal === 'edit' ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (modal === 'edit') setReviews(rs => rs.map(r => r.id === form.id ? data.review : r))
      else setReviews(rs => [...rs, data.review])
      setModal(null)
      toast.success(`Review ${modal === 'edit' ? 'updated' : 'added'}!`)
    } catch { toast.error('Failed to save') }
    finally { setLoading(false) }
  }

  const deleteReview = async id => {
    if (!confirm('Delete review?')) return
    await fetch(`/api/reviews/${id}`, { method: 'DELETE' })
    setReviews(rs => rs.filter(r => r.id !== id))
    toast.success('Review deleted')
  }

  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold-400"

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif text-charcoal">Review Management</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2 gold-gradient text-white rounded-full text-sm font-body font-semibold">
          <Plus size={16} /> Add Review
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map(r => (
          <div key={r.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={14} className={i <= r.rating ? 'text-gold-500 fill-gold-500' : 'text-gray-200'} />)}</div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(r)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Pencil size={14} /></button>
                <button onClick={() => deleteReview(r.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-gray-600 text-sm font-body italic mb-3 line-clamp-3">"{r.review}"</p>
            <div>
              <p className="font-semibold text-charcoal font-body text-sm">{r.customerName}</p>
              {r.eventType && <p className="text-gold-600 text-xs font-body">{r.eventType}</p>}
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-serif text-charcoal">{modal === 'edit' ? 'Edit' : 'Add'} Review</h3>
              <button onClick={() => setModal(null)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal font-body mb-1">Customer Name</label>
                <input value={form.customerName} onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal font-body mb-1">Event Type</label>
                <input value={form.eventType} onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))} className={inputCls} placeholder="Wedding, Birthday..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal font-body mb-1">Rating</label>
                <select value={form.rating} onChange={e => setForm(f => ({ ...f, rating: parseInt(e.target.value) }))} className={inputCls}>
                  {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal font-body mb-1">Review</label>
                <textarea value={form.review} onChange={e => setForm(f => ({ ...f, review: e.target.value }))} className={inputCls} rows={4} />
              </div>
              <button onClick={handleSubmit} disabled={loading}
                className="w-full py-3 gold-gradient text-white rounded-full font-body font-semibold flex items-center justify-center gap-2">
                {loading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Save Review'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
