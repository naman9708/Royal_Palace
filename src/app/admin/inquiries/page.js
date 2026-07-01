'use client'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Trash2, CheckCircle, Clock } from 'lucide-react'

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/contact').then(r => r.json()).then(d => setInquiries(d.inquiries || [])).finally(() => setLoading(false))
  }, [])

  const markReplied = async id => {
    await fetch(`/api/contact/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isReplied: true }) })
    setInquiries(is => is.map(i => i.id === id ? { ...i, isReplied: true } : i))
    toast.success('Marked as replied')
  }

  const deleteInquiry = async id => {
    if (!confirm('Delete this inquiry?')) return
    await fetch(`/api/contact/${id}`, { method: 'DELETE' })
    setInquiries(is => is.filter(i => i.id !== id))
    toast.success('Deleted')
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-serif text-charcoal mb-6">Contact Inquiries</h1>
      {loading ? (
        <p className="text-gray-400 font-body">Loading...</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map(inq => (
            <div key={inq.id} className={`bg-white rounded-2xl p-5 shadow-sm border ${inq.isReplied ? 'border-green-100 opacity-70' : 'border-gray-100'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-charcoal font-body">{inq.name}</h3>
                    {inq.isReplied ? (
                      <span className="flex items-center gap-1 text-xs font-body text-green-600 bg-green-50 px-2 py-0.5 rounded-full"><CheckCircle size={12} />Replied</span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-body text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full"><Clock size={12} />Pending</span>
                    )}
                  </div>
                  <div className="flex gap-4 text-xs font-body text-gray-500 mb-3">
                    <a href={`tel:${inq.phone}`} className="hover:text-gold-600">📞 {inq.phone}</a>
                    <a href={`mailto:${inq.email}`} className="hover:text-gold-600">✉️ {inq.email}</a>
                    <span>🕒 {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <p className="text-gray-600 text-sm font-body bg-gray-50 p-3 rounded-xl">{inq.message}</p>
                </div>
                <div className="flex gap-1">
                  {!inq.isReplied && (
                    <button onClick={() => markReplied(inq.id)} className="p-2 text-green-500 hover:bg-green-50 rounded-lg" title="Mark as replied">
                      <CheckCircle size={18} />
                    </button>
                  )}
                  <button onClick={() => deleteInquiry(inq.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {inquiries.length === 0 && <div className="text-center py-16 text-gray-400 font-body">No inquiries yet</div>}
        </div>
      )}
    </div>
  )
}
